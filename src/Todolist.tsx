import React, {ChangeEvent} from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    <IconButton onClick={removeTodolist}><Delete/></IconButton>
    </h3>
    <AddItemForm addItem={addTask} />
    <div>
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
                    <Checkbox color="primary" onChange={onChangeHandler}  checked={t.isDone}/>
                    <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                    <IconButton onClick={onClickHandler} ><Delete/></IconButton>
                </li>
            } )
        }
    </div>
    <div>
        <Button  variant={props.filter === "all" ? "outlined":"text"}
                 onClick={onAllClickHandler} color="default"
        >All</Button>
        <Button variant={props.filter === "active" ? "outlined":"text"}
                onClick={onActiveClickHandler} color="default"
        >Active</Button>
        <Button variant={props.filter === "completed" ? "outlined":"text"}
                onClick={onCompletedClickHandler} color="default"
        >Completed</Button>
    </div>
</div>}

export default Todolist



