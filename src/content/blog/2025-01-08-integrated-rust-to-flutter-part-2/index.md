---
title: 'Integrated Rust to Flutter Part 2'
seoTitle: 'Integration Rust to Flutter'
slug: 'integrated-rust-to-dart-or-flutter-part-2'
description: 'Simple way to Intagration Rust Library into Flutter App using Dart FFI'
pubDate: '2025-01-08'
updatedDate: '2025-01-08'
tags: ["Tutorial", "Guide","Flutter","Rust"]
coverImage: '../flutter_rust.png'
---

## Integration Rust to Flutter Part 2 

In Part 1, we took our first steps into the world of integrating Rust with Flutter. We set up a 
simple Rust function, compiled it for the linux target, and prepared our Flutter project to interact with Rust. If you’re new to this series, I recommend checking out [Part 1](https://ms-arifin.vercel.app/integrated-rust-to-dart-or-flutter/) to get familiar with the basics.

Now, it’s time to level up! In Part 2, we’ll dive deeper into calling Rust functions from Dart using `FFI (Foreign Function Interface)`. We’ll cover how to load a Rust library, declare function bindings, and handle data types like strings between Rust and Dart.

## Setting Up

Before we begin, ensure you’ve added the `ffi` package to your `pubspec.yaml` file. This package provides the tools needed to interact with native libraries in Dart.
```dart
dart pub add ffi
```

## Calling the Rust Library from Dart

To call Rust functions from Dart, we need to load the compiled Rust library, declare the function bindings, and handle the data exchange between Rust and Dart. Let’s break this down step by step.

### 1. Loading the Rust Library
First, we’ll create a RustBinding class to handle loading the Rust library dynamically based on the platform (Android, Linux, etc.). This ensures our code is portable across different platforms.

```dart
import 'dart:ffi';
import 'package:ffi/ffi.dart';
import 'dart:io';

class RustBinding {
  static final DynamicLibrary _dylib = _loadLibrary();

  static DynamicLibrary _loadLibrary() {
    if (Platform.isAndroid) {
      return DynamicLibrary.open(_getAndroidArch());
    } else if (Platform.isLinux) {
      return DynamicLibrary.open("binary/linux/librust_ffi.so");
    }
    throw UnsupportedError('Unsupported platform');
  }

  static String _getAndroidArch() {
    final String androidArch = Platform.version;
    if (androidArch.contains('arm64-v8a')) {
      return 'binary/android/arm64-v8a/librust_ffi.so';
    } else if (androidArch.contains('armeabi-v7a')) {
      return 'binary/android/armeabi-v7a/librust_ffi.so';
    } else if (androidArch.contains('x86')) {
      return 'binary/android/x86/librust_ffi.so';
    } else if (androidArch.contains('x86_64')) {
      return 'binary/android/x86_64/librust_ffi.so';
    }
    throw UnsupportedError('Unsupported platform');
  }
} 
```

### 2.  Declaring Function Bindings

Next, we’ll declare the Dart and FFI signatures for the Rust functions we want to call. For this example, let’s assume we have a Rust function hello that takes a `string` as input and returns a `string`, and a `free_string` function to deallocate memory.

```dart
typedef Hello = Pointer<Utf8> Function(Pointer<Utf8> input);
typedef FreeString = Void Function(Pointer<Utf8> ptr);

final Pointer<Utf8> Function(Pointer<Utf8> input) _hello =
    _dylib.lookup<NativeFunction<Hello>>('hello').asFunction();

final void Function(Pointer<Utf8> ptr) _freeString =
    _dylib.lookup<NativeFunction<FreeString>>('free_string').asFunction();
```
### 3. Calling the Rust Function

Now that we’ve loaded the library and declared the function bindings, we can call the Rust function from Dart. Here’s how to handle the input and output strings:

```dart
String? hello(String input) {
    // Convert the Dart string to a C-style string (Pointer<Utf8>)
    final inputPtr = input.toNativeUtf8();
    // Call the Rust function
    final resultPtr = _hello(inputPtr);
    // Check for null or invalid results
    if (resultPtr.address == 0) return null;

    try {
      // Convert the result back to a Dart string
      final result = resultPtr.toDartString();
      return result;
    } catch (e) {
      throw Exception(e.toString());
    } finally {
        // Free the allocated memory
      _freeString(resultPtr);
      calloc.free(inputPtr);
    }
}
```

## How It Works

* Loading the Library: The RustBinding class dynamically loads the Rust library based on the platform. This ensures compatibility across platforms.

* Function Bindings: We use lookup to find the Rust functions in the library and convert them into Dart-compatible functions using asFunction.

* Memory Management: Since Rust and Dart handle memory differently, we use `toNativeUtf8` to convert `Dart string` to C-style `string` and `free_string` to deallocate memory after use.

## Wrapping Up

In this article, we’ve taken a significant step forward in integrating Rust with Flutter. By calling Rust functions from Dart using FFI, we’ve unlocked the potential to combine Rust’s performance and safety with Flutter’s flexibility and ease of use. Whether you’re building high-performance applications or offloading computationally intensive tasks to Rust, this integration opens up a world of possibilities.

If you’ve followed along, you should now have a working example of how to load a Rust library, declare function bindings, and handle string data types between Rust and Dart. This is just the beginning—there’s so much more to explore, from complex data types to asynchronous operations.

Thank you for reading! If you found this article helpful, feel free to share it with others who might benefit. 

Stay tuned, happy coding 😁!

[Source code](https://github.com/msarifin29/rust_app)