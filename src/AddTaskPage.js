import React from "react";

export function AddTaskPage(props) {
    const [title, setTitle] = React.useState("");
    const [priority, setPriority] = React.useState("1");
    console.log("in new task page");

    return (
        <div>
            <label id="addTask" htmlFor="newTask">Add New Task:</label>
            <input type="text" id="newTask" name="newTask" onChange={(e) => setTitle(e.target.value)}/>
            <select name="priority" id="priority-dropdown" aria-label="dropdown to select priority" onChange={(e) => setPriority(e.target.value)}>
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
            </select>
            <input type="button" value="Cancel"
                   onClick={() => props.cancel()}/>
            <input type="button" value="Add"
                   onClick={(e) => props.addNewDataPoint(title, priority)}/>
        </div>
    );
}
