import React, {useState} from "react";
import {ChecklistItem} from "./ChecklistItem";
import {useCollection} from "react-firebase-hooks/firestore";
import {ModifyTaskPage} from "./ModifyTaskPage";
import {AddTaskPage} from "./AddTaskPage";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import firebase from "firebase/compat";

export function Checklist(props) {

    const [taskValue, taskLoading, taskError] = useCollection(props.collection.doc(props.currentList).collection("tasks").orderBy(props.sortValue, "asc"));
    let data = [];
    if (taskValue !== undefined) {
        data = taskValue.docs.map(doc =>
            doc.data());
    }

    const [incompleteTasksOnly, setIncompleteTasksOnly] = useState(false);
    const taskButtonValue = (!incompleteTasksOnly ? "Hide Completed Tasks" : "Show Completed Tasks");
    const [currentTaskNameId, setCurrentTaskNameId] = useState([]);

    function addNewItem(value, priority) {
        const id = generateUniqueID();
        props.collection.doc(props.currentList).collection("tasks").doc(id).set(
            {
                title: value,
                id: id,
                completed: false,
                priority: priority,
                created: firebase.database.ServerValue.TIMESTAMP,
                list: props.currentList
            }
        );
        props.changeCurrentPage("checklist");
    }

    function handleChangeField(id, field, value) {
        props.collection.doc(props.currentList).collection("tasks").doc(id).update({
            [field]: value,
        });
        props.changeCurrentPage("checklist");
    }

    function handleDelete(id) {
        props.collection.doc(props.currentList).collection("tasks").doc(id).delete();
        props.changeCurrentPage("checklist");
    }

    function deleteCompletedItems() {
        data.forEach(item => item.completed && handleDelete(item.id));
        props.changeCurrentPage("checklist");
    }

    function changeItemsToShow() {
        setIncompleteTasksOnly(!incompleteTasksOnly);
        props.changeCurrentPage("checklist");
    }

    function modifyTask(taskName, id) {
        props.changeCurrentPage("modifyTask");
        setCurrentTaskNameId([taskName, id]);
    }

    function onCheck(checked, id) {
        handleChangeField(id, "completed", checked);
    }

    function getItemsToRender(completed) {
        return data.map((item) => ((completed && item.completed) || (!completed && !item.completed) ?
            <ChecklistItem key={item.id} id={item.id} title={item.title} completed={item.completed}
                           checkFunction={(e) => onCheck(e.target.checked, item.id)} modifyTask={modifyTask}
                           priority={item.priority}/>
            : undefined));
    }

    return (
        <div>
            {props.currentPage === "checklist" && <div>
                <form>
                    <table>
                        <thead>
                        <tr>
                            {!incompleteTasksOnly && <th>Complete</th>}
                            <th>Incomplete</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {!incompleteTasksOnly && <td>{getItemsToRender(true)}</td>}
                            <td>{getItemsToRender(false)}</td>
                        </tr>
                        </tbody>
                    </table>
                </form>

                <div className="buttons">
                    <input type="button" value="Add New Task" onClick={() => props.changeCurrentPage("addTask")}/>
                    <input type="button" value={taskButtonValue}
                           onClick={changeItemsToShow}/>
                    {(data.filter((task) => task.completed)).length > 0 &&
                    <input type="button" value={"Delete Completed Tasks"}
                           onClick={deleteCompletedItems}/>
                    }
                </div>
            </div>}
            <div>
                {
                    props.currentPage === "modifyTask" && <ModifyTaskPage handleChangeField={handleChangeField}
                                                                          taskName={currentTaskNameId[0]}
                                                                          id={currentTaskNameId[1]}
                                                                          cancel={() => props.changeCurrentPage("checklist")}/>
                }
                {
                    props.currentPage === "addTask" &&
                    <AddTaskPage addNewDataPoint={addNewItem} cancel={() => props.changeCurrentPage("checklist")}/>
                }
            </div>
        </div>
    )

}