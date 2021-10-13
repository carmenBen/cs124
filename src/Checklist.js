import React from "react";
import {ChecklistItem} from "./ChecklistItem";

export function Checklist(props) {

    function onCheck(e, id) {
        e.target.checked ? props.changeCompletedItems([...props.completedItems, id]) :
            props.changeCompletedItems(props.completedItems.filter((item) => item !== id));
        props.handleChangeField(id, "completed", e.target.checked);
    }

    const completedItemsToRender = props.items.map((item) => (item.completed ?
        <ChecklistItem key={item.id} id={item.id} title={item.title} completed={true}
                       checkFunction={(e) => onCheck(e, item.id)} modifyTask={props.modifyTask}/> : undefined));
    const incompleteItemsToRender = props.items.map((item) => (!(item.completed) ?
        <ChecklistItem key={item.id} id={item.id} title={item.title} completed={false}
                       checkFunction={(e) => onCheck(e, item.id)} modifyTask={props.modifyTask}/> : undefined));

    return (
        <form>
            <table>
                <tr>
                    <th>Complete</th>
                    <th>Incomplete</th>
                </tr>
                <tr>
                    <td>{completedItemsToRender}</td>
                    <td>{incompleteItemsToRender}</td>
                </tr>
            </table>
        </form>
    );
}