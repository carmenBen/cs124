import '../node_modules/font-awesome/css/font-awesome.min.css';

export function ChecklistItem(props) {
    const inputTag = props.completed ?
        <input key={props.id} type="checkbox" onInput={props.checkFunction} id={props.id}
               name={props.id} value={props.id} defaultChecked={props.completed}/> :
        <input key={props.id} type="checkbox" onInput={props.checkFunction} id={props.id}
               name={props.id} value={props.id} defaultChecked={props.completed}/>;

    return (
        <div className={"checklist"}>
            {inputTag}
            <label htmlFor={props.id}>{props.title}</label>
            <button><i className="fas fa-pencil-alt"/></button>
        </div>
    );
}