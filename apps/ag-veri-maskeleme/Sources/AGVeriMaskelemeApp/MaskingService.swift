import Foundation
import CryptoKit

enum FileFormat: String, CaseIterable, Identifiable {
    case csv
    case json

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .csv: return "CSV"
        case .json: return "JSON"
        }
    }
}

enum MaskingStrategy: String, CaseIterable, Identifiable {
    case mask
    case hash
    case random
    case redact

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .mask: return "Mask"
        case .hash: return "Hash"
        case .random: return "Random"
        case .redact: return "Redact"
        }
    }
}

struct MaskingReport {
    let totalRows: Int
    let maskedCells: Int
    let columns: [String]
    let strategy: MaskingStrategy
    let preview: String
}

struct MaskingService {
    func loadDemoCSV() throws -> URL {
        guard let url = Bundle.main.url(forResource: "SampleData/customers", withExtension: "csv") else {
            throw MaskingError.demoDataMissing
        }
        return url
    }

    func mask(fileURL: URL,
              format: FileFormat,
              columns: [String],
              strategy: MaskingStrategy,
              delimiter: String,
              salt: String) throws -> (report: MaskingReport, outputURL: URL) {
        switch format {
        case .csv:
            let data = try CSVData(url: fileURL, delimiter: delimiter)
            let result = try data.mask(columns: columns, strategy: strategy, salt: salt)
            return (result.report, try result.writeMaskedFile(originalURL: fileURL))
        case .json:
            let handler = JSONData(url: fileURL)
            let result = try handler.mask(columns: columns, strategy: strategy, salt: salt)
            return (result.report, try result.writeMaskedFile(originalURL: fileURL))
        }
    }
}

enum MaskingError: LocalizedError {
    case invalidFormat
    case demoDataMissing
    case unsupportedJSON

    var errorDescription: String? {
        switch self {
        case .invalidFormat: return "Dosya formatı desteklenmiyor."
        case .demoDataMissing: return "Demo datası paket içinde bulunamadı."
        case .unsupportedJSON: return "JSON verisi bir dizi olmalıdır."
        }
    }
}

private struct CSVData {
    let headers: [String]
    let rows: [[String: String]]
    let delimiter: String

    init(url: URL, delimiter: String) throws {
        self.delimiter = delimiter
        let content = try String(contentsOf: url)
        let lines = content.split(whereSeparator: \ .isNewline)
        guard let headerLine = lines.first else {
            self.headers = []
            self.rows = []
            return
        }
        self.headers = CSVData.parse(line: String(headerLine), delimiter: delimiter)
        self.rows = lines.dropFirst().map { line in
            let values = CSVData.parse(line: String(line), delimiter: delimiter)
            return Dictionary(uniqueKeysWithValues: zip(headers, values))
        }
    }

    func mask(columns: [String], strategy: MaskingStrategy, salt: String) throws -> (report: MaskingReport, rows: [[String: String]]) {
        var maskedRows: [[String: String]] = []
        var maskedCells = 0
        for row in rows {
            var updated = row
            for column in columns {
                if let value = row[column], !value.isEmpty {
                    updated[column] = MaskingService.mask(value: value, strategy: strategy, salt: salt)
                    maskedCells += 1
                }
            }
            maskedRows.append(updated)
        }
        let previewRows = Array(maskedRows.prefix(5))
        let previewJSON = try String(data: JSONSerialization.data(withJSONObject: previewRows, options: [.prettyPrinted]), encoding: .utf8) ?? "[]"
        return (
            MaskingReport(totalRows: rows.count,
                          maskedCells: maskedCells,
                          columns: columns,
                          strategy: strategy,
                          preview: previewJSON),
            maskedRows
        )
    }

    func writeMaskedFile(originalURL: URL, rows: [[String: String]]) throws -> URL {
        let base = originalURL.deletingPathExtension()
        let outputURL = base.appendingPathExtension("masked.csv")
        var csv = headers.joined(separator: delimiter) + "\n"
        for row in rows {
            let line = headers.map { row[$0] ?? "" }.joined(separator: delimiter)
            csv.append(line + "\n")
        }
        try csv.write(to: outputURL, atomically: true, encoding: .utf8)
        return outputURL
    }

    private static func parse(line: String, delimiter: String) -> [String] {
        line.split(separator: Character(delimiter), omittingEmptySubsequences: false).map { String($0) }
    }
}

private struct JSONData {
    let rows: [[String: Any]]
    init(url: URL) {
        let data = try? Data(contentsOf: url)
        let json = data.flatMap { try? JSONSerialization.jsonObject(with: $0) }
        self.rows = json as? [[String: Any]] ?? []
    }

    func mask(columns: [String], strategy: MaskingStrategy, salt: String) throws -> (report: MaskingReport, rows: [[String: Any]]) {
        guard !rows.isEmpty else {
            return (
                MaskingReport(totalRows: 0, maskedCells: 0, columns: columns, strategy: strategy, preview: "[]"),
                []
            )
        }
        var maskedRows: [[String: Any]] = []
        var maskedCells = 0
        for row in rows {
            var updated = row
            for column in columns {
                if let value = row[column] as? String, !value.isEmpty {
                    updated[column] = MaskingService.mask(value: value, strategy: strategy, salt: salt)
                    maskedCells += 1
                }
            }
            maskedRows.append(updated)
        }
        let previewRows = Array(maskedRows.prefix(5))
        let previewJSON = try String(data: JSONSerialization.data(withJSONObject: previewRows, options: [.prettyPrinted]), encoding: .utf8) ?? "[]"
        return (
            MaskingReport(totalRows: rows.count, maskedCells: maskedCells, columns: columns, strategy: strategy, preview: previewJSON),
            maskedRows
        )
    }

    func writeMaskedFile(originalURL: URL, rows: [[String: Any]]) throws -> URL {
        let base = originalURL.deletingPathExtension()
        let outputURL = base.appendingPathExtension("masked.json")
        let data = try JSONSerialization.data(withJSONObject: rows, options: [.prettyPrinted])
        try data.write(to: outputURL)
        return outputURL
    }
}

extension MaskingService {
    static func mask(value: String, strategy: MaskingStrategy, salt: String) -> String {
        switch strategy {
        case .mask:
            guard value.count > 4 else { return String(repeating: "*", count: value.count) }
            let start = value.prefix(2)
            let end = value.suffix(2)
            let masked = String(repeating: "*", count: value.count - 4)
            return start + masked + end
        case .hash:
            let data = Data((value + salt).utf8)
            let digest = SHA256.hash(data: data)
            return digest.map { String(format: "%02x", $0) }.joined()
        case .random:
            return value.reduce(into: "") { partial, char in
                if char.isNumber {
                    partial.append(Character(String(Int.random(in: 0...9))))
                } else if char.isLetter {
                    let scalars = char.isUppercase ? (65...90) : (97...122)
                    let code = scalars.randomElement() ?? 65
                    partial.append(Character(UnicodeScalar(code)!))
                } else {
                    partial.append(char)
                }
            }
        case .redact:
            return "REDACTED"
        }
    }
}
