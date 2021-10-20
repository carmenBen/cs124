import React from "react";

export function ModifyTaskPage(props) {
    function onModifyClick() {
        props.handleChangeField(props.id, "title", document.getElementById("changeTask").value);
        props.handleChangeField(props.id, "priority", document.getElementById("priority-dropdown").value);
    }

    return (
        <div>
            <label id="modifyTask" htmlFor="changeTask">Modify Task:</label>
            <input type="text" id="changeTask" name="changeTask" defaultValue={props.taskName}/>
            <select name="priority" id="priority-dropdown">
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