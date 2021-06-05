import React from "react";
import {FilterType} from "./App";
type PropsType ={
    title:string
    tasks:TasksType[]
    removeTasks:(taskId:number) => void
    changeFilter: (value: FilterType) => void
}
type TasksType = {
    id: number,
    title:string,
    isDone: boolean
}
function Todolist (props:PropsType){
return <div>
    <h3>{props.title}</h3>
    <div>
        <input/>
        <button>+</button>
    </div>
    <ul>
        {
            props.tasks.map(t=> <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                <button onClick={() =>{props.removeTasks(t.id)}} >x</button>
            </li> )
        }
    </ul>
    <div>
        <button onClick={() => {props.changeFilter("all")}}>All</button>
        <button onClick={() => {props.changeFilter("active")}}>Active</button>
        <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
    </div>
</div>}

export default Todolist