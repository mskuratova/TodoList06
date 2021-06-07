import React, {ChangeEvent, useState} from "react";
import {FilterType} from "./App";
type PropsType ={
    title:string
    tasks:TasksType[]
    removeTasks:(taskId:string) => void
    changeFilter: (value: FilterType) => void
    addTask:(title:string)=>void
}
type TasksType = {
    id: string,
    title:string,
    isDone: boolean
}
function Todolist (props:PropsType){
    let [title, setTitle] = useState("")
    const addTask =()=> {
        props.addTask(title);
        setTitle("")
    };
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}
    const onAllClickHandler =() => props.changeFilter("all")
    const onActiveClickHandler =() => props.changeFilter("active")
    const onCompletedClickHandler =() => props.changeFilter("completed")

return <div>
    <h3>{props.title}</h3>
    <div>
        <input value={title} onChange={onChangeHandler}
        onKeyPress={(e) => {if (e.charCode ===13) {addTask()}}}/>
        <button onClick={addTask}>+</button>
    </div>
    <ul>
        {
            props.tasks.map(t=> {
                const onClickHandler =() => props.removeTasks(t.id)
                return <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                    <button onClick={onClickHandler} >x</button>
                </li>
            } )
        }
    </ul>
    <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
    </div>
</div>}

export default Todolist