import style from "./VectorColumn.module.css";
import type { VectorColumn, VectorComponent } from "../../types/vector";

interface Props {
  column: VectorColumn;
  handleUpdate: (axis: "x" | "y" | "z", value: VectorComponent) => void;
  title: string;
}

const Column = ({ column, handleUpdate, title }: Props) => {
  return (
    <span className={style.functionPart}>
      <div className={style.pretext}>{title}</div>
      <div className={`${style.bracket} ${style.left}`}></div>
      <div className={style.inputColumn}>
        <input
          type="number"
          placeholder="x"
          value={column.x ?? ""}
          onChange={(e) => handleUpdate("x", parseFloat(e.target.value))}
        />
        <input
          type="number"
          placeholder="y"
          value={column.y ?? ""}
          onChange={(e) => handleUpdate("y", parseFloat(e.target.value))}
        />
        <input
          type="number"
          placeholder="z"
          value={column.z ?? ""}
          onChange={(e) => handleUpdate("z", parseFloat(e.target.value))}
        />
      </div>
      <div className={`${style.bracket} ${style.right}`}></div>
    </span>
  );
};

export default Column;
