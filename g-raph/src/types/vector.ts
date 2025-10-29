export type Axis = "x" | "y" | "z";

export type validColumns = 0 | 1 | 2;

export type VectorComponent = number | null;

export type VectorColumn = {
  x: VectorComponent;
  y: VectorComponent;
  z: VectorComponent;
};

export type Vector = {
  id: string; // stable id for editing/removing
  label?: string;
  columns: VectorColumn[];
};

export type Vectors = Vector[]; // 3×N as an array of columns
