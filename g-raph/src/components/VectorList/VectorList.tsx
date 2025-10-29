import { useVectors } from "../../contexts/VectorContext";
import NewVector from "../newVector/NewVector";
import VectorListItem from "../VectorListItem/VectorListItem";
import style from "./vectorList.module.css";

const VectorList = () => {
  const vectors = useVectors();

  return (
    <div className={style.functionList}>
      <h2 className={style.title}>Vectors</h2>
      {vectors &&
        vectors.map((vector) => (
          <VectorListItem key={vector.id} vector={vector} />
        ))}
      <NewVector />
    </div>
  );
};

export default VectorList;
