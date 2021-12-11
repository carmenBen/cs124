import React from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {ConfirmDeletePage} from "./ConfirmDeletePage";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {AddNewListPage} from "./AddNewListPage";
import {SettingsPage} from "./SettingsPage";
import {ConfirmLeaveListPage} from "./ConfirmLeaveListPage";

export function ListSelector(props) {
    const [listSharedValues, loadingShared, errorShared] = useCollection(props.collection.where('sharing', "array-contains", props.user.email));
    const [listOwnedValues, loadingOwned, errorOwned] = useCollection(props.collection.where('owner', "==", props.user.uid));
    let listsOwned = [];
    let listsShared = [];
    if (listOwnedValues !== undefined) {
        listsOwned = listOwnedValues.docs.map(doc =>
            doc.data());
    }
    if (listSharedValues !== undefined && props.user.emailVerified) {
        listsShared = listSharedValues.docs.map(doc =>
            doc.data());
    }

    function addNewList(title) {
        const id = generateUniqueID();
        props.collection.doc(id).set(
            {
                title: title,
                id: id,
                owner: props.user.uid,
                sharing: []
            }
        ).then(() => {
                // list doesn't exist yet, so wait for it to be created to change current list
                props.changeCurrentList(id);
                props.changeCurrentPage("checklist");
            }
        );

    }

    function deleteCurrentList(id) {
        props.changeCurrentList(null);
        props.collection.doc(id).delete();
        props.changeCurrentPage("checklist");
    }


    function removePersonFromList(email, newPage) {
        props.collection.doc(props.currentList).update({
            sharing: getListField("sharing").filter(item => item !== email),
        });
        props.changeCurrentPage(newPage);
        if(newPage === "checklist") {
            props.changeCurrentList(null);
        }
    }

    function getListField(field) {
        return (listsOwned.concat(listsShared)).filter(list => list.id === props.currentList)[0][field];
    }

    function shareList(email) {
        props.collection.doc(props.currentList).update({
            sharing: [...getListField("sharing"), email],
        });
    }

    return (
        <div>
            {!loadingShared && !loadingOwned && props.currentPage !== "newList" && props.currentList !== null &&
            <>
                <h1>{getListField("title")}
                {listsShared.filter(item => item.id === props.currentList).length > 0 && " (shared)"}</h1>
            </>}
            {props.currentPage === "checklist" && <div id="sort-by">Select a list:
                <select name="listSelector" aria-label="dropdown to select list" id="listSelectorDropdown"
                        onChange={(e) => props.changeCurrentList(e.target.value)}>
                    {props.currentList === null && <option disabled selected value>Select a list...</option>}
                    {listsOwned.map(item => <option value={item.id}
                                               selected={item.id === props.currentList}>{item.title}</option>)}
                    {listsShared.map(item => <option value={item.id}
                                                    selected={item.id === props.currentList}>{item.title + " (shared)"}</option>)}
                </select>
                <button id="addButton" aria-label="Add new list" onClick={() => props.changeCurrentPage("newList")}>
                    +
                </button>
                {props.currentList !== null && <span>
                {getListField("owner") === props.user.uid && <button id="settingsButton" value="View and Change List Settings" aria-label="View and Change List Settings"
                        onClick={() => props.changeCurrentPage("settings")}>
                    <i className="fa fa-cog" aria-hidden="true"/>
                </button>}
                {getListField("owner") !== props.user.uid && <button id="deleteButton" value="Delete Current List" aria-label="Delete list"
                    onClick={() => props.changeCurrentPage("leaveList")}>
                    <i className="fa fa-trash" aria-hidden="true"/>
                </button>}
                </span>

                }
            </div>}
            {props.currentPage === "deleteList" &&
            <ConfirmDeletePage listName={getListField("title")}
                               listId={props.currentList}
                               deleteCurrentList={deleteCurrentList}
                               cancel={() => props.changeCurrentPage("checklist")}/>}
            {props.currentPage === "leaveList" &&
            <ConfirmLeaveListPage listName={getListField("title")}
                               listId={props.currentList}
                                  user={props.user}
                               leaveCurrentList={removePersonFromList}
                               cancel={() => props.changeCurrentPage("checklist")}/>}
            {props.currentPage === "newList" &&
            <AddNewListPage addNewList={addNewList} cancel={() => props.changeCurrentPage("checklist")}/>}
            {props.currentPage === "settings" &&
            <SettingsPage removePerson={removePersonFromList} getListField={getListField} sharedWith={getListField("sharing")} shareList={shareList} changeCurrentPage={props.changeCurrentPage} cancel={() => props.changeCurrentPage("checklist")}/>}
        </div>
    );
}