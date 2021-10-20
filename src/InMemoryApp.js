import App from "./App";
import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

export function InMemoryApp(props) {
    return <App initialData={props.initialData} collection={props.collection} />
}