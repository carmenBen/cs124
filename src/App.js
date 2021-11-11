import './App.css';
import {Checklist} from './Checklist.js'
import {AddTaskPage} from "./AddTaskPage";
import React, {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {ModifyTaskPage} from "./ModifyTaskPage";
import {useCollection} from "react-firebase-hooks/firestore";
import firebase from "firebase/compat";
import {AddNewListPage} from "./AddNewListPage";
import {ConfirmDeletePage} from "./ConfirmDeletePage";

export function App(props) {

    const [sortValue, setSortValue] = useState("title");
    const [listValue, loading, error] = useCollection(props.collection);
    let lists = [
        // {
        //     title: "other list",
        //     id: "v1-1636655036490-9127893358184"
        // }
        {
            title: "To Do",
            id: "v1-1636654768436-2119059561616"
        }
    ];
    if (listValue !== undefined) {
        console.log("reading in lists");
        lists = listValue.docs.map(doc =>
            doc.data());
    }
    const [currentList, setCurrentList] = useState(lists[0].id);
    const [taskValue, taskLoading, taskError] = useCollection(props.collection.doc(currentList).collection("tasks").orderBy(sortValue, "asc"));
    let data = [];
    if (taskValue !== undefined) {
        data = taskValue.docs.map(doc =>
            doc.data());
    }

    const [incompleteTasksOnly, setIncompleteTasksOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState("checklist");
    const [currentTaskNameId, setCurrentTaskNameId] = useState([]);
    const taskButtonValue = (!incompleteTasksOnly ? "Hide Completed Tasks" : "Show Completed Tasks");

    function addNewItem(value, priority) {
        const id = generateUniqueID();
        props.collection.doc(currentList).collection("tasks").doc(id).set(
            {
                title: value,
                id: id,
                completed: false,
                priority: priority,
                created: firebase.database.ServerValue.TIMESTAMP,
                list: currentList
            }
        );
        setCurrentPage("checklist");
    }

    function returnToHomePage() {
        setCurrentPage("checklist");
    }

    function handleChangeField(id, field, value) {
        props.collection.doc(currentList).collection("tasks").doc(id).update({
            [field]: value,
        });
        setCurrentPage("checklist");
    }

    function handleDelete(id) {
        props.collection.doc(currentList).collection("tasks").doc(id).delete();
        setCurrentPage("checklist");
    }

    function deleteCompletedItems() {
        data.forEach(item => item.completed && handleDelete(item.id));
        setCurrentPage("checklist");
    }

    function renderAddTaskPage() {
        setCurrentPage("addTask");
    }

    function changeItemsToShow() {
        setIncompleteTasksOnly(!incompleteTasksOnly);
        setCurrentPage("checklist");
    }

    function modifyTask(taskName, id) {
        setCurrentPage("modifyTask");
        setCurrentTaskNameId([taskName, id]);
    }

    function renderAddNewListPage() {
        setCurrentPage("newList");
    }

    function addNewList(title) {
        const id = generateUniqueID();
        props.collection.doc(id).set(
            {
                title: title,
                id: id,
            }
        );
        console.log("added new list");
        setCurrentList(lists[0].id);
        setCurrentPage("checklist");
    }

    function deleteCurrentList(id) {
        props.collection.doc(id).delete();
        console.log("id: ", id);
        setCurrentList(lists[0].id);
        setCurrentPage("checklist");
    }

    function renderDeletePage() {
        setCurrentPage("deleteList");
    }

    return (
        <div className="App">
            <h1>
                {/*{console.log("current list: ", currentList)}*/}
                {/*{console.log("lists: ", lists)}*/}
                {/*{console.log("loading: ", loading)}*/}
                {!loading && lists.filter(list => list.id === currentList)[0].title}
                {/*//<br/>*/}
                {currentPage === "checklist" &&
                <div className="selectDropdowns">
                    <div id="sort-by">Sort by:
                        <select name="sortBy" id="sortByDropdown" aria-label="dropdown to select value to sort by"
                                onChange={(e) => setSortValue(e.target.value)}
                                defaultValue={sortValue}>
                            <option value="title" selected={sortValue === "title"}>Title</option>
                            <option value="priority" selected={sortValue === "priority"}>Priority</option>
                            <option value="created" selected={sortValue === "created"}>Date created</option>
                        </select></div>
                    <div id="sort-by">Select a list:
                        <select name="listSelector" aria-label="dropdown to select list" id="listSelectorDropdown"
                                onChange={(e) => setCurrentList(e.target.value)}>
                            {lists.map(item => <option value={item.id}
                                                       selected={item.id === currentList}>{item.title}</option>)}
                        </select>
                        <button id="addButton" aria-label="Add new list" onClick={() => renderAddNewListPage()}>
                            +
                        </button>
                        {currentList !== "v1-1636654768436-2119059561616" &&
                        <button id="deleteButton" value="Delete Current List" aria-label="Delete list" onClick={() => renderDeletePage()}>
                            <i className="fa fa-trash" aria-hidden="true"/>
                        </button>}
                    </div>
                </div>
                }
            </h1>

            {currentPage === "deleteList" &&
            <ConfirmDeletePage listName={lists.filter(list => list.id === currentList)[0].title} listId={currentList} deleteCurrentList={deleteCurrentList} cancel={returnToHomePage}/>}

            {currentPage === "checklist" &&
            <div>
                <Checklist items={data}
                           handleChangeField={handleChangeField}
                           modifyTask={modifyTask}
                           completedItems={data.filter((task) => task.completed)}
                           incompleteTasksOnly={incompleteTasksOnly}
                />
                <div className="buttons">
                    <input type="button" value="Add New Task" onClick={renderAddTaskPage}/>
                    <input type="button" value={taskButtonValue}
                           onClick={changeItemsToShow}/>
                    {(data.filter((task) => task.completed)).length > 0 &&
                    <input type="button" value={"Delete Completed Tasks"}
                           onClick={deleteCompletedItems}/>
                    }
                </div>
            </div>}
            {currentPage === "modifyTask" && <ModifyTaskPage handleChangeField={handleChangeField}
                                                             taskName={currentTaskNameId[0]} id={currentTaskNameId[1]}
                                                             cancel={returnToHomePage}/>}
            {currentPage === "addTask" && <AddTaskPage addNewDataPoint={addNewItem} cancel={returnToHomePage}/>}
            {currentPage === "newList" && <AddNewListPage addNewList={addNewList} cancel={returnToHomePage}/>}
        </div>
    );
}

export default App;
