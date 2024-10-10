import React, { createContext, useContext, useState } from "react";
import "./add-more-rules.css";
import { AppContext } from "../../App";

const DragAndDropDiv = () => {
    const { dataQualityStates, setDataQualityStates } = useContext(AppContext);

    const onDragStart = (event, item) => {
        console.log(item);

        event.dataTransfer.setData("text/plain", item); // Storing the item in the transfer object
        setDataQualityStates((prev) => ({
            ...prev,
            draggableColumnName: item,
        }));
    };

    const addMoreRulesList = [
        "expect_column_values_to_match_regex_list",
        "has_array_with_dict",
        "date_column_values_to_match_strftime_format",
        "valid_row_count",
        "no_of_distinct_values",
        "expect_column_values_to_be_in_set",
    ];
    return (
        <div className="container">
            <div className="draggables">
                {addMoreRulesList.map((item, index) => (
                    <div
                        className="draggable"
                        key={index}
                        draggable
                        onDragStart={(e) => onDragStart(e, item)}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DragAndDropDiv;
