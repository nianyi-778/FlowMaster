// use tauri::WindowBuilder;
// use tauri::WindowUrl;
use tauri::{Manager, Runtime};
use window_shadows::set_shadow;
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

pub fn set_window_shadow<R: Runtime>(app: &tauri::App<R>, window_name: &str) {
    let window = app.get_window(window_name).unwrap();
    set_shadow(&window, true).expect("Unsupported platform!");
}

// #[tauri::command]
// async fn create_window(
//     handle: tauri::AppHandle,
//     label: String,
//     url: String,
// ) -> Result<tauri::Window, Box<dyn std::error::Error>> {
//     let window = WindowBuilder::new(&handle, &label, WindowUrl::External(url.parse().unwrap()))
//         .inner_size(400.0, 300.0)
//         .decorations(false)
//         .center()
//         .build()?;

//     // window.webview_manager().unwrap().load(url).unwrap();

//     Ok(window)
// }
