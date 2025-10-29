import { useVectorActions } from "../../contexts/VectorContext";
import type { validColumns, Vector, VectorComponent } from "../../types/vector";
import Column from "../vectorColumn/VectorColumn";
import style from "./vectorListItem.module.css";

const VectorListItem = ({ vector }: { vector: Vector }) => {
  const vectorActions = useVectorActions();

  const titles = ["r =", "+ λ", " + μ"];

  return (
    <div className={style.vectorListItem}>
      {vector.columns.map((column, i) => (
        <Column
          title={titles[i]}
          key={i}
          column={column}
          handleUpdate={(axis: "x" | "y" | "z", value: VectorComponent) =>
            vectorActions?.updateComponent(
              vector.id,
              i as validColumns,
              axis,
              value
            )
          }
        />
      ))}
    </div>
  );
};

export default VectorListItem;
