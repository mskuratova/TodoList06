import {FilterType, TodoListType} from "../App"
import {v1} from "uuid";
export type RemoveTodolistAT ={
    type:"REMOVE-TODOLIST",
    id: string
}
export type AddTodolistAT ={
    type:"ADD-TODOLIST"
    title: string
}
export type ChangeTodolistTitleAT ={
    type:"CHANGE-TODOLIST-TITLE",
    title: string
    id:string
}
export type ChangeTodolistFilterAT ={
    type:"CHANGE-TODOLIST-FILTER",
    id: string
    filter: FilterType
}
type ActionType = RemoveTodolistAT |AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todoListsReducer = (state: TodoListType[], action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id != action.id)
        case "ADD-TODOLIST":
            return [...state, {id: v1(), title: action, filter: "all"}]
        case "CHANGE-TODOLIST-TITLE":{
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER" : {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
        }
            return [...state];
        default:
            throw new Error("I don't understand this type")
    }
}
export const removeTodolistAC = (todolistID:string):RemoveTodolistAT => {
    return{type:"REMOVE-TODOLIST", id: todolistID}
}
export const addTodolistAC = (title:string):AddTodolistAT => {
    return{type:"ADD-TODOLIST", title:title}
}
export const changeTodolistTitleAC =(todolistID:string, title:string):ChangeTodolistTitleAT => {
    return {type:"CHANGE-TODOLIST-TITLE", title:title, id:todolistID}
}
export const changeTodolistFilterAC =(todolistID:string, filter: FilterType):ChangeTodolistFilterAT => {
    return {type:"CHANGE-TODOLIST-FILTER", filter:filter, id:todolistID}
}