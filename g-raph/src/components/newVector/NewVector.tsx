import { useVectorActions } from "../../contexts/VectorContext";
import style from "./NewVector.module.css";

const NewVector = () => {
  const vectorActions = useVectorActions();

  return (
    <button
      className={style.newVectorButton}
      onClick={() => vectorActions?.addVector()}
    >
      New
    </button>
  );
};

export default NewVector;
