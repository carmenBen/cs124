import './App.css';
import {Checklist} from './Checklist.js'
import React, {useState} from "react";
import {ListSelector} from "./ListSelector";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "firebase/compat";
import {useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';


function App(props) {
    const [user, loading, error] = useAuthState(props.auth);
    const [signUp, setSignUp] = useState(false);

    return <div className="App">
        {loading && <h1>Loading now</h1>}
        {user && <div>
            <SignedInApp initialData={props.initialData} collection={props.collection} auth={props.auth} user={user}/>
        </div>}
        {!user && <div>
            {signUp ? <div>
                    <SignUp auth={props.auth}/><br/><br/>
                    <div className="miscText">Returning user?</div>
                    <button onClick={() => setSignUp(!signUp)}>Sign in</button>
            </div> :
                <div>
                    <SignIn auth={props.auth}/><br/><br/>
                    <div className="miscText">New user?</div>
                    <button onClick={() => setSignUp(!signUp)}>Sign up</button>
                </div>}
        </div>}
    </div>
}

function SignUp(props) {
    const [createUserWithEmailAndPassword, userCredential, loading, error] = useCreateUserWithEmailAndPassword(props.auth);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    console.log(error);

    return <div>{!loading && <div>
        <h1>Sign up</h1>
        <label htmlFor="email" className="miscText">Email:</label>
        <input type="text" id="email" name="email" onInput={e => setEmail(e.target.value)}/>
        <label htmlFor="password" className="miscText">Password:</label>
        <input type="password" id="password" name="password" onInput={e => setPassword(e.target.value)}/>
        <button onClick={() => createUserWithEmailAndPassword(email, password)}>Sign Up</button>
        {error && <div className="error miscText">{error.message}</div>}
    </div>
    }
    </div>
}

function SignIn(props) {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const [signInWithEmailAndPassword, userCredential, loading, error] = useSignInWithEmailAndPassword(props.auth);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    console.log(error);

    return <div>
        <h1>Sign in</h1>
        <label htmlFor="signInEmail" className="miscText">Email:</label>
        <input type="text" id="signInEmail" name="email" onInput={e => setEmail(e.target.value)}/>
        <label htmlFor="signInPassword" className="miscText">Password:</label>
        <input type="password" id="signInPassword" name="password"
               onInput={e => setPassword(e.target.value)}/>
        <button onClick={() => signInWithEmailAndPassword(email, password)}>Sign in</button>
        <button onClick={() => props.auth.signInWithPopup(googleProvider)}>Sign in with Google</button>
        {!loading && error && <div className="error miscText">{error.message}</div>}
    </div>
}


export function SignedInApp(props) {

    const [sortValue, setSortValue] = useState("title");
    const [currentList, setCurrentList] = useState(null);
    const [currentPage, setCurrentPage] = useState("checklist");
    const [verifyingEmail, setVerifyingEmail] = useState(false);

    function verifyEmail() {
        console.log("trying verifying email");
        props.user.sendEmailVerification();
        setVerifyingEmail(true);
    }

    function changeCurrentPage(newPage) {
        setCurrentPage(newPage);
    }

    function changeCurrentList(id) {
        setCurrentList(id);
    }

    return (
        <div>
            {/*<h1>*/}
                <ListSelector currentList={currentList} changeCurrentList={changeCurrentList}
                              collection={props.collection} changeCurrentPage={changeCurrentPage}
                              currentPage={currentPage} user={props.user}
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
            {/*</h1>*/}

            {currentList !== null &&
            <div>
                <Checklist currentList={currentList}
                           sortValue={sortValue}
                           changeCurrentPage={changeCurrentPage}
                           collection={props.collection}
                           currentPage={currentPage}
                />

            </div>}
            <div className="miscText">Signed in as {props.user.email}.</div>
            <button onClick={() => props.auth.signOut()}>Sign Out</button>
            {currentList === null && currentPage === "checklist" && props.user && !props.user.emailVerified && <div>
                <button onClick={verifyEmail}>Validate Email</button>
                {verifyingEmail && "Check your inbox for an email requesting validation."}
            </div>}
        </div>
    );
}

export default App;
