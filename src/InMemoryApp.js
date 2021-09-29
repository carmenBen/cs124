import App from "./App";
import {useState} from "react";

export function InMemoryApp(props) {
    let [data, setData] = useState(props.initialData);

    function addNewDataMember(newDataMember) {
        setData([...data, newDataMember]);
        console.log(newDataMember);
    }
    console.log("changing memory!");

    return <App data={data} changeData={(newDataMember) => addNewDataMember(newDataMember)}/>
}