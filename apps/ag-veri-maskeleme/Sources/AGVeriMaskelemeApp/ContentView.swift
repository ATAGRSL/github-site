import SwiftUI
import UniformTypeIdentifiers

struct ContentView: View {
    @EnvironmentObject private var viewModel: MaskingViewModel
    @State private var isImporterPresented = false

    var body: some View {
        VStack(spacing: 24) {
            header
            HStack(spacing: 20) {
                formPanel
                statusPanel
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .padding(24)
        .background(LinearGradient(colors: [.black.opacity(0.9), Color(red: 6/255, green: 11/255, blue: 40/255)], startPoint: .topLeading, endPoint: .bottomTrailing))
        .fileImporter(isPresented: $isImporterPresented, allowedContentTypes: [.commaSeparatedText, .json]) { result in
            viewModel.handleImport(result: result)
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("AG Veri Maskeleme")
                .font(.system(size: 32, weight: .bold))
                .foregroundStyle(.white)
            Text("CSV ve JSON dosyalarındaki hassas alanları mask, hash, random veya redact stratejileriyle anonimleştirin.")
                .foregroundStyle(.white.opacity(0.7))
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private var formPanel: some View {
        VStack(alignment: .leading, spacing: 18) {
            Group {
                Text("Dosya")
                HStack {
                    Text(viewModel.filePath ?? "Henüz seçilmedi")
                        .font(.callout)
                        .foregroundStyle(.white.opacity(0.8))
                        .lineLimit(2)
                    Spacer()
                    Button("Dosya Seç") { isImporterPresented = true }
                    Button("Demo Verisi", action: viewModel.loadDemoData)
                }
            }

            Group {
                Text("Kolonlar (virgülle)")
                TextField("tc_kimlik,email,telefon", text: $viewModel.columns)
                    .textFieldStyle(.roundedBorder)
            }

            HStack(spacing: 20) {
                Picker("Strateji", selection: $viewModel.strategy) {
                    ForEach(MaskingStrategy.allCases) { strategy in
                        Text(strategy.displayName).tag(strategy)
                    }
                }
                Picker("Format", selection: $viewModel.format) {
                    ForEach(FileFormat.allCases) { format in
                        Text(format.displayName).tag(format)
                    }
                }
                TextField("Delimiter", text: $viewModel.delimiter)
                    .frame(width: 60)
            }

            TextField("Salt (opsiyonel)", text: $viewModel.salt)
                .textFieldStyle(.roundedBorder)

            Toggle("Maskelenmiş dosyayı otomatik aç", isOn: $viewModel.autoReveal)
            Toggle("Ön izlemeyi göster", isOn: $viewModel.showPreview)

            HStack {
                VStack(alignment: .leading) {
                    Text(viewModel.statusMessage)
                        .foregroundStyle(.white.opacity(0.7))
                        .font(.callout)
                    if let outputPath = viewModel.outputPath {
                        Text(outputPath)
                            .font(.caption)
                            .foregroundStyle(.white.opacity(0.5))
                    }
                }
                Spacer()
                Button(action: viewModel.mask) {
                    Label("Maskeyi Oluştur", systemImage: "lock.shield")
                }
                .buttonStyle(.borderedProminent)
                .tint(.teal)
                .disabled(!viewModel.canMask)
            }
        }
        .padding(20)
        .background(.regularMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
    }

    private var statusPanel: some View {
        VStack(spacing: 16) {
            VStack(alignment: .leading, spacing: 8) {
                Text("Özet")
                    .font(.headline)
                HStack {
                    summaryItem(title: "Satır", value: viewModel.summaryRows)
                    summaryItem(title: "Maskelenen", value: viewModel.summaryCells)
                    summaryItem(title: "Kolon", value: viewModel.summaryColumns)
                    summaryItem(title: "Strateji", value: viewModel.strategy.displayName)
                }
            }
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Text("Ön izleme")
                        .font(.headline)
                    Spacer()
                    Button("JSON Kopyala", action: viewModel.copyPreview)
                }
                ScrollView {
                    Text(viewModel.previewText)
                        .font(.system(.footnote, design: .monospaced))
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding()
                        .background(Color.black.opacity(0.3))
                        .clipShape(RoundedRectangle(cornerRadius: 16))
                }
                .frame(maxHeight: 260)
            }
            Spacer()
        }
        .padding(20)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(.regularMaterial)
        .clipShape(RoundedRectangle(cornerRadius: 24, style: .continuous))
    }

    private func summaryItem(title: String, value: String) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(.caption)
                .foregroundStyle(.white.opacity(0.6))
            Text(value)
                .font(.headline)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}
