import SwiftUI
import UniformTypeIdentifiers
import AppKit

final class MaskingViewModel: ObservableObject {
    @Published var filePath: String?
    @Published var columns: String = "tc_kimlik,email,telefon"
    @Published var strategy: MaskingStrategy = .mask
    @Published var format: FileFormat = .csv
    @Published var delimiter: String = ","
    @Published var salt: String = ""
    @Published var previewText: String = "Maskeleme sonrası veriler burada görünecek."
    @Published var summaryRows: String = "0"
    @Published var summaryCells: String = "0"
    @Published var summaryColumns: String = "-"
    @Published var statusMessage: String = "Hazır."
    @Published var autoReveal: Bool = true
    @Published var showPreview: Bool = true

    let service = MaskingService()
    private let pasteboard = NSPasteboard.general
    private var maskedURL: URL?

    var outputPath: String? { maskedURL?.path }
    var canMask: Bool { filePath != nil && !columns.trimmed.isEmpty }

    func handleImport(result: Result<URL, Error>) {
        switch result {
        case .success(let url):
            filePath = url.path
            format = url.pathExtension.lowercased() == "json" ? .json : .csv
            statusMessage = "Dosya yüklendi."
        case .failure:
            statusMessage = "Dosya seçilemedi."
        }
    }

    func openFile() {
        let panel = NSOpenPanel()
        panel.allowedContentTypes = [.commaSeparatedText, .json]
        panel.canChooseFiles = true
        panel.canChooseDirectories = false
        if panel.runModal() == .OK, let url = panel.url {
            filePath = url.path
            format = url.pathExtension.lowercased() == "json" ? .json : .csv
            statusMessage = "Dosya yüklendi."
        }
    }

    func loadDemoData() {
        do {
            let url = try service.loadDemoCSV()
            filePath = url.path
            format = .csv
            statusMessage = "Demo datası yüklendi."
        } catch {
            statusMessage = error.localizedDescription
        }
    }

    func mask() {
        guard let filePath, !columns.trimmed.isEmpty else {
            statusMessage = "Lütfen dosya ve kolon bilgisi girin."
            return
        }
        do {
            let fileURL = URL(fileURLWithPath: filePath)
            let targetDelimiter = delimiter.isEmpty ? "," : delimiter
            let (report, outputURL) = try service.mask(fileURL: fileURL,
                                                       format: format,
                                                       columns: columns.splitCommaSeparated,
                                                       strategy: strategy,
                                                       delimiter: targetDelimiter,
                                                       salt: salt)
            summaryRows = "\(report.totalRows)"
            summaryCells = "\(report.maskedCells)"
            summaryColumns = report.columns.joined(separator: ", ")
            previewText = showPreview ? report.preview : "Ön izleme kapalı."
            statusMessage = "Maskelenmiş dosya oluşturuldu."
            maskedURL = outputURL
            if autoReveal {
                NSWorkspace.shared.activateFileViewerSelecting([outputURL])
            }
        } catch {
            statusMessage = error.localizedDescription
        }
    }

    func copyPreview() {
        guard !previewText.isEmpty else { return }
        pasteboard.clearContents()
        pasteboard.setString(previewText, forType: .string)
        statusMessage = "Ön izleme panoya kopyalandı."
    }
}

private extension String {
    var trimmed: String { trimmingCharacters(in: .whitespacesAndNewlines) }
    var splitCommaSeparated: [String] {
        trimmed.split(separator: ",").map { $0.trimmingCharacters(in: .whitespaces) }
    }
}
