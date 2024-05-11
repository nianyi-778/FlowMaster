use tauri::{Manager, Runtime};
use window_shadows::set_shadow;

pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

pub fn set_window_shadow<R: Runtime>(app: &tauri::App<R>) {
    let window = app.get_window("customization").unwrap();
    set_shadow(&window, true).expect("Unsupported platform!");
}

// struct Config {
//     window_name: String,
//     router: String,
// }

// #[tauri::command]
// pub fn create_window(handle: tauri::AppHandle, config: Config, callback: impl Fn(Window)) {
//     let _window = tauri::WindowBuilder::new(
//         &handle,
//         config.window_name, /* the unique window label */
//         tauri::WindowUrl::External(config.router.parse().unwrap()),
//     )
//     .build()
//     .unwrap();
//     callback(_window)
// }
