import React, { useContext, useState } from "react";
import { FaSquare, FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import TreeView, { flattenTree } from "react-accessible-treeview";
import cx from "classnames";
import "./styles.css";
import { sampleTreeData } from "./treeData";
import { FcEditImage } from "react-icons/fc";
import { IoFilterCircleOutline } from "react-icons/io5";
import { BsEyeFill } from "react-icons/bs";
import AddMoreRulesModal from "../AddMoreRules/AddMoreRulesModal";
import { AppContext } from "../../App";
import RulesModal from "./RulesModal";

const data = flattenTree(sampleTreeData);

function RulesTreeView() {
    const [selectedIds, setSelectedIds] = useState(sampleTreeData.selectedIds);
    const { dataQualityStates, setDataQualityStates } = useContext(AppContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalElement, setModalElement] = useState();

    const [isDropped, setIsDropped] = useState(false);
    const onDragOver = (event) => {
        event.preventDefault(); // Required to allow dropping
    };

    const onDrop = (event) => {
        event.preventDefault();
        setIsDropped(true);
        setDataQualityStates((prev) => ({
            ...prev,
            droppableColumnName: event.target.textContent,
        }));
    };

    return (
        <>
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
                    onSelect={(props) =>
                        console.log("onSelect callback: ", props)
                    }
                    onNodeSelect={(props) =>
                        console.log("onNodeSelect callback: ", props)
                    }
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
                            <>
                                <div
                                    {...getNodeProps({ onClick: handleExpand })}
                                    style={{
                                        marginLeft: 40 * (level - 1.1),
                                    }}
                                >
                                    <div>
                                        {!isBranch && (
                                            <CheckBoxIcon
                                                className="checkbox-icon"
                                                onClick={(e) => {
                                                    handleSelect(e);

                                                    element.metadata.checked =
                                                        !isSelected;

                                                    e.stopPropagation();
                                                }}
                                                variant={
                                                    isSelected ? "all" : "none"
                                                }
                                            />
                                        )}

                                        {!isBranch && (
                                            <div
                                                style={{
                                                    display: "inline-flex",
                                                }}
                                            >
                                                {element.name}
                                                <FcEditImage
                                                    onClick={() => {
                                                        element.modalKey =
                                                            "value";
                                                        setModalElement(
                                                            element
                                                        );
                                                        setModalOpen(true);
                                                    }}
                                                />
                                                <IoFilterCircleOutline
                                                    onClick={() => {
                                                        element.modalKey =
                                                            "filter";
                                                        setModalElement(
                                                            element
                                                        );
                                                        setModalOpen(true);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div
                                    {...getNodeProps({ onClick: handleExpand })}
                                    // opacity: isDisabled ? 0.5 : 1,
                                >
                                    {isBranch && (
                                        <ArrowIcon isOpen={isExpanded} />
                                    )}
                                    {isBranch && (
                                        <div
                                            style={{
                                                display: "inline-flex",
                                            }}
                                            onDragOver={onDragOver}
                                            onDrop={onDrop}
                                        >
                                            {element.name}
                                            <CheckBoxIcon variant={"none"} />
                                            <IoFilterCircleOutline
                                                onClick={() => {
                                                    element.modalKey =
                                                        element.metadata.id ===
                                                        1
                                                            ? "dataset_filters"
                                                            : "column_filters";
                                                    setModalElement(element);
                                                    setModalOpen(true);
                                                }}
                                            />
                                            <BsEyeFill />
                                        </div>
                                    )}
                                </div>
                            </>
                        );
                    }}
                />
            </div>
            {isDropped && (
                <AddMoreRulesModal
                    isOpen={isDropped}
                    setModalOpen={setIsDropped}
                />
            )}
            {isModalOpen && (
                <RulesModal
                    isOpen={isModalOpen}
                    setModalOpen={setModalOpen}
                    theme={"light"}
                    treeElement={modalElement}
                />
            )}
        </>
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
