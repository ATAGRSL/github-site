import SwiftUI

@main
struct AGVeriMaskelemeApp: App {
    @StateObject private var viewModel = MaskingViewModel()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(viewModel)
                .frame(minWidth: 960, minHeight: 640)
        }
        .commands {
            CommandMenu("AG Veri Maskeleme") {
                Button("Dosya Aç", action: viewModel.openFile)
                    .keyboardShortcut("o", modifiers: [.command])
                Button("Demo Verisini Yükle", action: viewModel.loadDemoData)
                    .keyboardShortcut("d", modifiers: [.command])
                Divider()
                Button("Maskeyi Oluştur", action: viewModel.mask)
                    .keyboardShortcut("k", modifiers: [.command])
                    .disabled(!viewModel.canMask)
            }
        }
    }
}
