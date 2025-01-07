---
title: 'Integrated Rust to Dart/Flutter'
seoTitle: 'Integration Rust to Dart or Flutter'
slug: 'integrated-rust-to-dart-or-flutter'
description: 'Simple way to Intagration Rust Library into Flutter App using Dart FFI'
pubDate: '2025-01-07'
updatedDate: '2025-01-07'
tags: ["Tutorial", "Guide","Flutter","Rust"]
coverImage: '../flutter_rust.png'
---

Simple way to integrate Rust for cross platforms (Android, IoS, macOS, Windows, and Linux) using Flutter.

## Required installation
- [Rust](https://www.rust-lang.org/)
- [Flutter](https://flutter.dev/)

## Setup
Let's create simple app

```dart
flutter create example
cd example
cargo new rust_ffi --lib --name rust_ffi
```

Then create simple function

```rust
fn hai(input: &str) -> String {
    format!("Hello {} Powered by Rust", input)
}
```

to make sure this function works,let's create a simple test:

```rust
#[test]
fn it_works() {
    let result = hai("Flutter");
    assert_eq!(result, "Hello Flutter Powered by Rust");
}
```
then run 
```rust
cd rust_ffi
cargo test
```

##### Now, Time to export

'We export the best coffee beans to the world, but we still buy Starbucks coffee... '
it's jokes..hahaha.

Let's export hai function using Rust FFI

```rust
use std::{
    ffi::{CStr, CString},
    os::raw::c_char,
};

#[no_mangle]
pub extern "C" fn hello(input: *const c_char) -> *mut c_char {
    let value = unsafe { CStr::from_ptr(input).to_str().map(|s| s.to_owned()) };
    match value {
        Ok(value_ptr) => {
            let input_ptr = hai(&value_ptr);
            match CString::new(input_ptr) {
                Ok(c_str) => c_str.into_raw(),
                Err(_) => std::ptr::null_mut(),
            }
        }
        Err(_) => std::ptr::null_mut(),
    }
}
```

to make sure this function works,let's create simple test

```rust
#[test]
fn test_hello() {
    let input = String::from("world");
    let c_str = CString::new(input.clone()).unwrap();
    let hai = hai(&input);
    let hello = hello(c_str.as_ptr());
    let result = unsafe { CStr::from_ptr(hello) };
    assert!(!hello.is_null());
    assert_eq!(hai, result.to_str().unwrap());
}
```

that's it, simple.

## Build and Share Library

Required some tools to build specific target. For example, to cross-compile to Android the [Android NDK](https://developer.android.com/ndk/downloads) must be installed.

Let's build for linux target

```rust
rustup target add x86_64-unknown-linux-gnu
cargo build --target x86_64-unknown-linux-gnu --release
```
To see a list of available targets `rustup target list`

How do we know builds success and Rust code can call?
move into PATH 'target/x86_64-unknown-linux-gnu/release/'
there are name file librust_ffi.so and also file name were different for other target

- .a format for IoS
- .dylib format for macOS
- .dll format for Windows

run command
```rust
nm -D target/x86_64-unknown-linux-gnu/release/librust_ffi.so | grep hello
00000000000062d0 T hello
```

that's it.

Next Integration to Flutter App.