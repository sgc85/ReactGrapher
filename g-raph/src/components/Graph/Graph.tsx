import Plot from "react-plotly.js";
// import Plotly from "plotly.js-dist";
import style from "./Graph.module.css";

import { useVectors } from "../../contexts/VectorContext";
import { useMemo, useState } from "react";

const Graph = () => {
  const [range] = useState<number>(10); // adjustable later
  const vectors = useVectors();

  // helper: t = [-range, ..., +range]
  const makeT = (r: number, step = 1) => {
    const ts: number[] = [];
    for (let t = -r; t <= r; t += step) ts.push(t);
    return ts;
  };

  const traces: Partial<Plotly.ScatterData>[] = useMemo(() => {
    if (!vectors || vectors.length === 0) {
      return [{ x: [], y: [], z: [], type: "scatter3d", mode: "lines" }];
    }

    const t = makeT(range, 1);

    // Flatten: one trace per (vector, column)
    const out: Partial<Plotly.ScatterData>[] = [];

    vectors.forEach((vec) => {
      const [point, direction, span] = vec.columns;

      //has values for all components in point
      //TODO check these for being valid numbers too?
      if (point.x && point.y && point.z) {
        //also has direction x, y and z components
        if (
          direction.x !== null &&
          direction.y !== null &&
          direction.z !== null
        ) {
          //also has span components
          if (span.x && span.y && span.z) {
          } else {
            // has point an direction - no span
            console.log(t);
            const x = t.map((value) => value * direction.x! + point.x!);
            const y = t.map((value) => value * direction.y! + point.y!);
            const z = t.map((value) => value * direction.z! + point.z!);

            out.push({
              x,
              y,
              z,
              type: "scatter3d",
              mode: "lines",
            });
          }
        } else {
          out.push({
            x: [point.x],
            y: [point.y],
            z: [point.z],
            type: "scatter3d",
            mode: "markers",
          });
        }
      }
    });
    // const x = [t.map((tValue) => tValue * direction)];

    if (out.length && out.length > 0) return out;

    return [{ x: [], y: [], z: [], type: "scatter3d", mode: "lines" }];
  }, [vectors, range]);

  const layout: Partial<Plotly.Layout> = {
    scene: {
      aspectmode: "cube",
      xaxis: { title: { text: "x" } },
      yaxis: { title: { text: "y" } },
      zaxis: { title: { text: "z" } },
    },
    margin: { l: 0, r: 0, t: 0, b: 0 },
    showlegend: true,
  };

  return (
    <div className={style.plotArea}>
      <Plot
        data={traces}
        layout={layout}
        className={style.graph}
        useResizeHandler
        config={{ responsive: true }}
      />
      ;
    </div>
  );
};

export default Graph;
