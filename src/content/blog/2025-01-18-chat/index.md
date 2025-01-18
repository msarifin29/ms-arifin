---
title: 'Build a Personal Chat Application Using Rust and Axum with WebSocket'
seoTitle: 'Build a Real-Time Chat App with Rust, Axum, and WebSocket'
slug: 'chat'
description: 'Build a real-time personal chat application using Axum framework (Rust), and WebSocket'
pubDate: '2025-01-18'
updatedDate: '2025-01-18'
tags: ["Rust","Axum","WebSocket","Real-Time Applications"]
---

Build a real-time personal chat application using Rust and the Axum framework. Enable seamless, bidirectional communication between users, allowing them to send and receive messages instantly.

## Required Dependencies

```rust
[dependencies]
async-trait = "0.1.85"
axum = { version = "0.8.1", features = ["ws"] }
axum-extra = { version = "0.10.0", features = ["typed-header"] }
futures = "0.3.31"
futures-util = { version = "0.3", default-features = false, features = ["sink", "std"] }
headers = "0.4.0"
tokio = { version = "1.43.0", features = ["full"] }
tokio-tungstenite = "0.26.1"
tower-http = { version = "0.6.2", features = ["fs", "trace"] }
tracing = "0.1.41"
tracing-subscriber = { version = "0.3.19", features = ["env-filter"] }
```

## Define the Query Parameters

To allow users to specify who they are and who they want to chat with, Define a struct to represent the query parameters for the WebSocket connection. This struct will be used to extract query parameters from the WebSocket connection URL, such as `/ws?user_id=alice&recipient_id=bob`.

```rust
#[derive(Debug, Deserialize)]
struct ChatParam {
    user_id: String,
    recipient_id: String,
}
```

## Set Up Shared State

To manage active WebSocket connections, create a shared state using Arc (atomic reference-counted pointer) and Mutex (mutual exclusion). This ensures thread-safe access to the connections map

```rust
struct AppState {
    connections: Mutex<HashMap<String, broadcast::Sender<String>>>,
}

impl AppState {
    fn new() -> Arc<Self> {
        Arc::new(Self {
            connections: Mutex::new(HashMap::new()),
        })
    }
}
```

## Handle WebSocket Connections

Next, implement the WebSocket handler. This function extracts the WebSocket connection, client address, query parameters, and shared state. It then upgrades the HTTP connection to a WebSocket connection and passes control to the `handle_message` function.

- `ws.on_upgrade`: Upgrades the HTTP connection to a WebSocket connection.
- `handle_message`: Manages the WebSocket connection after the upgrade.

```rust
async fn ws_handle(
    ws: WebSocketUpgrade,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    Query(params): Query<ChatParam>,
    state: State<Arc<AppState>>,
) -> impl IntoResponse {
    let state = Arc::clone(&state.0);
    let user_id = params.user_id;
    let recipient_id = params.recipient_id;
    ws.on_upgrade(move |socket| handle_message(socket, addr, user_id, recipient_id, state))
}
```
## Manage WebSocket Messages

The `handle_message` function is responsible for managing the WebSocket connection. It splits the WebSocket into a sender and receiver, creates a broadcast channel for the recipient, and spawns tasks to handle incoming and outgoing messages.

```rust
async fn handle_message(
    socket: WebSocket,
    who: SocketAddr,
    user_id: String,
    recipient_id: String,
    state: Arc<AppState>,
) {
    let (mut sender, mut receiver) = socket.split();

    let (private_tx, _) = broadcast::channel(16);

    {
        let mut private_connection = state.connections.lock().unwrap();
        private_connection.insert(recipient_id.clone(), private_tx.clone());
    }

    let mut rx = private_tx.subscribe();

    if sender
        .send(Message::Ping(vec![1, 2, 3].into()))
        .await
        .is_err()
    {
        return;
    }

    let send_task = tokio::spawn(async move {
        while let Ok(msg) = rx.recv().await {
            if sender.send(Message::Text(msg.into())).await.is_err() {
                break;
            }
        }
    });

    let state_clone = Arc::clone(&state);
    let recipient_id_clone = recipient_id.clone();

    let recv_task = tokio::spawn(async move {
        while let Some(Ok(msg)) = receiver.next().await {
            if receive_message(msg, &user_id, &recipient_id_clone, &state_clone).is_break() {
                break;
            }
        }
    });

    tokio::select! {
        _ = send_task =>{},
        _ = recv_task =>{},
    }

    {
        let mut private_connection = state.connections.lock().unwrap();
        private_connection.remove(&recipient_id);
    }
}
```
## Process Incoming Messages
The `receive_message` function processes incoming WebSocket messages. If the message is text, it forwards the message to the recipient using the broadcast::Sender. If the message is a close frame, it breaks the loop and closes the connection.

```rust

fn receive_message(
    msg: Message,
    user_id: &str,
    recipient_id: &str,
    state: &Arc<AppState>,
) -> std::ops::ControlFlow<(), ()> {
    match msg {
        Message::Text(t) => {
            let private_connection = state.connections.lock().unwrap();
            if let Some(tx) = private_connection.get(user_id) {
                let _ = tx.send(format!("{} : {}", user_id, t));
            }
        }
        Message::Close(_) => {
            return std::ops::ControlFlow::Break(());
        }
        _ => {}
    }
    std::ops::ControlFlow::Continue(())
}
```

## Run the Server
Finally, we’ll set up the Axum server and start listening for WebSocket connections.

```rust
#[tokio::main]
async fn main() {
    let assets_dir = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("assets");
    let state = AppState::new();
    let app: Router = Router::new()
        .fallback_service(ServeDir::new(assets_dir).append_index_html_on_directories(true))
        .route(
            "/ws",
            get(ws_handle).with_state(state).layer(
                TraceLayer::new_for_http()
                    .make_span_with(DefaultMakeSpan::default().include_headers(true)),
            ),
        );

    let listener = TcpListener::bind("127.0.0.1:3000").await.unwrap();
    tracing::debug!("listening on {}", listener.local_addr().unwrap());
    axum::serve(
        listener,
        app.into_make_service_with_connect_info::<SocketAddr>(),
    )
    .await
    .unwrap();
}
```

## Testing the Chat Application Using websocat

To ensure everything works as expected. For this, we’ll use websocat, a command-line WebSocket client that allows you to connect to WebSocket servers, send messages, and receive responses.

- Install  `websocat`:

```bash
cargo install websocat
```

- Start the Server

```bash
cargo run
```

- Connect as a User
Open two terminal windows to simulate two users: one for Alice and one for Bob.

- In the first terminal

```bash
websocat "ws://127.0.0.1:3000/ws?user_id=alice&recipient_id=bob"
```

- In the second terminal,

```bash
websocat "ws://127.0.0.1:3000/ws?user_id=bob&recipient_id=alice"
```

- Send and Receive Messages

In the Alice terminal, type a message and press Enter:
```bash
Hello, Bob!
```

In the Bob terminal, you should see the message:
```bash
alice: Hello, Bob!
```

Thanks for reading! If you found this article helpful, feel free to share it with others who might benefit. 
### Happy coding! 🚀