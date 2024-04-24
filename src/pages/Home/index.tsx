import './index.less';
import useMoveHighlight from '@/hooks/useMoveHighlight';
import { homeConfig } from '@/constants/config';
import { Link } from 'react-router-dom';
import { Typography } from "antd";
import { useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri'
import { Todo } from '@/types/todo'
const { Title, Text } = Typography;



export default function Main() {

    useMoveHighlight();

    useEffect(() => {
        // const addTodo = async (label: string, id: string) => {
        //     invoke('new_todo', { todo: { id, label, done: false, is_delete: false } })
        // }
        // addTodo('likai', Date.now() + '');

        invoke<Todo[]>('get_todos').then((res) => {
            console.log(res, 'res');
        })
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