import React from "react";

export function ConfirmLeaveListPage(props) {

    return (
        <div>
            <h1 id="deleteList">Are you sure you want to leave {props.listName}?
                Other users will still be able to view this list.</h1>
            <input type="button" value="Cancel" aria-label={"Cancel leave " + props.listName}
                   onClick={() => props.cancel()}/>
            <input type="button" value="Confirm" aria-label={"Leave " + props.listName}
                   onClick={() => props.leaveCurrentList(props.user.email, "checklist")}/>
        </div>
    );
}
