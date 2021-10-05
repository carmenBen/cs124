export function ModifyTaskPage(props) {
    return (
        <form onSubmit={(e) => props.handleChangeField(e, props.id, "title", document.getElementById("changeTask").value)}>
            <label id="modifyTask" htmlFor="changeTask">Modify Task:</label>
            <input type="text" id="changeTask" name="changeTask" defaultValue={props.taskName} />
            <input type="submit" value="Modify" />
        </form>
    );
}