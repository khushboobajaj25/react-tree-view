import { EditIcon, FilterIcon } from "@salt-ds/icons";
import cx from "classnames";
import React, { useContext, useState, useEffect } from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FaCheckSquare, FaMinusSquare, FaSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { AppContext } from "../../App";
import { getTreeViewData } from "../utils";
import RulesModal from "./RulesModal";
import "./styles.css";

function RulesTreeView({ draggedItem, setDraggedItem, setEditorData }) {
  const { dataQualityStates, setDataQualityStates } = useContext(AppContext);
  const autoGeneratedRules = dataQualityStates.autoGeneratedRules;
  const columnLevelRules = getTreeViewData(JSON.parse(JSON.stringify(autoGeneratedRules)));
  const [selectedIds, setSelectedIds] = useState(columnLevelRules.children[0].metadata.selectedIds);
  const data = flattenTree(columnLevelRules);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [eyeElement, setEyeElement] = useState(null);
  const [includedKeys, setIncludedKeys] = useState(columnLevelRules.children[0].metadata.includedKeys);
  const initialIncludedKeys = JSON.parse(JSON.stringify(columnLevelRules.children[0].metadata.includedKeys));

  useEffect(() => {
    setSelectedIds(columnLevelRules.children[0].metadata.selectedIds);
  }, [dataQualityStates]);

  const openModal = (element, key) => {
    element.metadata.modalKey = key;
    setModalData({ ...element });
    setIsOpen(true);
  };

  const handleCheckBoxSelect = (e) => {
    const index = selectedIds.indexOf(e.id);
    let updatedSelectedIds = [];
    if (index > -1) {
      updatedSelectedIds = selectedIds.filter((id) => id !== e.id);
      autoGeneratedRules[e.metadata.parent][e.name]["isChecked"] = false;
    } else {
      updatedSelectedIds = [...selectedIds, e.id];
      autoGeneratedRules[e.metadata.parent][e.name] = { value: e.metadata.value, filter: e.metadata.filter, isChecked: true };
    }
    columnLevelRules.children[0].metadata.selectedIds = updatedSelectedIds;
    setSelectedIds(updatedSelectedIds);
  };

  const onEyeClose = (element) => {
    setEditorData({
      [element.name]: JSON.parse(JSON.stringify(autoGeneratedRules[element.name])),
    });
    setEyeElement(element);
  };

  const onEyeOpen = () => {
    setEditorData(JSON.parse(JSON.stringify(autoGeneratedRules)));
    setEyeElement(null);
  };

  const handleIncludeBoxClick = (element) => {
    const index = includedKeys.indexOf(element.name);
    let updatedIncludedKeys = [];
    if (index > -1) {
      updatedIncludedKeys = includedKeys.filter((k) => k !== element.name);
      autoGeneratedRules[element.name]["isChecked"] = false;
    } else {
      updatedIncludedKeys = [...includedKeys, element.name];
      autoGeneratedRules[element.name]["isChecked"] = true;
    }
    columnLevelRules.children[0].metadata.includedKeys = updatedIncludedKeys;
    setIncludedKeys(updatedIncludedKeys);
  };

  const handleIncludeColumnWithRules = (element) => {
    let isChecked = null;
    if (initialIncludedKeys.length === includedKeys.length) {
      isChecked = false;
      setIncludedKeys([]);
    } else {
      isChecked = true;
      setIncludedKeys(initialIncludedKeys);
    }
    initialIncludedKeys.forEach((key) => {
      autoGeneratedRules[key]["isChecked"] = isChecked;
    });
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (element) => {
    autoGeneratedRules[element.name][draggedItem] = {
      value: "",
      filter: [],
      // isChecked: true,
    };
    console.log(autoGeneratedRules);
    setDataQualityStates({ ...dataQualityStates });
    setDraggedItem(null);
  };

  return (
    <div className="checkbox" style={{ overflowX: "auto" }}>
      <TreeView
        data={data}
        aria-label="Checkbox tree"
        multiSelect
        selectedIds={selectedIds}
        defaultExpandedIds={[...new Set(data.map((node) => node.id))]}
        propagateSelect
        propagateSelectUpwards
        togglableSelect
        nodeRenderer={({ element, isBranch, isExpanded, isHalfSelected, isDisabled, getNodeProps, level, handleSelect, handleExpand }) => {
          const nodeProps = getNodeProps({ onClick: handleExpand });
          const draggableFields = isBranch
            ? {
                onDragOver: onDragOver,
                onDrop: () => onDrop(element),
              }
            : {};
          const isSelected = selectedIds.indexOf(element.metadata.id) !== -1;
          if (element.name === "Karan ka rule hai") console.log(isSelected, element, selectedIds);
          return (
            <div
              style={{
                minWidth: 200,
                marginLeft: 40 * (level - 1),
                opacity: isDisabled ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%", // Ensure the container takes full width
                maxWidth: "100%", // Prevent overflow
                boxSizing: "border-box", // Include padding and border in the element's total width and height
              }}
            >
              {isBranch && (
                <span {...nodeProps}>
                  <ArrowIcon isOpen={isExpanded} style={{ cursor: "pointer" }} />
                </span>
              )}
              {!isBranch && (
                <CheckBoxIcon
                  className="checkbox-icon"
                  onClick={(e) => {
                    element.metadata.checked = !isSelected;
                    handleSelect(e);
                    handleCheckBoxSelect(element);
                    e.stopPropagation();
                  }}
                  variant={isSelected ? "all" : "none"}
                  style={{ cursor: "pointer" }}
                />
              )}
              <div {...nodeProps} {...draggableFields} className="name">
                {element.name}
              </div>
              {isBranch && <FilterIcon onClick={() => openModal(element, element.metadata.modalKey || "filter")} style={{ cursor: "pointer" }} />}
              {isSelected && !isBranch && (
                <>
                  <EditIcon onClick={() => openModal(element, "value")} style={{ cursor: "pointer" }} />
                  <FilterIcon onClick={() => openModal(element, element.metadata.modalKey || "filter")} style={{ cursor: "pointer" }} />
                </>
              )}
              <span style={{ cursor: "pointer" }}>
                {isBranch &&
                  element.metadata.id !== 1 &&
                  (eyeElement && eyeElement.metadata.id === element.metadata.id ? (
                    <BsEyeSlashFill onClick={onEyeOpen} />
                  ) : (
                    <BsEyeFill onClick={() => onEyeClose(element)} />
                  ))}
              </span>
              {element.metadata.id !== 1 && isBranch && (
                <CheckBoxIcon variant={includedKeys.includes(element.name) ? "all" : "none"} onClick={() => handleIncludeBoxClick(element)} />
              )}
              {element.metadata.id === 1 && (
                <CheckBoxIcon
                  variant={includedKeys.length === initialIncludedKeys.length ? "all" : includedKeys.length === 0 ? "none" : "some"}
                  onClick={() => handleIncludeColumnWithRules(element)}
                />
              )}
            </div>
          );
        }}
      />
      {modalIsOpen && <RulesModal setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} modalData={modalData} autoGeneratedRules={autoGeneratedRules} />}
    </div>
  );
}

const ArrowIcon = ({ isOpen, className }) => {
  const baseClass = "arrow";
  const classes = cx(baseClass, { [`${baseClass}--closed`]: !isOpen }, { [`${baseClass}--open`]: isOpen }, className);
  return <IoMdArrowDropright className={classes} />;
};

const CheckBoxIcon = ({ variant, ...rest }) => {
  switch (variant) {
    case "all":
      return <FaCheckSquare {...rest} />;
    case "none":
      return <FaSquare {...rest} />;
    case "some":
      return <FaMinusSquare {...rest} />;
    default:
      return null;
  }
};

export default RulesTreeView;
