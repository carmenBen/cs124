import React from "react";
import {ChecklistItem} from "./ChecklistItem";

export function Checklist(props) {


    function onCheck(e, id) {
        const currentIndex = props.completedItems.indexOf(id);
        props.handleChangeField(e, id, "completed", !(currentIndex > -1));
        if (currentIndex > -1) {
            props.changeCompletedItems(props.completedItems.filter((item) => item !== id))
        } else {
            props.changeCompletedItems([...props.completedItems, id]);
        }
    }

    const completedItemsToRender = props.items.map((item) => (props.completedItems.indexOf(item.id) > -1) ?
        <ChecklistItem key={item.id} id={item.id} title={item.title} completed={true}
                       checkFunction={(e) => onCheck(e, item.id)} modifyTask={props.modifyTask}/> : undefined);
    const incompleteItemsToRender = props.items.map((item) => (props.completedItems.indexOf(item.id) <= -1) ?
        <ChecklistItem key={item.id} id={item.id} title={item.title} completed={false}
                       checkFunction={(e) => onCheck(e, item.id)} modifyTask={props.modifyTask}/> : undefined);

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