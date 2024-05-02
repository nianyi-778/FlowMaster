use rusqlite::{Connection, Result};
use serde::{Deserialize, Serialize};

use crate::utils::add;

#[derive(Serialize, Deserialize, Debug)]

pub struct Todo {
    pub id: i8,
    pub describe: String,
    pub done: bool,
    pub is_delete: bool,
    pub end_time: i64,
    pub created_at: i64,
    pub updated_at: i64,
    pub todo_type: u8,
}

pub struct TodoApp {
    pub conn: Connection,
}

impl TodoApp {
    pub fn new() -> Result<TodoApp> {
        println!("add {}", add(1, 3));
        let db_path = "db.sqlite";
        let conn = Connection::open(db_path)?;
        conn.execute(
            "CREATE TABLE IF NOT EXISTS todo (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                describe    TEXT,
                done        NUMERIC DEFAULT 0 NOT NULL,
                is_delete   NUMERIC DEFAULT 0,
                type        INTEGER CHECK(type IN (1, 2, 3, 4, 5, 6)) NOT NULL,
                created_at  INTEGER,
                updated_at  INTEGER,
                end_time    INTEGER
              )",
            [],
        )?;
        Ok(TodoApp { conn })
    }

    pub fn get_todo(&self, id: String) -> Result<Todo> {
        let mut stmt = self.conn.prepare("SELECT * FROM todo WHERE id = ?")?;
        let mut rows = stmt.query_map(&[&id], |row| {
            Ok(Todo {
                id: row.get(0)?,
                describe: row.get(1)?,
                done: row.get(2)?,
                is_delete: row.get(3)?,
                todo_type: row.get(4)?,
                end_time: row.get(5)?,
                created_at: row.get(6)?,
                updated_at: row.get(7)?,
            })
        })?;
        let todo = rows.next().unwrap()?;
        Ok(todo)
    }

    pub fn get_todos(&self, todo_type: u8) -> Result<Vec<Todo>> {
        let mut stmt = self
            .conn
            .prepare("SELECT * FROM todo WHERE type = ?")
            .unwrap();
        let todos_iter = stmt.query_map(&[&todo_type], |row| {
            let done = row.get::<usize, i32>(2).unwrap() == 1;
            let is_delete = row.get::<usize, i32>(3).unwrap() == 1;

            Ok(Todo {
                id: row.get(0)?,
                describe: row.get(1)?,
                done,
                is_delete,
                todo_type: row.get(4)?,
                end_time: row.get(5)?,
                created_at: row.get(6)?,
                updated_at: row.get(7)?,
            })
        })?;
        let mut todos: Vec<Todo> = Vec::new();

        for todo in todos_iter {
            todos.push(todo?);
        }

        Ok(todos)
    }

    pub fn new_todo(&self, todo: Todo) -> bool {
        let Todo {
            id,
            describe,
            todo_type,
            ..
        } = todo;
        match self.conn.execute(
            "INSERT INTO todo (id, describe, type) VALUES (?, ?, ?)",
            [id.to_string(), describe, todo_type.to_string()],
        ) {
            Ok(insert) => {
                println!("{} row inserted", insert);
                true
            }
            Err(err) => {
                println!("some error: {}", err);
                false
            }
        }
    }

    pub fn update_todo(&self, todo: Todo) -> bool {
        let Todo {
            describe,
            done,
            is_delete,
            id,
            todo_type,
            ..
        } = todo;
        let done = if done == true { 1 } else { 0 };
        let is_delete = if is_delete == true { 1 } else { 0 };
        match self.conn.execute(
            "UPDATE todo
        SET describe = ?1, done = ?2, is_delete = ?3 type = ?4, WHERE id = ?5",
            [
                describe,
                done.to_string(),
                is_delete.to_string(),
                todo_type.to_string(),
                id.to_string(),
            ],
        ) {
            Ok(update) => {
                println!("row {} has been update", update);
                true
            }
            Err(err) => {
                println!("some error: {}", err);
                false
            }
        }
    }
}
