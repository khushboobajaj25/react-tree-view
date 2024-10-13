import cx from "classnames";
import React, { useContext, useState } from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";
import { FaCheckSquare, FaMinusSquare, FaSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { AppContext } from "../../App";
import "./styles.css";

function RulesTreeView() {
  const { dataQualityStates } = useContext(AppContext);
  const [selectedIds, setSelectedIds] = useState(dataQualityStates.columnLevelRules.children[0].metadata.selectedIds);
  const data = flattenTree(dataQualityStates.columnLevelRules);
  const baseLineRules = dataQualityStates.baselineRules;

  const handleCheckBoxSelect = (e) => {
    const index = selectedIds.indexOf(e.id);
    if (index > -1) {
      setSelectedIds(selectedIds.filter((id) => id !== e.id));
    } else {
      setSelectedIds([...selectedIds, e.id]);
    }

    if (baseLineRules[e.metadata.parent][e.name]) {
      delete baseLineRules[e.metadata.parent][e.name];
    } else {
      baseLineRules[e.metadata.parent][e.name] = { value: e.metadata.value, filter: e.metadata.filter };
    }
  };

  return (
    <div className="checkbox">
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
          return (
            <div
              {...getNodeProps({ onClick: handleExpand })}
              style={{
                marginLeft: 40 * (level - 1),
                opacity: isDisabled ? 0.5 : 1,
              }}
            >
              {isBranch && <ArrowIcon isOpen={isExpanded} />}
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
                />
              )}
              <span className="name">{element.name}</span>
            </div>
          );
        }}
      />
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
