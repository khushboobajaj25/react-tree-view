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
          if (parentObj[parentKey][optionalKey]) {
            obj[key][optionalKey] = parentObj[parentKey][optionalKey];
          } else {
            obj[key][optionalKey] = { ...obj[key][optionalKey], isChecked: false };
          }
        });
        parentObj[parentKey] = { ...parentObj[parentKey], ...obj[key] };
        return;
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        moveOptionalField(obj[key], obj, key);
      }
    }
  }
};

export const addIsCheckedField = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (obj[key]["isChecked"] === undefined) obj[key]["isChecked"] = true;
        addIsCheckedField(obj[key]);
      }
    }
  }
};



export const getTreeViewData = (baseLineRules) => {
  const data = JSON.parse(JSON.stringify(baseLineRules));
  moveOptionalField(data, {}, "");
  removeField(data, "optional");
  removeField(data, "hidden_columns");
  addIsCheckedField(data)

  let id = 1;
  let treeData = {
    name: "",
    children: [
      {
        name: "Column with Rules",
        metadata: {
          id: id++,
          dataset_filters: data["dataset_filters"],
          selectedIds: [],
          parent: null,
          modalKey: "dataset_filters",
          includedKeys: [],
          initialIncludesKeys: [],
        },
        children: [],
      },
    ],
  };

  data["List_of_columns"].forEach((column) => {
    if (!data[column]) return;
    const children = [];
    if (data[column]["isChecked"] || data[column]["isChecked"] === undefined) {
      treeData.children[0].metadata.includedKeys.push(column);
    }
    treeData.children[0].metadata.initialIncludesKeys.push(column);
    treeData.children[0].children.push({
      name: column,
      metadata: {
        id: id++,
        column_filters: data[column]["column_filters"],
        checked: data[column]["isChecked"],
        parent: "Column with Rules",
        modalKey: "column_filters",
      },
      children: children,
    });

    Object.keys(data[column]).forEach((key) => {
      if (key === "isChecked") return;

      const columnDetails = data[column][key];
      if (key !== "column_filters") {
        children.push({
          name: key,
          metadata: {
            id: id++,
            value: columnDetails["value"],
            filter: columnDetails["filter"],
            checked: columnDetails["isChecked"],
            parent: column,
          },
        });
        if (columnDetails["isChecked"]) {
          treeData.children[0].metadata.selectedIds.push(id - 1);
        }
      }
    });
  });
  return treeData;
};

export const removeUncheckedObjs = (data) => {
  Object.keys(data).forEach((key) => {
    if (data[key]["isChecked"] === false) {
      delete data[key];
    } else if (key === "isChecked") {
      delete data[key];
    } else if (typeof data[key] === "object" && data[key] !== null) {
      removeUncheckedObjs(data[key]);
    }
  });
};
export const removeHiddenObjs = (data) => {
  Object.keys(data).forEach((key) => {
    if (data[key]["isHidden"] === false) {
      delete data[key];
    } else if (key === "isHidden") {
      delete data[key];
    } else if (typeof data[key] === "object" && data[key] !== null) {
      removeHiddenObjs(data[key]);
    }
  });
};
