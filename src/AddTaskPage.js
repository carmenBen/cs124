import React from "react";

export function AddTaskPage(props) {

    return (
        <div>
            <label id="addTask" htmlFor="newTask">Add New Task:</label>
            <input type="text" id="newTask" name="newTask"/>
            <input type="button" value="Add"
                   onClick={() => props.addNewDataPoint(document.getElementById("newTask").value)}/>
        </div>
    );
}
