#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod todo;
mod utils;
use chrono::Utc;
use std::sync::Mutex;
use todo::{Todo, TodoApp};

struct AppState {
    app: Mutex<TodoApp>,
}

fn main() {
    let app = TodoApp::new().unwrap();
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_notification::init())
        .manage(AppState {
            app: Mutex::from(app),
        })
        .invoke_handler(tauri::generate_handler![
            get_todos,
            get_todo,
            new_todo,
            toggle_done,
            update_todo,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_todos(state: tauri::State<AppState>, todo_type: u8) -> Vec<Todo> {
    let app = state.app.lock().unwrap();
    let todos = app.get_todos(todo_type).unwrap();
    todos
}

#[tauri::command]
fn get_todo(state: tauri::State<AppState>, id: String) -> Todo {
    let app = state.app.lock().unwrap();
    let result = app.get_todo(id).unwrap();
    result
}

#[tauri::command]
fn new_todo(state: tauri::State<AppState>, todo: Todo) -> bool {
    let app = state.app.lock().unwrap();
    let result = app.new_todo(todo);
    result
}

#[tauri::command]
fn update_todo(state: tauri::State<AppState>, todo: Todo) -> bool {
    let app = state.app.lock().unwrap();
    let result = app.update_todo(todo);
    result
}

#[tauri::command]
fn toggle_done(state: tauri::State<AppState>, id: String) -> bool {
    let app = state.app.lock().unwrap();
    let Todo {
        id,
        title,
        describe,
        done,
        quadrant,
        is_delete,
        todo_type,
        end_time,
        created_at,
        ..
    } = app.get_todo(id).unwrap();

    let current_timestamp = Utc::now().timestamp_millis();

    let result = app.update_todo(Todo {
        id,
        title,
        describe,
        done: !done,
        is_delete,
        todo_type,
        quadrant,
        updated_at: current_timestamp,
        end_time,
        created_at,
    });
    result
}
