
export default function Icon({ name, classNames = '' }: { name: string; classNames?: string }) {

    if (!name) {
        return null;
    }

    const defaultClassNames = 'text-[24px] transition-all'

    return <i className={`iconfont ${defaultClassNames} ${name} ${classNames}`}></i>
    return <svg className={`icon ${classNames}`} aria-hidden="true">
        <use xlinkHref={`#${name}`} ></use>
    </svg>
}