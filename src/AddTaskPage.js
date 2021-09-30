import React from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

export function AddTaskPage(props) {

    return (
        <form>
            <label id="addTask" htmlFor="newTask">Add New Task:</label>
            <input type="text" id="newTask" name="newTask" onChange={(e) => props.addNewDataPoint(e.target.value)} />
            <input type="submit" value="Add" />
        </form>
    );
}
