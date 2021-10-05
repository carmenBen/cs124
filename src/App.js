import './App.css';
import {Checklist} from './Checklist.js'
import {AddTaskPage} from "./AddTaskPage";
import {useEffect, useState} from "react";
import {IncompleteTasksOnly} from "./IncompleteTasksOnly";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {ModifyTaskPage} from "./ModifyTaskPage";

export function App(props) {

    let [data, setData] = useState(props.initialData);
    let [itemsToShow, setItemsToShow] = useState("both");
    const initialCompletedItems = data.map((item) => item.completed ? item.id : undefined);
    let [completedItems, setCompletedItems] = useState(initialCompletedItems);
    let [componentsToRender, setComponentsToRender] = useState(<Checklist items={data} handleChangeField={handleChangeField} modifyTask={modifyTask} completedItems={completedItems} changeCompletedItems={setCompletedItems}/>);

    let taskButtonValue = (itemsToShow === "both" ? "Hide Completed Tasks" : "Show Completed Tasks");
    let [showButtons, setShowButtons] = useState(true);

    useEffect(() => {
        setComponentsToRender(<Checklist items={data} handleChangeField={handleChangeField} modifyTask={modifyTask} completedItems={completedItems} changeCompletedItems={setCompletedItems}/>);
        setShowButtons(true);
    }, [data]);

    useEffect(() => {
        setComponentsToRender(<Checklist items={data} handleChangeField={handleChangeField} modifyTask={modifyTask} completedItems={completedItems} changeCompletedItems={setCompletedItems}/>);
        setShowButtons(true);
    }, [completedItems]);

    function addNewDataPoint(e, value) {
        e.preventDefault();
        let newDataMember = {
            title: value,
            id: generateUniqueID(),
            completed: false,
        }
        let newData = [...data, newDataMember];
        setData(newData);
    }

    function handleChangeField(e, id, field, value) {
        e.preventDefault();
        console.log("handling chang efield");
        console.log(id, value);
        console.log(data);
        let newData = data.map(item => id === item.id ? {...item, [field]: value} : item);
        setData(newData);
        console.log(data);
    }

    function renderAddTaskButton() {
        return (
            <input type="button" value="Add New Task" onClick={renderAddTaskPage}/>);
    }

    function renderChangeItemsButton() {
        return (
            <input type="button" value={taskButtonValue}
                   onClick={changeItemsToShow}/>);
    }

    function deleteCompletedItems() {
        console.log(completedItems);
        setData(data.filter(item => !(item.completed)));
        setCompletedItems([]);
        console.log(completedItems);
    }

    function renderDeleteItemsButton() {
        if (completedItems.length > 0) {
            return (
                <input type="button" value={"Delete Completed Items"}
                       onClick={deleteCompletedItems}/>
            );
        }
    }

    function renderAddTaskPage() {
        setComponentsToRender(<AddTaskPage addNewDataPoint={addNewDataPoint}/>);
        setShowButtons(!showButtons);
    }

    function changeItemsToShow() {
        setItemsToShow((itemsToShow === "incomplete" ? "both" : "incomplete"));
        if (itemsToShow === "both") {
            setComponentsToRender(<IncompleteTasksOnly items={data} />);
        } else {
            setComponentsToRender(<Checklist items={data} handleChangeField={handleChangeField} modifyTask={modifyTask} completedItems={completedItems} changeCompletedItems={setCompletedItems}/>);
        }
    }

    function modifyTask(taskName, id) {
        setComponentsToRender(<ModifyTaskPage handleChangeField={handleChangeField} taskName={taskName} id={id}/>)
        setShowButtons(false);
    }

    return (
        <div className="App">
            {componentsToRender}
            {showButtons ? renderAddTaskButton() : undefined}
            {showButtons ? renderChangeItemsButton() : undefined}
            {showButtons ? renderDeleteItemsButton() : undefined}

        </div>
    );
}

export default App;
