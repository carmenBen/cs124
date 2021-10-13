export function ModifyTaskPage(props) {
    return (
        <div>
            <label id="modifyTask" htmlFor="changeTask">Modify Task:</label>
            <input type="text" id="changeTask" name="changeTask" defaultValue={props.taskName}/>
            <input type="button" value="Modify"
                   onClick={() => props.handleChangeField(props.id, "title", document.getElementById("changeTask").value)}/>
        </div>
    );
}