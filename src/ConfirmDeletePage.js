import React from "react";

export function ConfirmDeletePage(props) {

    return (
        <div>
            <h1 id="deleteList">Are you sure you want to delete {props.listName}?</h1>
            <input type="button" value="Cancel"
                   onClick={() => props.cancel()}/>
            <input type="button" value="Confirm"
                   onClick={() => props.deleteCurrentList(props.listId)}/>
        </div>
    );
}
