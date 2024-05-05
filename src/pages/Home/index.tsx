import './index.less';
import useMoveHighlight from '@/hooks/useMoveHighlight';
import { homeConfig } from '@/constants/config';
import { Link } from 'react-router-dom';
import { Typography, FloatButton } from "antd";
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

export default function Main() {

    useMoveHighlight();

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
        <FloatButton.Group
            trigger="click"
            style={{ right: 24 }}
            icon={<CustomerServiceOutlined />}
        >
            <FloatButton />
            <FloatButton icon={<CommentOutlined />} />
        </FloatButton.Group>
    </div>
}