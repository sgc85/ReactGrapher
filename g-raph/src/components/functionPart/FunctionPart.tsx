import { useState } from "react"
import style from "./functionPart.module.css"

interface Props {
    isActive?: boolean,
    handleNewPart: () => void;
    title: string;
}

const FunctionPart = ({ handleNewPart, title, isActive = false, }: Props) => {

    const fpart = document.getElementById("fpart")

    const [active, setActive] = useState<boolean>(isActive)
    fpart?.addEventListener("dblclick", () => {
        alert("doubled clicked...")
        setActive(false)
    })

    if (!active) return (
        <button onClick={() => {
            setActive(true)
            handleNewPart()
        }}>+</button>
    )

    return (
        <span id="fpart" className={style.functionPart} >
            <p className={style.title}>{title}</p>
            <div className={`${style.bracket} ${style.left}`}></div>
            <div className={style.inputColumn}>
                <input type="number" />
                <input type="number" />
                <input type="number" />
            </div>
            <div className={`${style.bracket} ${style.right}`}></div>
        </span>
    )
}

export default FunctionPart