import { Checkbox, CheckboxProps } from 'antd';
import styles from './index.module.less';
import { Todo } from '@/types/todo';
import classNames from 'classnames';


interface newCheckbox extends CheckboxProps {
    priority: Todo['priority']
}

export default function MoCheckbox(option: newCheckbox) {
    const { priority, ...checkedOption } = option;

    const className = priority ? styles[`checkbox_${priority}`] : styles.checkbox;

    return <span className={classNames([styles.defaultCheckbox, className])}>
        <Checkbox {...checkedOption}></Checkbox>
    </span>
}