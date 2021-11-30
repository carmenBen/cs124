import React from "react";

export function SettingsPage(props) {
    const [email, setEmail] = React.useState("");

    return (
        <div>
            <button id="deleteButton" value="Delete Current List" aria-label="Delete list"
                    onClick={() => props.changeCurrentPage("deleteList")}>
                Delete List
            </button>
            <h1>Share List:</h1>
            <label id="shareList" htmlFor="shareListEmail">User email to share with:</label>
            <input type="text" id="shareListEmail" name="shareListEmail"
                   onChange={(e) => setEmail(e.target.value)}/>
            <input type="button" value="Share"
                   onClick={(e) => props.shareList(email)}/>
            {props.sharedWith.length > 0 && <>
                <h1>Users currently shared with:</h1>
                {props.sharedWith.map(person => (
                        <div>
                            {person}
                            <button id="removePersonButton" value="Remove List Sharing"
                                    aria-label={"Remove list sharing for " + person}
                                    onClick={() => props.removePerson(person, "settings")}>
                                <i className="fa fa-trash" aria-hidden="true"/>
                            </button>
                        </div>
                    )
                )}
            </>}
            <input type="button" value="Return To List"
                   onClick={() => props.cancel()}/>
        </div>
    );
}
