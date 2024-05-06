export default function Icon({ name, classNames = '' }: { name: string; classNames?: string }) {

    if (!name) {
        return null;
    }

    return <svg className={`icon ${classNames}`} aria-hidden="true">
        <use xlinkHref={`#${name}`} ></use>
    </svg>
}