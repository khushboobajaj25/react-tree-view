export function removeField(obj, removeFieldStr) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === removeFieldStr) {
        delete obj[key];
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        removeField(obj[key], removeFieldStr);
      }
    }
  }
}

export const moveOptionalField = (obj, parentObj, parentKey) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === "optional") {
        Object.keys(obj[key]).forEach((optionalKey) => {
          obj[key][optionalKey] = { ...obj[key][optionalKey], isOptional: true };
        });
        parentObj[parentKey] = { ...parentObj[parentKey], ...obj[key] };
        return;
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        moveOptionalField(obj[key], obj, key);
      }
    }
  }
};

export const getTreeViewData = (baseLineRules) => {
  const data = JSON.parse(JSON.stringify(baseLineRules));
  moveOptionalField(data, {}, "");
  removeField(data, "optional");

  let id = 1;
  let treeData = {
    name: "",
    children: [{ name: "Column with Rules", metadata: { id: id++, datasetFilter: data["dataset_filters"], selectedIds: [], parent: "" }, children: [] }],
  };

  data["List_of_columns"].forEach((column) => {
    const children = [];
    treeData.children[0].children.push({
      name: column,
      metadata: { id: id++, columnFilter: data[column]["column_filters"], checked: !data[column]["isOptional"], parent: "Column with Rules" },
      children: children,
    });

    Object.keys(data[column]).forEach((key) => {
      const columnDetails = data[column][key];
      if (key !== "column_filters") {
        children.push({
          name: key,
          metadata: {
            id: id++,
            value: columnDetails["value"],
            filter: columnDetails["filter"],
            checked: !columnDetails["isOptional"],
            parent: column,
          },
        });
        if (!columnDetails["isOptional"]) {
          treeData.children[0].metadata.selectedIds.push(id - 1);
        }
      }
    });
  });
  return treeData;
};
