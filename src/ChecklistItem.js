import '../node_modules/font-awesome/css/font-awesome.min.css';

export function ChecklistItem(props) {

    return (
        <div className={"checklist"}>
            <input key={props.id} type="checkbox" onInput={props.checkFunction} id={props.id}
                   name={props.id} value={props.id} defaultChecked={props.completed}/>
            <label htmlFor={props.id}>{props.title}</label>
            <button onClick={() => props.modifyTask(props.title, props.id)}>Modify</button>
        </div>
    );

    //
}