import App from "./App";
import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

export function InMemoryApp(props) {
    let [data, setData] = useState(props.initialData);

    function addNewDataPoint(value) {
        let newDataMember = {
            title: value,
            id: generateUniqueID(),
            completed: false,
        }
        setData([...data, newDataMember]);
    }

    function handleChangeField(id, field, value) {
        let newData = data.map(item => id === item.id ? {...item, [field]: value} : item);
        setData(newData);
    }

    return <App data={data} addNewDataPoint={addNewDataPoint} handleChangeField={handleChangeField}/>
}