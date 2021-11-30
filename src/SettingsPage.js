import React from "react";

export function SettingsPage(props) {
    const [email, setEmail] = React.useState("");

    return (
        <div>
            <button value="Delete Current List" aria-label="Delete list"
                    onClick={() => props.changeCurrentPage("deleteList")}>
                Delete List
            </button>
            <h1 id="shareList" htmlFor="shareListEmail" className="miscTextLarger">Enter an email to share this list with:</h1>
            <input type="text" id="shareListEmail" name="shareListEmail"
                   onChange={(e) => setEmail(e.target.value)}/>
            <input type="button" value="Share"
                   onClick={(e) => props.shareList(email)}/>
            {props.sharedWith.length > 0 && <>
                <h1 className="miscTextLarger">Users currently shared with:</h1>
                {props.sharedWith.map(person => (
                        <div className="miscText">
                            {person}
                            <button className="removePersonButton" value="Remove List Sharing"
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
