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
          obj[key][optionalKey] = { ...obj[key][optionalKey], optional: true };
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
  let data = JSON.parse(JSON.stringify(baseLineRules));
  moveOptionalField(data, {}, "");
  removeField(data, "optional");
  console.log("Tree view Funct", data);
  return data;
};
