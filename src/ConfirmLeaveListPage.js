import React from "react";

export function ConfirmLeaveListPage(props) {

    return (
        <div>
            <h1 className="miscTextLarger" id="deleteList">Are you sure you want to leave {props.listName}?</h1>
               <h1 className="miscText"> Other users will still be able to view this list.</h1>
            <input type="button" value="Cancel" aria-label={"Cancel leave " + props.listName}
                   onClick={() => props.cancel()}/>
            <input type="button" value="Confirm" aria-label={"Leave " + props.listName}
                   onClick={() => props.leaveCurrentList(props.user.email, "checklist")}/>
        </div>
    );
}
