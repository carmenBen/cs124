import './App.css';
import {Checklist} from './Checklist.js'
import {AddTaskPage} from "./AddTaskPage";
import React, {useEffect, useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {ModifyTaskPage} from "./ModifyTaskPage";
import {useCollection} from "react-firebase-hooks/firestore";
import firebase from "firebase/compat";

export function App(props) {
    const [sortValue, setSortValue] = useState("title");
    const [value, loading, error] = useCollection(props.collection.orderBy(sortValue, "asc"));
    let data = [];
    if (value !== undefined) {
        data = value.docs.map(doc =>
            doc.data());
    }
    const [incompleteTasksOnly, setIncompleteTasksOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState("checklist");
    const [currentTaskNameId, setCurrentTaskNameId] = useState([]);
    const taskButtonValue = (!incompleteTasksOnly ? "Hide Completed Tasks" : "Show Completed Tasks");

    function addNewItem(value, priority) {
        const id = generateUniqueID();
        props.collection.doc(id).set(
            {
                title: value,
                id: id,
                completed: false,
                priority: priority,
                created: firebase.database.ServerValue.TIMESTAMP
            }
        );
        setCurrentPage("checklist");
    }

    function returnToHomePage() {
        setCurrentPage("checklist");
    }

    function handleChangeField(id, field, value) {
        props.collection.doc(id).update({
            [field]: value,
        });
        setCurrentPage("checklist");
    }

    function handleDelete(id) {
        props.collection.doc(id).delete();
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

    return (
        <div className="App">
            <h1>
                To Do List <br/>
                {currentPage === "checklist" &&
                <div id="sort-by">Sort by:
                    <select name="sortBy" id="sortByDropdown"
                            onChange={(e) => setSortValue(e.target.value)}>
                        <option value="title">Title</option>
                        <option value="priority">Priority</option>
                        <option value="created">Date created</option>
                    </select></div>
                }
            </h1>

            {currentPage === "checklist" &&
            <div>
                <Checklist items={data}
                           handleChangeField={handleChangeField}
                           modifyTask={modifyTask}
                           completedItems={data.filter((task) => task.completed)}
                           incompleteTasksOnly={incompleteTasksOnly}
                />
                <div>
                    <input type="button" value="Add New Task" onClick={renderAddTaskPage}/>
                    {(data.filter((task) => task.completed)).length > 0 &&
                    <input type="button" value={"Delete Completed Items"}
                           onClick={deleteCompletedItems}/>
                    }
                    <input type="button" value={taskButtonValue}
                           onClick={changeItemsToShow}/>
                </div>
            </div>}
            {currentPage === "modifyTask" && <ModifyTaskPage handleChangeField={handleChangeField}
                                                             taskName={currentTaskNameId[0]} id={currentTaskNameId[1]}
                                                             cancel={returnToHomePage}/>}
            {currentPage === "addTask" && <AddTaskPage addNewDataPoint={addNewItem} cancel={returnToHomePage}/>}
        </div>
    );
}

export default App;
