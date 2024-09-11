---
title: 'Handling Network Connection '
seoTitle: 'Handling Network Connection in Flutter Without Packages'
slug: 'network-connection'
description: ''
pubDate: '2024-09-11'
updatedDate: '2024-09-12'
tags: ["Tutorial", "Guide","Flutter"]
coverImage: '../flutter.png'
---

In today's digital world, network connectivity is a fundamental feature of almost all applications. It is essential to manage the connectivity status to provide a smooth user experience, especially in scenarios where an application relies on network access. In this blog post, we'll explore how to handle network connection status in a Flutter app without using any third-party packages, while managing state effectively with Cubit.

## Why Handle Network Connection Status?

Handling network connectivity in your application is important because:

1. User Experience: Alerts the user when they are offline and prevents them from making network requests that would fail.
2. Data Consistency: Helps in managing synchronization of data between the app and the backend server.
3. Error Management: Allows you to handle errors more gracefully when the user is offline or when connectivity is lost

## Approach Overview

We will implement a solution using Dart’s built-in Stream class to monitor network connectivity changes. We'll also use Cubit from flutter_bloc to manage the app state efficiently.

## Step 1: Create a Cubit for Connectivity

First, let's create a ConnectionCubit that will handle network connection status using Dart's Stream.

```dart
enum ConnectionState { connected, disconnected }

class ConnectionCubit extends Cubit<ConnectionState> {
  ConnectionCubit() : super(ConnectionState.disconnected) {_startListeningToConnection();}
  StreamSubscription<bool>? _connectionSubscription;

  Stream<bool> _getConnectivityStream() async* {
    while (true) {
      await Future.delayed(const Duration(seconds: 5));
      bool isConnected = await _checkConnection();
      yield isConnected;
    }
  }

  void _startListeningToConnection() {
    Stream<bool> connectionStream = _getConnectivityStream();

    _connectionSubscription = connectionStream.listen((isConnected) {
      if (isConnected) { emit(ConnectionState.connected);} 
      else { emit(ConnectionState.disconnected); }
    });
  }

  Future<bool> _checkConnection() async {
    try {
      final result = await InternetAddress.lookup('google.com');
      if (result.isNotEmpty && result[0].rawAddress.isNotEmpty) { return true; }
    } on SocketException catch (_) { return false; }
    return false;
  }

  @override
  Future<void> close() {
    _connectionSubscription?.cancel();
    return super.close();
  }
}
```

### Explanation:

* Connectivity States: The enum ConnectivityState defines two states: connected and disconnected.
* Cubit for Managing Connectivity: The ConnectivityCubit listens to a stream of connectivity changes and emits the appropriate state (connected or disconnected).
* Simulated Connectivity Stream: A simulated connectivity stream is created to change the connection status every 5 seconds. Replace this with actual logic to check network connectivity.

## Step 2: Use the Cubit in Your Flutter Widget

```dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

void main() { runApp(MyApp()); }

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: BlocProvider(
        create: (context) => ConnectionCubit(), child: ConnectivityScreen(),
      ),
    );
  }
}

class ConnectivityScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Connectivity Stream Example')),
      body: Center(
        child: BlocBuilder<ConnectionCubit, ConnectionState>(
          builder: (context, state) {
            if (state == ConnectionState.connected) {
              return Text('Disconnected', style: TextStyle(fontSize: 24, color: Colors.red));
            } else {
              return Text('Connected',style: TextStyle(fontSize: 24, color: Colors.green));
            }
          },
        ),
      ),
    );
  }
}
```

### Explanation:

* BlocProvider: Provides the ConnectivityCubit to the widget tree.
* BlocBuilder: Rebuilds the UI whenever the state changes. If the connection is connected, it displays "Connected" in green; otherwise, it displays "Disconnected" in red.

## Conclusion

Handling network connectivity is crucial for a smooth user experience in any mobile application. In this post, we learned how to handle network connectivity in Flutter without relying on third-party packages. Instead, we used Dart’s core Stream class along with the Cubit state management pattern to manage the app state efficiently. By implementing this approach, you can build a robust and responsive Flutter app that adapts to changes in network connectivity seamlessly.

Feel free to experiment with the code, modify it to suit your requirements, and integrate actual connectivity checks. Happy coding!