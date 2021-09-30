import React from "react";
import {ChecklistItem} from "./ChecklistItem";

export function Checklist(props) {
    const initialCompletedItems = props.items.map((item) => item.completed ? item.id : undefined);
    let [completedItems, setCompletedItems] = React.useState(initialCompletedItems);

    function onCheck(id) {
        const currentIndex = completedItems.indexOf(id);
        if (currentIndex > -1) {
            completedItems = completedItems.filter(item => item !== id);
            setCompletedItems(completedItems);
            props.handleChangeField(id, "completed", false);
        } else {
            completedItems = [...completedItems, id];
            setCompletedItems(completedItems);
            props.handleChangeField(id, "completed", true);
        }
    }

    const completedItemsToRender = props.items.map((item) => (completedItems.indexOf(item.id) > -1) ?
        <ChecklistItem key={item.id} id={item.id} title={item.title} completed={true}
                       checkFunction={() => onCheck(item.id)}/> : undefined);
    const incompleteItemsToRender = props.items.map((item) => (completedItems.indexOf(item.id) <= -1) ?
        <ChecklistItem key={item.id} id={item.id} title={item.title} completed={false}
                       checkFunction={() => onCheck(item.id)}/> : undefined);

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