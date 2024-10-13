import React, { useContext, useState } from "react";
import { FaSquare, FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import TreeView, { flattenTree } from "react-accessible-treeview";
import cx from "classnames";
import "./styles.css";
import { AppContext } from "../../App";

const folder = {
  name: "",
  children: [
    {
      name: "Fruits",
      children: [
        { name: "Avocados" },
        { name: "Bananas" },
        { name: "Berries" },
        { name: "Oranges" },
        { name: "Pears" },
      ],
    },
    {
      name: "Drinks",
      children: [
        { name: "Apple Juice" },
        { name: "Chocolate" },
        { name: "Coffee" },
        {
          name: "Tea",
          children: [
            { name: "Black Tea" },
            { name: "Green Tea" },
            { name: "Red Tea" },
            { name: "Matcha" },
          ],
        },
      ],
    },
    {
      name: "Vegetables",
      children: [
        {
          name: "Beets",
          children: [
            { name: "Beets" },
            { name: "Carrots" },
            { name: "Celery" },
            { name: "Lettuce" },
            { name: "Onions" },
          ],
        },
        { name: "Carrots" },
        { name: "Celery" },
        { name: "Lettuce" },
        { name: "Onions" },
      ],
    },
  ],
};

function RulesTreeView() {
  const { dataQualityStates } = useContext(AppContext);
  const data = flattenTree(dataQualityStates.columnLevelRules);
  const [selectedIds, setSelectedIds] = useState([]);

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
        onSelect={(props) => console.log("onSelect callback: ", props)}
        onNodeSelect={(props) => console.log("onNodeSelect callback: ", props)}
        nodeRenderer={({
          element,
          isBranch,
          isExpanded,
          isSelected,
          isHalfSelected,
          isDisabled,
          getNodeProps,
          level,
          handleSelect,
          handleExpand,
        }) => {
          return (
            <div
              {...getNodeProps({ onClick: handleExpand })}
              style={{
                marginLeft: 40 * (level - 1),
                opacity: isDisabled ? 0.5 : 1,
              }}
            >
              {isBranch && <ArrowIcon isOpen={isExpanded} />}
              <CheckBoxIcon
                className="checkbox-icon"
                onClick={(e) => {
                  handleSelect(e);
                  e.stopPropagation();
                }}
                variant={isHalfSelected ? "some" : isSelected ? "all" : "none"}
              />
              <span className="name">
                {element.name}-{element.id}
              </span>
            </div>
          );
        }}
      />
    </div>
  );
}

const ArrowIcon = ({ isOpen, className }) => {
  const baseClass = "arrow";
  const classes = cx(
    baseClass,
    { [`${baseClass}--closed`]: !isOpen },
    { [`${baseClass}--open`]: isOpen },
    className
  );
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
