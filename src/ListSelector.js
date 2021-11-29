import React from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {ConfirmDeletePage} from "./ConfirmDeletePage";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {AddNewListPage} from "./AddNewListPage";

export function ListSelector(props) {
    const [listValues, loading, error] = useCollection(props.collection.where('owner', "==", props.user.uid));
    let lists = [];
    if (listValues !== undefined) {
        lists = listValues.docs.map(doc =>
            doc.data());
    }

    function addNewList(title) {
        const id = generateUniqueID();
        props.collection.doc(id).set(
            {
                title: title,
                id: id,
                owner: props.user.uid
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
        console.log("id: ", id);
        props.changeCurrentPage("checklist");
    }


    return (
        <div>
            {!loading && props.currentPage !== "newList" && props.currentList !== null && lists.filter(list => list.id === props.currentList)[0].title}
            {props.currentPage === "checklist" && <div id="sort-by">Select a list:
                <select name="listSelector" aria-label="dropdown to select list" id="listSelectorDropdown"
                        onChange={(e) => props.changeCurrentList(e.target.value)}>
                    {props.currentList === null && <option disabled selected value>Select a list...</option>}
                    {lists.map(item => <option value={item.id}
                                               selected={item.id === props.currentList}>{item.title}</option>)}
                </select>
                <button id="addButton" aria-label="Add new list" onClick={() => props.changeCurrentPage("newList")}>
                    +
                </button>
                {props.currentList !== null &&
                <button id="deleteButton" value="Delete Current List" aria-label="Delete list"
                        onClick={() => props.changeCurrentPage("deleteList")}>
                    <i className="fa fa-trash" aria-hidden="true"/>
                </button>}
            </div>}
            {props.currentPage === "deleteList" &&
            <ConfirmDeletePage listName={lists.filter(list => list.id === props.currentList)[0].title}
                               listId={props.currentList}
                               deleteCurrentList={deleteCurrentList}
                               cancel={() => props.changeCurrentPage("checklist")}/>}
            {props.currentPage === "newList" &&
            <AddNewListPage addNewList={addNewList} cancel={() => props.changeCurrentPage("checklist")}/>}
        </div>
    );
}