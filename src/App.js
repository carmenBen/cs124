import './App.css';
import {Checklist} from './Checklist.js'
import {AddTaskPage} from "./AddTaskPage";
import {useState} from "react";
import {IncompleteTasksOnly} from "./IncompleteTasksOnly";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

export function App(props) {
    let [itemsToShow, setItemsToShow] = useState("both");
    let [componentsToRender, setComponentsToRender] = useState(<Checklist items={props.data}/>);

    let taskButtonValue = (itemsToShow === "both" ? "Hide Completed Tasks" : "Show Completed Tasks");
    let [showButtons, setShowButtons] = useState(true);

    function renderAddTaskButton() {
        return (
            <input type="button" value="Add New Task" onClick={renderAddTaskPage}/>);
    }

    function renderChangeItemsButton() {
        return (
            <input type="button" value={taskButtonValue}
                   onClick={changeItemsToShow}/>);
    }

    function renderAddTaskPage() {
        setComponentsToRender(<AddTaskPage addNewDataPoint={props.addNewDataPoint}/>);
        setShowButtons(!showButtons);
    }

    function changeItemsToShow() {
        setItemsToShow((itemsToShow === "incomplete" ? "both" : "incomplete"));
        if (itemsToShow === "both") {
            setComponentsToRender(<IncompleteTasksOnly items={props.data} />);
        } else {
            setComponentsToRender(<Checklist items={props.data} handleChangeField={props.handleChangeField}/>);
        }

    }

    return (
        <div className="App">
            {componentsToRender}
            {showButtons ? renderAddTaskButton() : undefined}
            {showButtons ? renderChangeItemsButton() : undefined}

        </div>
    );
}

export default App;
