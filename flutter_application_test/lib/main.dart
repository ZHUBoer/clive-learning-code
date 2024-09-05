import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // 这个widget是你的应用程序的根。
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // 这是你的应用程序的主题。
        // 尝试这个：尝试运行你的应用程序并使用"flutter run"。你会看到应用程序有一个紫色的工具栏。然后，在不退出应用程序的情况下，
        // 尝试将下面的colorScheme中的seedColor更改为Colors.green，然后触发"热重载"（保存你的更改或在Flutter支持的IDE中按"热重载"按钮，或如果你使用命令行启动应用程序，则按"r"）。
        // 注意计数器没有重置为零；应用程序状态在重载期间不会丢失。要重置状态，请使用热重启。
        // 这也适用于代码，而不仅仅是值：大多数代码更改都可以仅通过热重载来测试。
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo 首页'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  // 这是你的应用程序的主页。它是状态性的，这意味着
  // 它有一个State对象（下面定义），其中包含影响它外观的字段。
  // 这个类是状态的配置。它保存了父级（在本例中为App widget）提供的值（在本例中为标题）
  // 并在State的build方法中使用。
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // 这个调用setState告诉Flutter框架这个State中的某些东西已经改变，
      // 这导致它再次运行下面的build方法，以便显示可以反映更新的值的更改。
      // 如果我们更改_counter而不调用setState()，那么build方法将不会再次运行，
      // 因此看起来什么都没有发生。
      _counter++;
    });
  }

// 复位计数器
  void _resetCounter() {
    setState(() {
      _counter = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    // 这个方法每次调用setState时都会重新运行，例如在
    // 上面的_incrementCounter方法中所做的那样。
    // Flutter框架已经进行了优化，使得重新运行build方法变得快速，这样你就可以只重建需要更新的东西，而不是单独更改widget实例。
    return Scaffold(
      appBar: AppBar(
        // 尝试这个：尝试将这里的颜色更改为特定颜色（例如 Colors.amber），然后触发热重载以查看AppBar更改颜色，而其他颜色保持不变。
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        // 这里我们取自MyHomePage对象创建的值，该对象由App.build方法创建，
        // 并用它来设置我们的appbar标题。
        title: Text(widget.title),
      ),
      body: Center(
        // Center是一个布局widget。它接受一个子项并将其
        // 放在父级的中间。
        child: Column(
          // Column也是一个布局widget。它接受一个子项列表并将其垂直排列。默认情况下，它会根据其子项水平调整大小，并尝试与其父级一样高。
          // Column具有各种属性来控制其如何调整大小以及如何定位其子项。这里我们使用mainAxisAlignment将子项垂直居中；
          // 这里的主轴是垂直轴，因为Columns是垂直的（交叉轴将是水平的）。
          // 尝试这个：调用"调试绘制"（在IDE中选择"Toggle Debug Paint"操作，或在控制台中按"p"），以查看每个widget的线框。
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              '你已经按了这个按钮这么多次：',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: <Widget>[
          FloatingActionButton(
            onPressed: _incrementCounter,
            tooltip: '增加',
            child: const Icon(Icons.add),
          ),
          const SizedBox(width: 10),
          FloatingActionButton(
            onPressed: _resetCounter,
            tooltip: '复位',
            child: const Icon(Icons.refresh),
          ),
        ],
      ), // 这个尾随逗号使自动格式化对于build方法更好。
    );
  }
}
