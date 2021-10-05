import React from "react";

export function AddTaskPage(props) {

    return (
        <form onSubmit={(e) => props.addNewDataPoint(e, document.getElementById("newTask").value)}>
            <label id="addTask" htmlFor="newTask">Add New Task:</label>
            <input type="text" id="newTask" name="newTask" />
            <input type="submit" value="Add" />
        </form>
    );
}
