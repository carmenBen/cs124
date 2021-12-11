import App from "./App";

export function InMemoryApp(props) {
    return <App initialData={props.initialData} collection={props.collection} auth={props.auth}/>
}