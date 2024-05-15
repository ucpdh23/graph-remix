import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import Graph from "graphology";
import { CSSProperties, useEffect } from "react";
import { ClientOnly } from "remix-utils/client-only";
import "@react-sigma/core/lib/react-sigma.min.css";

export const LoadGraph = (props) => {
    const loadGraph = useLoadGraph();
  
    useEffect(() => {
      const graph = new Graph();
      graph.addNode("first", { x: 0, y: 0, size: 15, label: props.item.properties.address, color: "#FA4F40" });
      loadGraph(graph);
    }, [loadGraph]);
  
    return null;
  };

export default function Graphic(props) {
  console.log("item:" , props.item);
    return ( <div style={{height: 100 + '%', width: "100%"}}><SigmaContainer style={{ height: "100vh", width: "100%" }} settings={{ allowInvalidContainer: true }}>
            <LoadGraph item={props.item}/>
        </SigmaContainer></div>);
}