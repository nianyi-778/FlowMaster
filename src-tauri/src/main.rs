#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{Manager, State};
use tauri_plugin_sql::{migrations::Migrations, Action, DbExt, Query, SqliteConnector, TauriSql};

fn main() {
    let context = tauri::generate_context!();

    tauri::Builder::default()
        .plugin(
            TauriSql::default()
                .add_connector(SqliteConnector::default().with_migrations(Migrations::Embedded))
                .on_query_hook(|query| {
                    println!("Query: {}", query.query_string);
                    Ok(())
                }),
        )
        .invoke_handler(|_webview, arg| {
            use Action::*;

            match arg {
                OpenConnection {
                    connection_name, ..
                } => {
                    let db_path = std::path::PathBuf::from("tauri.db");
                    match SqliteConnector::new(&db_path) {
                        Ok(db) => {
                            let mut tx = TauriSql::get(&_webview.app_handle().state::<State>())
                                .unwrap()
                                .begin();
                            tx.attach(&connection_name, db);
                            Ok(())
                        }
                        Err(e) => Err(e.to_string()),
                    }
                }

                _ => Ok(()),
            }
        })
        .run(context)
        .expect("failed to run app");
}
