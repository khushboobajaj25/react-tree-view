import cx from "classnames";
import React, { useContext, useState } from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";
import { FaCheckSquare, FaMinusSquare, FaSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { AppContext } from "../../App";
import "./styles.css";
import { EditIcon, FilterIcon } from "@salt-ds/icons";
import RulesModal from "./RulesModal";
import { getTreeViewData } from "../utils";

function RulesTreeView() {
  const { dataQualityStates } = useContext(AppContext);
  const autoGeneratedRules = dataQualityStates.autoGeneratedRules;
  const columnLevelRules = getTreeViewData(JSON.parse(JSON.stringify(autoGeneratedRules)));
  const [selectedIds, setSelectedIds] = useState(columnLevelRules.children[0].metadata.selectedIds);
  const data = flattenTree(columnLevelRules);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

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
    } else {
      updatedSelectedIds = [...selectedIds, e.id];
    }
    columnLevelRules.children[0].metadata.selectedIds = updatedSelectedIds;
    setSelectedIds(updatedSelectedIds);
  };

  return (
    <div className="checkbox" style={{ overflowX: "auto" }}>
      <TreeView
        data={data}
        aria-label="Checkbox tree"
        multiSelect
        selectedIds={selectedIds}
        defaultExpandedIds={[1]}
        propagateSelect
        propagateSelectUpwards
        togglableSelect
        nodeRenderer={({ element, isBranch, isExpanded, isSelected, isHalfSelected, isDisabled, getNodeProps, level, handleSelect, handleExpand }) => {
          const nodeProps = getNodeProps({ onClick: handleExpand });
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
                    element.metadata.checked = isSelected;
                    handleSelect(e);
                    handleCheckBoxSelect(element);
                    e.stopPropagation();
                  }}
                  variant={isHalfSelected ? "some" : isSelected ? "all" : "none"}
                  style={{ cursor: "pointer" }}
                />
              )}
              <span {...nodeProps} className="name">
                {element.name}
              </span>
              {isBranch && <FilterIcon onClick={() => openModal(element, element.metadata.modalKey || "filter")} style={{ cursor: "pointer" }} />}
              {isSelected && !isBranch && (
                <>
                  <EditIcon onClick={() => openModal(element, "value")} style={{ cursor: "pointer" }} />
                  <FilterIcon onClick={() => openModal(element, element.metadata.modalKey || "filter")} style={{ cursor: "pointer" }} />
                </>
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
