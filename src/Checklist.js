import React from "react";
import {ChecklistItem} from "./ChecklistItem";

export function Checklist(props) {

    function onCheck(checked, id) {
        props.handleChangeField(id, "completed", checked);
    }

    function getItemsToRender(completed) {
        return props.items.map((item) => ((completed && item.completed) || (!completed && !item.completed) ?
            <ChecklistItem key={item.id} id={item.id} title={item.title} completed={item.completed}
                           checkFunction={(e) => onCheck(e.target.checked, item.id)} modifyTask={props.modifyTask}
                           priority={item.priority}/>
            : undefined));
    }

    return (
        <form>
            <table>
                <thead>
                    <tr>
                        {!props.incompleteTasksOnly && <th>Complete</th>}
                        <th>Incomplete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {!props.incompleteTasksOnly && <td>{getItemsToRender(true)}</td>}
                        <td>{getItemsToRender(false)}</td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}