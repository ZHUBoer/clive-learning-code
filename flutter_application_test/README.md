<!-- # flutter_application_test

A new Flutter project.

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference. -->

## 项目运行

### VScode 开发，需要 Xcode 的 ios 模拟器

1. 安装好最新的模拟器，现在是 iOS_17.5_Simulator_Runtime(.dmg)，`Xcode` 中可查看已安装。[教程](https://blog.csdn.net/weixin_43865875/article/details/135254160)
2. 根据 [flutter官方教程](https://docs.flutter.cn/get-started/install/macos/mobile-ios#install-cocoapods)，启动模拟器。

  ```shell
  open -a Simulator
  ```

3. 检查安装的 `cocoapods`，并启动。

```shell
# 查看版本
pod --version
# 启动
pod setup
```

4. 若配置过环境变量，则重启现有终端。检查所有组件的安装情况：

``` shell
flutter doctor -v
```

## Flutter 项目默认目录结构的详细解析

### 1. 根目录中的文件和文件夹的作用

- **README.md**: 项目的自述文件，通常包含项目简介、安装和使用说明等。
- **analysis_options.yaml**: Dart 代码分析配置文件，用于自定义代码静态检查规则。
- **pubspec.yaml**: 项目的配置文件，包含项目的元数据（如名称、版本等）、依赖项和资源（如图片、字体等）的声明。
- **pubspec.lock**: 锁定依赖项的具体版本，确保项目依赖的一致性。
- **flutter_application_test.iml**: IntelliJ IDEA 的项目配置文件。
- **android/**: Android 平台的配置和代码。
- **ios/**: iOS 平台的配置和代码。
- **linux/**: Linux 平台的配置和代码。
- **macos/**: macOS 平台的配置和代码。
- **windows/**: Windows 平台的配置和代码。
- **web/**: Web 平台的配置和代码。
- **lib/**: 存放应用的核心代码。
- **test/**: 存放测试代码。

### 2. 平台相关文件夹中的文件和文件夹的作用

#### android/

- **app/build.gradle**: App 模块的 Gradle 构建脚本，定义了构建配置和依赖项。
- **src/**: 存放 Android 原生代码和资源。
- **build.gradle**: 项目级别的 Gradle 构建脚本。
- **flutter_application_test_android.iml**: IntelliJ IDEA 的 Android 模块配置文件。
- **gradle/**: 包含 Gradle 的相关配置。
  - **wrapper/**: Gradle 包装器相关文件。
- **gradle.properties**: Gradle 的属性配置文件。
- **gradlew**: Unix 系统的 Gradle 可执行文件。
- **gradlew.bat**: Windows 系统的 Gradle 可执行文件。
- **local.properties**: 本地配置文件，通常包含 SDK 路径等本地信息。
- **settings.gradle**: 定义了项目的模块设置。

#### ios/

- **Flutter/**: 存放 Flutter 相关的配置文件。
  - **AppFrameworkInfo.plist**: 配置 Flutter 框架的信息。
  - **Debug.xcconfig**: Debug 配置。
  - **Generated.xcconfig**: 自动生成的配置。
  - **Release.xcconfig**: Release 配置。
  - **flutter_export_environment.sh**: 导出 Flutter 环境变量的脚本。
- **Runner/**: 存放 iOS 应用的代码和资源。
  - **AppDelegate.swift**: 应用的入口文件。
  - **Assets.xcassets**: 存放应用的图标和其他资源。
  - **Base.lproj/**: 存放本地化文件。
  - **GeneratedPluginRegistrant.h/m**: 自动生成的插件注册代码。
  - **Info.plist**: 应用的配置信息。
  - **Runner-Bridging-Header.h**: 用于 Swift 和 Objective-C 代码互操作的桥接头文件。
- **Runner.xcodeproj/**: Xcode 项目配置。
  - **project.pbxproj**: 项目配置文件。
  - **project.xcworkspace/**: Xcode 工作区配置。
  - **xcshareddata/**: 共享数据。
- **Runner.xcworkspace/**: Xcode 工作区。
  - **contents.xcworkspacedata**: 工作区数据。
  - **xcshareddata/**: 共享数据。
- **RunnerTests/**: 存放 iOS 平台的测试代码。
  - **RunnerTests.swift**: 测试代码文件。

#### linux/

- **CMakeLists.txt**: CMake 构建脚本。
- **flutter/**: 存放 Flutter 相关的配置文件。
  - **CMakeLists.txt**: CMake 构建脚本。
  - **generated_plugin_registrant.cc/h**: 自动生成的插件注册代码。
  - **generated_plugins.cmake**: 自动生成的插件配置。
- **main.cc**: 应用的入口文件。
- **my_application.cc/h**: 应用的主要代码。

#### macos/

- **Flutter/**: 存放 Flutter 相关的配置文件。
  - **Flutter-Debug.xcconfig**: Debug 配置。
  - **Flutter-Release.xcconfig**: Release 配置。
  - **GeneratedPluginRegistrant.swift**: 自动生成的插件注册代码。
  - **ephemeral/**: 临时文件。
- **Runner/**: 存放 macOS 应用的代码和资源。
  - **AppDelegate.swift**: 应用的入口文件。
  - **Assets.xcassets**: 存放应用的图标和其他资源。
  - **Base.lproj/**: 存放本地化文件。
  - **Configs/**: 存放配置文件。
  - **DebugProfile.entitlements**: Debug 配置的权限声明。
  - **Info.plist**: 应用的配置信息。
  - **MainFlutterWindow.swift**: 主窗口代码。
  - **Release.entitlements**: Release 配置的权限声明。
- **Runner.xcodeproj/**: Xcode 项目配置。
  - **project.pbxproj**: 项目配置文件。
  - **project.xcworkspace/**: Xcode 工作区配置。
  - **xcshareddata/**: 共享数据。
- **Runner.xcworkspace/**: Xcode 工作区。
  - **contents.xcworkspacedata**: 工作区数据。
  - **xcshareddata/**: 共享数据。
- **RunnerTests/**: 存放 macOS 平台的测试代码。
  - **RunnerTests.swift**: 测试代码文件。

#### windows/

- **CMakeLists.txt**: CMake 构建脚本。
- **flutter/**: 存放 Flutter 相关的配置文件。
  - **CMakeLists.txt**: CMake 构建脚本。
  - **generated_plugin_registrant.cc/h**: 自动生成的插件注册代码。
  - **generated_plugins.cmake**: 自动生成的插件配置。
- **runner/**: 存放 Windows 应用的代码和资源。
  - **CMakeLists.txt**: CMake 构建脚本。
  - **Runner.rc**: 资源文件。
  - **flutter_window.cpp/h**: Flutter 窗口代码。
  - **main.cpp**: 应用的入口文件。
  - **resource.h**: 资源头文件。
  - **resources/**: 资源文件夹。
  - **runner.exe.manifest**: 应用的清单文件。
  - **utils.cpp/h**: 工具代码。
  - **win32_window.cpp/h**: Win32 窗口代码。

#### web/

- **favicon.png**: 网站图标。
- **icons/**: 存放网站图标。
  - **Icon-192.png**: 192px 的图标。
  - **Icon-512.png**: 512px 的图标。
  - **Icon-maskable-192.png**: 192px 的可遮罩图标。
  - **Icon-maskable-512.png**: 512px 的可遮罩图标。
- **index.html**: 网站的入口文件。
- **manifest.json**: 网站的配置文件。

### 3. 核心代码和配置文件夹中的文件和文件夹的作用

#### lib/

- **main.dart**: 应用的入口文件，包含了应用的主逻辑。

#### test/

- **widget_test.dart**: 测试代码文件，包含了对应用的 widget 进行测试的代码。

### 4. 目录结构设计的原因和优点

这种目录结构设计的原因和优点包括：

1. **清晰的分层结构**：
   - 不同平台的代码和配置文件被清晰地分开，便于管理和维护。
  
2. **模块化管理**：
   - 每个平台都有自己独立的配置和代码文件夹，开发者可以专注于特定平台的开发和调试。

3. **跨平台支持**：
   - Flutter 支持多平台开发，这种结构使得在一个项目中同时管理多个平台的代码成为可能。

4. **便于协作**：
   - 不同的开发人员可以专注于不同的文件夹，比如移动开发人员专注于 `android` 和 `ios` 文件夹，而 Web 开发人员专注于 `web` 文件夹。

5. **规范化**：
   - 这种结构是 Flutter 官方推荐的标准结构，开发者可以借助社区资源和文档，更加容易上手和解决问题。

6. **自动生成和管理**：
   - 一些配置文件如 `GeneratedPluginRegistrant` 是由 Flutter 自动生成和管理的，减少了手动配置的工作量。

这种设计既考虑了跨平台开发的需求，又保留了每个平台的特性，使开发者能够高效地进行多平台应用开发。

## 详细指导你如何在现有的 Flutter 项目中新增一个页面，并将其设置为应用启动后的初始页面

### 步骤 1：创建新页面

首先，在 `lib` 目录下创建一个新的 Dart 文件，例如 `new_page.dart`，并在其中定义你的新页面。

```dart
// lib/new_page.dart

import 'package:flutter/material.dart';

class NewPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('New Page'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // 在这里添加按钮点击后的逻辑
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text('Button clicked!'),
              ),
            );
          },
          child: Text('Click Me'),
        ),
      ),
    );
  }
}
```

### 步骤 2：修改 `main.dart` 文件

接着，打开 `lib/main.dart` 文件，将其修改为使用你新创建的页面作为初始页面。

```dart
// lib/main.dart

import 'package:flutter/material.dart';
import 'new_page.dart'; // 导入新页面

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: NewPage(), // 设置新页面为初始页面
    );
  }
}
```

### 步骤 3：运行应用

确保你的开发环境已正确配置后，使用以下命令运行应用：

```bash
flutter run
```

应用启动后，你应该会看到新页面，其中包含一个可以点击的按钮。点击按钮后，你会看到一个 SnackBar 显示 "Button clicked!"。

### 详细解释

1. **新建页面 `new_page.dart`**：
   - 创建一个 `StatelessWidget`，名为 `NewPage`。
   - 使用 `Scaffold` 作为页面的结构，其中包含一个 `AppBar` 和一个带有按钮的 `Center` 小部件。
   - 按钮的 `onPressed` 回调中显示一个 `SnackBar` 作为点击后的反馈。

2. **修改 `main.dart`**：
   - 导入 `new_page.dart` 文件。
   - 修改 `home` 属性，指向 `NewPage`，这样应用启动时会加载新页面。

### 可选步骤：返回上一页

如果你希望新页面能够返回上一页，可以在 `NewPage` 中添加导航逻辑，例如：

```dart
// lib/new_page.dart

import 'package:flutter/material.dart';

class NewPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('New Page'),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context); // 返回上一页
          },
        ),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text('Button clicked!'),
              ),
            );
          },
          child: Text('Click Me'),
        ),
      ),
    );
  }
}
```

这样，你就可以通过点击 AppBar 上的返回按钮返回到上一页。

### 总结

通过上述步骤，你可以在现有的 Flutter 项目中新增一个页面，并将其设置为应用启动后的初始页面。这种方法可以帮助你快速扩展应用功能并进行页面导航。
