import Function from "../function/Function"
import style from "./functionsList.module.css"

const FunctionList = () => {
  return (
    <div className={style.functionList}>
      <h2 className={style.title}>Functions</h2>
      <Function />
    </div>
  )
}

export default FunctionList