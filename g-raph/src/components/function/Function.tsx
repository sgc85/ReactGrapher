import { useState } from "react"
import FunctionPart from "../functionPart/FunctionPart"
import style from "./function.module.css"
import type { VectorColumn } from "../../types/functionType"

const generateNewPart = () => { return { x: null, y: null, z: null } }

const Function = () => {

  const [parts, setParts] = useState<VectorColumn[]>([generateNewPart()])

  const handleNewPart = () => {
    setParts([...parts, generateNewPart()])
  }

  return (
    <div className={style.function}>
      <FunctionPart title = "r =" handleNewPart={handleNewPart} isActive={true} />
      {parts[0] && <FunctionPart title = {"+ λ"} handleNewPart={handleNewPart} />}
      {parts[1] && <FunctionPart title = {"+ μ"} handleNewPart={handleNewPart} />}
    </div>
  )
}

export default Function