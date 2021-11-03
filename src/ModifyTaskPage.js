import React from "react";

export function ModifyTaskPage(props) {
    const [title, setTitle] = React.useState(props.taskName);
    const [priority, setPriority] = React.useState(props.priority);

    function onModifyClick() {
        if (props.taskName !== title) {
            props.handleChangeField(props.id, "title", title);
        }
        if (props.priority !== priority) {
            props.handleChangeField(props.id, "priority", priority);
        }
    }

    return (
        <div>
            <label id="modifyTask" htmlFor="changeTask">Modify Task:</label>
            <input type="text" id="changeTask" name="changeTask" defaultValue={props.taskName} onChange={(e) => setTitle(e.target.value)}/>
            <select name="priority" id="priority-dropdown" onChange={(e) => setPriority(e.target.value)}>
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
            </select>
            <input type="button" value="Cancel"
                   onClick={() => props.cancel()}/>
            <input type="button" value="Modify"
                   onClick={() => onModifyClick()}/>
        </div>
    );
}