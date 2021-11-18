import React from "react";

export function ConfirmDeletePage(props) {

    return (
        <div>
            <h1 id="deleteList">Are you sure you want to delete {props.listName}?</h1>
            <input type="button" value="Cancel" aria-label={"Cancel delete " + props.listName}
                   onClick={() => props.cancel()}/>
            <input type="button" value="Confirm" aria-label={"Delete " + props.listName}
                   onClick={() => props.deleteCurrentList(props.listId)}/>
        </div>
    );
}
