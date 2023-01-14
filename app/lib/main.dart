import 'package:flutter/material.dart';
import 'package:app/users.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

const String streamApi = String.fromEnvironment("STREAM_API");

Future<void> main() async {
  final streamClient = StreamChatClient(
    streamApi,
    logLevel: Level.INFO,
  );

  await streamClient.connectUser(
    User(id: kDemoUserLvieira268.userId),
    kDemoUserLvieira268.token,
  );

  final streamChannel = streamClient.channel('messaging',
      id: 'lvieira268',
      extraData: {"name": "General Chat", "member": "lvieira268"});

  await streamChannel.watch();

  runApp(GPTChat(chatClient: streamClient, chatChannel: streamChannel));
}

class GPTChat extends StatefulWidget {
  const GPTChat({
    super.key,
    required this.chatClient,
    required this.chatChannel,
  });

  final StreamChatClient chatClient;
  final Channel chatChannel;

  @override
  State<GPTChat> createState() => _GPTChatState();
}

class _GPTChatState extends State<GPTChat> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GPT and Stream',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const App(),
      builder: (context, child) => StreamChat(
        client: widget.chatClient,
        child: StreamChannel(
          channel: widget.chatChannel,
          child: child!,
        ),
      ),
    );
  }
}

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  @override
  Widget build(BuildContext context) {
    return const ChannelPage();
  }
}

class ChannelPage extends StatelessWidget {
  const ChannelPage({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const StreamChannelHeader(),
      body: Column(children: const <Widget>[
        Expanded(child: StreamMessageListView()),
        StreamMessageInput(),
      ]),
    );
  }
}
