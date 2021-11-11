import React from "react";

export function AddNewListPage(props) {
    const [title, setTitle] = React.useState("");

    return (
        <div>
            <label id="addList" htmlFor="newList">Add New List:</label>
            <input type="text" id="newList" name="newList"
                   onChange={(e) => setTitle(e.target.value)}/>
            <input type="button" value="Cancel"
                   onClick={() => props.cancel()}/>
            <input type="button" value="Add"
                   onClick={(e) => props.addNewList(title)}/>
        </div>
    );
}
