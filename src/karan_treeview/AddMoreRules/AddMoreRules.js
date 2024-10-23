import React from "react";
import { addNewRulesData } from "./addNewRulesData";

export default function AddMoreRules({ setDraggedItem }) {
  const onDragStart = (e, item) => {
    console.log(item);

    setDraggedItem(item);
  };

  return (
    <div>
      {addNewRulesData.map((rule) => (
        <div key={rule.name} draggable onDragStart={(e) => onDragStart(e, rule.name)} style={{cursor:'grab'}}>{rule.name}</div>
      ))}
    </div>
  );
}
