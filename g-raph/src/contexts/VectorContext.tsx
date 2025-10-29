import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type {
  Vectors,
  VectorColumn,
  VectorComponent,
  Vector,
  Axis,
  validColumns,
} from "../types/vector";

type VectorActions = {
  addVector: (init?: Partial<VectorColumn>) => void;
  removeVector: (id: string) => void;
  updateVector: (id: string, patch: Partial<VectorColumn>) => void;
  updateComponent: (
    id: string,
    column: validColumns,
    axis: Axis,
    value: VectorComponent
  ) => void;
  clearAll: () => void;
};

const VectorStateContext = createContext<Vectors | null>(null);

const VectorActionsContext = createContext<VectorActions | undefined>(
  undefined
);

const newId = () => crypto.randomUUID();

const BLANK_COL: VectorColumn = { x: null, y: null, z: null };

export function VectorProvider({ children }: { children: ReactNode }) {
  const [vectors, setVectors] = useState<Vectors>([]);

  const addVector = useCallback(() => {
    const v: Vector = {
      id: newId(),
      columns: [{ ...BLANK_COL }, { ...BLANK_COL }, { ...BLANK_COL }],
    };
    setVectors((s) => [...s, v]);
  }, []);

  const removeVector = useCallback((id: string) => {
    setVectors((s) => s.filter((v) => v.id !== id));
  }, []);

  const updateVector = useCallback(
    (id: string, patch: Partial<VectorColumn>) => {
      setVectors((s) => s.map((v) => (v.id === id ? { ...v, ...patch } : v)));
    },
    []
  );

  const updateComponent = useCallback(
    (id: string, column: validColumns, axis: Axis, value: VectorComponent) => {
      setVectors((prev) =>
        prev.map((v) => {
          if (v.id !== id) return v;
          // clone tuple
          const cols = [...v.columns] as Vector["columns"];
          cols[column] = { ...cols[column], [axis]: value };
          return { ...v, columns: cols };
        })
      );
    },
    []
  );

  const clearAll = useCallback(() => setVectors([]), []);

  return (
    <VectorStateContext.Provider value={vectors}>
      <VectorActionsContext.Provider
        value={{
          addVector,
          removeVector,
          updateVector,
          updateComponent,
          clearAll,
        }}
      >
        {children}
      </VectorActionsContext.Provider>
    </VectorStateContext.Provider>
  );
}

export const useVectors = () => {
  return useContext(VectorStateContext);
};
export const useVectorActions = () => {
  return useContext(VectorActionsContext);
};
