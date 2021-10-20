import React from "react";

export function AddTaskPage(props) {

    return (
        <div>
            <label id="addTask" htmlFor="newTask">Add New Task:</label>
            <input type="text" id="newTask" name="newTask"/>
            <select name="priority" id="priority-dropdown">
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
            </select>
            <input type="button" value="Cancel"
                   onClick={() => props.cancel()}/>
            <input type="button" value="Add"
                   onClick={() => props.addNewDataPoint(document.getElementById("newTask").value,
                       document.getElementById("priority-dropdown").value)}/>
        </div>
    );
}
