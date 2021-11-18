import './App.css';
import {Checklist} from './Checklist.js'
import React, {useState} from "react";
import {ListSelector} from "./ListSelector";

export function App(props) {

    const [sortValue, setSortValue] = useState("title");
    const [currentList, setCurrentList] = useState(null);
    const [currentPage, setCurrentPage] = useState("checklist");

    function changeCurrentPage(newPage) {
        console.log("new page ", newPage);
        setCurrentPage(newPage);
        console.log("current page ", currentPage);
    }

    function changeCurrentList(id) {
        setCurrentList(id);
        console.log("initial current list: ", currentList);
        console.log("changing current list");
        console.log("new list id: ", id);
        console.log("current list: ", currentList);
    }

    return (
        <div className="App">
            <h1>
                <ListSelector currentList={currentList} changeCurrentList={changeCurrentList}
                              collection={props.collection} changeCurrentPage={changeCurrentPage}
                              currentPage={currentPage}
                />
                {currentPage === "checklist" && currentList !== null &&
                <div className="selectDropdowns">
                    <div id="sort-by">Sort by:
                        <select name="sortBy" id="sortByDropdown" aria-label="dropdown to select value to sort by"
                                onChange={(e) => setSortValue(e.target.value)}
                                defaultValue={sortValue}>
                            <option value="title" selected={sortValue === "title"}>Title</option>
                            <option value="priority" selected={sortValue === "priority"}>Priority</option>
                            <option value="created" selected={sortValue === "created"}>Date created</option>
                        </select></div>
                </div>
                }
            </h1>

            {currentList !== null &&
            <div>
                <Checklist currentList={currentList}
                           sortValue={sortValue}
                           changeCurrentPage={changeCurrentPage}
                           collection={props.collection}
                           currentPage={currentPage}
                />

        </div>}
                </div>
    );
}

export default App;
