import classNames from 'classnames';
import styles from './index.module.less';

export default function Title() {


    //  windows
    return <div
        className={classNames(`${styles.title} bg-[#f8faff] h-full flex justify-between before:content=['*']  before:w-[52px] before:inline-block before:bg-[#f2f4fe]`)}
    >

    </div>
}