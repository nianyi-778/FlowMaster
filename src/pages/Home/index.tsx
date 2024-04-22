import './index.less';
import useMoveHighlight from '@/hooks/useMoveHighlight';
import { homeConfig } from '@/constants/config';
import { Link } from 'react-router-dom';
import { Typography } from "antd";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from 'react';

const { Title, Text } = Typography;


async function initDatabase() {
    const dbName = `${appWindow.label}.db`;

    // 打开数据库连接
    await invoke("plugin:sql|open_connection", { connectionName: dbName });

    // 创建表
    await invoke("plugin:sql|execute", {
        connectionName: dbName,
        query: `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)`,
    });

    // 插入数据
    await invoke("plugin:sql|execute", {
        connectionName: dbName,
        query: "INSERT INTO users (name) VALUES (?)",
        args: ["John Doe"],
    });

    // 查询数据
    const result = await invoke("plugin:sql|query", {
        connectionName: dbName,
        query: "SELECT * FROM users",
    });

    console.log(result);
}



export default function Main() {

    useMoveHighlight();

    useEffect(() => {
        initDatabase();
    }, [])

    return <div className=" w-full h-full bg" >
        <div className='colBox'>
            {
                homeConfig.map(c => {
                    return <div className="col" key={c.id}>
                        <div className="element" >
                            <Link to={`/quadrants/${c.id}`}>
                                <div className="maskCover" style={{
                                    backgroundImage: `url("${c.img}")`
                                }}>
                                </div>
                                <div className="mask" >
                                </div>
                                <div className='doc no-select'>
                                    <Title>{c.title}</Title>
                                    <Text>{c.description}</Text>
                                </div>
                            </Link>

                        </div>
                    </div>
                })
            }

        </div>

    </div>
}