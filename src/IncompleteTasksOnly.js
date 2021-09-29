import React from "react";
import {ChecklistItem} from "./ChecklistItem";

export function IncompleteTasksOnly(props) {
    const initialCompletedItems = props.items.map((item) => item.completed ? item.id : undefined);
    let [completedItems, setCompletedItems] = React.useState(initialCompletedItems);

    function onCheck(id) {
        const currentIndex = completedItems.indexOf(id);
        if (currentIndex > -1) {
            completedItems = completedItems.filter(item => item !== id);
            setCompletedItems(completedItems);
        } else {
            completedItems = [...completedItems, id];
            setCompletedItems(completedItems);
        }
    }

    const incompleteItemsToRender = props.items.map((item) => (completedItems.indexOf(item.id) <= -1) ?
        <ChecklistItem id={item.id} title={item.title} completed={false}
                       checkFunction={() => onCheck(item.id)}/> : undefined);

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