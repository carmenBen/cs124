import './App.css';
import {Checklist} from './Checklist.js'
import {AddTaskPage} from "./AddTaskPage";
import React, {useEffect, useState} from "react";
import {IncompleteTasksOnly} from "./IncompleteTasksOnly";
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
    const [itemsToShow, setItemsToShow] = useState("both");
    const initialCompletedItems = data.map((item) => item.completed ? item.id : undefined);
    const [completedItems, setCompletedItems] = useState(initialCompletedItems);
    const [componentsToRender, setComponentsToRender] = useState(<Checklist items={data}
                                                                            handleChangeField={handleChangeField}
                                                                            modifyTask={modifyTask}
                                                                            completedItems={completedItems}
                                                                            changeCompletedItems={setCompletedItems}/>);

    const taskButtonValue = (itemsToShow === "both" ? "Hide Completed Tasks" : "Show Completed Tasks");
    const [showButtons, setShowButtons] = useState(true);

    useEffect(() => {
        setComponentsToRender(<Checklist items={data} handleChangeField={handleChangeField} modifyTask={modifyTask}
                                         completedItems={completedItems} changeCompletedItems={setCompletedItems}/>);
        setShowButtons(true);
    }, [value]);

    useEffect(() => {
        setComponentsToRender(<Checklist items={data} handleChangeField={handleChangeField} modifyTask={modifyTask}
                                         completedItems={completedItems} changeCompletedItems={setCompletedItems}/>);
        setShowButtons(true);
    }, [completedItems]);

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
        console.log(priority);
    }

    function returnToHomePage() {
        setComponentsToRender(<Checklist items={data} handleChangeField={handleChangeField} modifyTask={modifyTask}
                                         completedItems={completedItems} changeCompletedItems={setCompletedItems}/>);
        setShowButtons(true);
    }

    function handleChangeField(id, field, value) {
        props.collection.doc(id).update({
            [field]: value,
        });
    }

    function handleDelete(id) {
        props.collection.doc(id).delete();
    }

    function deleteCompletedItems() {
        data.forEach(item => item.completed && handleDelete(item.id));
        setCompletedItems([]);
    }

    function renderAddTaskPage() {
        console.log("trying to render add task page");
        setComponentsToRender(<AddTaskPage addNewDataPoint={addNewItem} cancel={returnToHomePage}/>);
        setShowButtons(!showButtons);
    }

    function changeItemsToShow() {
        setItemsToShow((itemsToShow === "incomplete" ? "both" : "incomplete"));
        if (itemsToShow === "both") {
            setComponentsToRender(<IncompleteTasksOnly completedItems={completedItems}
                                                       changeCompletedItems={setCompletedItems}
                                                       handleChangeField={handleChangeField} items={data}/>);
        } else {
            setComponentsToRender(<Checklist items={data} handleChangeField={handleChangeField} modifyTask={modifyTask}
                                             completedItems={completedItems}
                                             changeCompletedItems={setCompletedItems}/>);
        }
    }

    function modifyTask(taskName, id) {
        setComponentsToRender(<ModifyTaskPage handleChangeField={handleChangeField} taskName={taskName} id={id} cancel={returnToHomePage}/>)
        setShowButtons(false);
    }

    return (
        <div className="App">
            <h1>
                To Do List <br/>
                {showButtons &&
                <div id="sort-by">Sort by:
                <select name="sortBy" id="sortByDropdown"
                        onChange={() => setSortValue(document.getElementById("sortByDropdown").value)}>
                    <option value="title">Title</option>
                    <option value="priority">Priority</option>
                    <option value="created">Date created</option>
                </select></div>
                }
            </h1>

            {componentsToRender}
            {showButtons && <div>
                <input type="button" value="Add New Task" onClick={renderAddTaskPage}/>
                {completedItems.length > 0 &&
                <input type="button" value={"Delete Completed Items"}
                       onClick={deleteCompletedItems}/>
                }
                <input type="button" value={taskButtonValue}
                       onClick={changeItemsToShow}/>
            </div>
            }
        </div>
    );
}

export default App;
