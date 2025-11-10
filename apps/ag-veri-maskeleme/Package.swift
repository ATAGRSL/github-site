// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "AGVeriMaskeleme",
    platforms: [
        .macOS(.v13)
    ],
    products: [
        .executable(name: "AGVeriMaskeleme", targets: ["AGVeriMaskelemeApp"])
    ],
    targets: [
        .executableTarget(
            name: "AGVeriMaskelemeApp",
            resources: [
                .copy("Resources/SampleData/customers.csv")
            ]
        )
    ]
)
