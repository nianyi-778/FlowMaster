
export default function Icon({ name, classNames = '', id = '' }: { name: string; classNames?: string; id?: string }) {

    if (!name) {
        return null;
    }
    const defaultFontSize = ["text-[24px]"];
    const defaultClassNames = ['transition-all'];
    const pattern = /text-\[\d+px\]/;
    const newClassName = pattern.test(classNames) ? defaultClassNames : defaultClassNames.concat(defaultFontSize);

    return <i id={id} className={`iconfont ${newClassName.join(' ')} ${name} ${classNames}`} ></i>
    return <svg className={`icon ${classNames}`} aria-hidden="true">
        <use xlinkHref={`#${name}`} ></use>
    </svg>
}