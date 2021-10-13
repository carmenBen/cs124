import './App.css';
import {Checklist} from './Checklist.js'
import {AddTaskPage} from "./AddTaskPage";
import {useEffect, useState} from "react";
import {IncompleteTasksOnly} from "./IncompleteTasksOnly";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {ModifyTaskPage} from "./ModifyTaskPage";

export function App(props) {

    const [data, setData] = useState(props.initialData);
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
    }, [data]);

    useEffect(() => {
        setComponentsToRender(<Checklist items={data} handleChangeField={handleChangeField} modifyTask={modifyTask}
                                         completedItems={completedItems} changeCompletedItems={setCompletedItems}/>);
        setShowButtons(true);
    }, [completedItems]);

    function addNewItem(value) {
        let newDataMember = {
            title: value,
            id: generateUniqueID(),
            completed: false,
        }
        const newData = [...data, newDataMember];
        setData(newData);
    }

    function handleChangeField(id, field, value) {
        console.log("value: " + value);
        const newData = data.map(item => id === item.id ? {...item, [field]: value} : item);
        setData(newData);
    }

    function deleteCompletedItems() {
        console.log(completedItems);
        console.log(data);
        setData(data.filter(item => !(item.completed)));
        setCompletedItems([]);
        console.log("deleted items");
        console.log(completedItems);
    }

    function renderAddTaskPage() {
        setComponentsToRender(<AddTaskPage addNewDataPoint={addNewItem}/>);
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
        setComponentsToRender(<ModifyTaskPage handleChangeField={handleChangeField} taskName={taskName} id={id}/>)
        setShowButtons(false);
    }

    return (
        <div className="App">
            <h1>To Do List</h1>
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
