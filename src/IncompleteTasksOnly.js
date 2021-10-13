import React from "react";
import {ChecklistItem} from "./ChecklistItem";

export function IncompleteTasksOnly(props) {
    function onCheck(e, id) {
        e.target.checked ? props.changeCompletedItems([...props.completedItems, id]) :
            props.changeCompletedItems(props.completedItems.filter((item) => item !== id));
        props.handleChangeField(id, "completed", e.target.checked);
    }

    const incompleteItemsToRender = props.items.map((item) => (props.completedItems.indexOf(item.id) <= -1) ?
        <ChecklistItem id={item.id} title={item.title} completed={false}
                       checkFunction={(e) => onCheck(e, item.id)}/> : undefined);

    return (
        <form>
            <table>
                <tr>
                    <th>Incomplete</th>
                </tr>
                <tr>
                    <td>{incompleteItemsToRender}</td>
                </tr>
            </table>
        </form>
    );
}