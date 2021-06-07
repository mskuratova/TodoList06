import React, {ChangeEvent, useState} from "react";
import {FilterType} from "./App";
type PropsType ={
    title:string
    tasks:TasksType[]
    removeTasks:(taskId:string) => void
    changeFilter: (value: FilterType) => void
    addTask:(title:string)=>void
    changeTaskStatus:(id: string, isDone: boolean) => void
    filter: FilterType
}
type TasksType = {
    id: string,
    title:string,
    isDone: boolean
}
function Todolist (props:PropsType){
    let [title, setTitle] = useState("")
    let [error, setError] =useState<string | null>(null)
    const addTask =()=> {
        if (title.trim() !== "") {
            props.addTask(title);
            setTitle("")
        }
        else {
            setError("Title is required")
        }
    };
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}
    const onAllClickHandler =() => props.changeFilter("all")
    const onActiveClickHandler =() => props.changeFilter("active")
    const onCompletedClickHandler =() => props.changeFilter("completed")

return <div>
    <h3>{props.title}</h3>
    <div>
        <input value={title} onChange={onChangeHandler}
        onKeyPress={(e) => {
            setError(null)
            if (e.charCode ===13) {addTask()}}}/>
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>
    <ul>
        {
            props.tasks.map(t=> {
                const onClickHandler =() => props.removeTasks(t.id)
                const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked;
                    props.changeTaskStatus(t.id, newIsDoneValue)
                }
                return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                    <input type="checkbox" onChange={onChangeHandler}  checked={t.isDone}/> <span>{t.title}</span>
                    <button onClick={onClickHandler} >x</button>
                </li>
            } )
        }
    </ul>
    <div>
        <button  className={props.filter === "all" ? "active-filter":""}
                 onClick={onAllClickHandler}>All</button>
        <button className={props.filter === "active" ? "active-filter":""}
                onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === "completed" ? "active-filter":""}
                onClick={onCompletedClickHandler}>Completed</button>
    </div>
</div>}

export default Todolist