import React, {ChangeEvent} from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType ={
    id: string
    title:string
    tasks:TasksType[]
    removeTasks:(taskId:string, todolistID: string) => void
    changeFilter: (value: FilterType, todolistID:string) => void
    addTask:(title:string, todolistID: string)=>void
    changeTaskStatus:(id: string, isDone: boolean, todolistID: string) => void
    filter: FilterType
    removeTodolist: (id:string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistID: string) => void
    changeTodolistTitle :(id: string, title: string) => void
}
 export type TasksType = {
    id: string,
    title:string,
    isDone: boolean
}
function Todolist (props:PropsType){
    const addTask =(title:string)=> {
            props.addTask(title,props.id);

        };
    const changeTodolistTitle=(title:string) => props.changeTodolistTitle(props.id, title)
    const onAllClickHandler =() => props.changeFilter("all", props.id)
    const onActiveClickHandler =() => props.changeFilter("active",props.id)
    const onCompletedClickHandler =() => props.changeFilter("completed", props.id)
    const removeTodolist = () => props.removeTodolist(props.id)


return <div>
    <h3><EditableSpan value={props.title} onChange={changeTodolistTitle} />
    <button onClick={removeTodolist}>x</button>
    </h3>
    <AddItemForm addItem={addTask} />
    <ul>
        {
            props.tasks.map(t=> {
                const onClickHandler =() => props.removeTasks(t.id, props.id)
                const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked;
                    props.changeTaskStatus(t.id, newIsDoneValue,props.id)
                }
                const onTitleChangeHandler =(nevValue: string) => {
                    props.changeTaskTitle(t.id,nevValue, props.id)}
                return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                    <input type="checkbox" onChange={onChangeHandler}  checked={t.isDone}/>
                    <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
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



