import { useRef } from "react"

export default function AddTodo() {
    const ref = useRef<HTMLDivElement>(null);


    return <div ref={ref} className=" w-full h-full bg-red-400">123</div>
}