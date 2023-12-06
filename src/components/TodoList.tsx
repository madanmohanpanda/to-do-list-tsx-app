import React from 'react'
import { Todo } from '../model'

import './style.css'

import TodoSingle from './TodoSingle';
import { Droppable } from 'react-beautiful-dnd';


interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[],
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

}

const TodoList = ({todos, setTodos, completedTodos, setCompletedTodos}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId='TodosList'>
        {
          (provided, snapshot)=>(
            <div className={`todos ${snapshot.isDraggingOver?'dragactive':''}`} ref={provided.innerRef} {...provided.droppableProps}  >
        <span className="todos_heading">
          Active Tasks
        </span>
        {
          todos.map((todo, index)=>{
            return <TodoSingle todo={todo} 
            index={index}
            todos={todos}
            key={todo.id}
            setTodos={setTodos}
            />
          })
        }
        {provided.placeholder}
      </div>
          )
        }
      
      </Droppable>
      <Droppable  droppableId='TodosRemove'>
        {
          (provided, snapshot)=>(
            <div className={`todos remove  ${snapshot.isDraggingOver?'dragcomplete':''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
            >
            <span className="todos_heading">
                Completed Tasks
              </span>
              {
                completedTodos.map((comTodo, index)=>{
                  return <TodoSingle todo={comTodo} 
                  index={index}
                  todos={completedTodos}
                  key={comTodo.id}
                  setTodos={setCompletedTodos}
                  />
                })
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
     
     
    </div>
  )
}

export default TodoList