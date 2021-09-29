import React from "react";

export function AddTaskPage(props) {
    let inputText = null;
    function handleSubmit() {
        if (inputText !== null) {
            let newDataMember = {
                title: {inputText},
                id: Math.random() * 1000,
                completed: false
            }
            props.addDataMember(newDataMember);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label id="addTask" htmlFor="newTask">Add New Task:</label>
            <input type="text" id="newTask" name="newTask" ref={(c) => inputText = c} />
            <input type="submit" value="Add" />
        </form>
    );
}
