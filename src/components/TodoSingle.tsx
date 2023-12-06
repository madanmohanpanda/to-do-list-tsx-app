import React,{useState, useRef, useEffect} from 'react'
import { Todo } from '../model'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import './style.css'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    index: number,
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}


const TodoSingle = ({index , todo, todos, setTodos}: Props) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  const inputRef = useRef<HTMLInputElement>(null);

  // console.log(editTodo);

 useEffect(()=>{
  inputRef.current?.focus();
 },[edit])
  

  const handleDone = (id:number) => {
    setTodos(todos.map(todo=> todo.id === id? {...todo, isDone: !todo.isDone}: todo))
  };

  const handleDelet = (id: number) => {
    setTodos(todos.filter((todo)=> {
      return todo.id !== id;
    }))
  }
  const editHandle = () =>{
    
    if(!edit && !todo.isDone){
      
      setEdit(!edit);;
    }
  };

  const handleEdit = (e:React.FormEvent, id: number) =>{
    e.preventDefault();
    setTodos(todos.map(todo=>todo.id === id? {...todo, todo:editTodo} : todo ))
    setEdit(false)
  }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>

     { (provided, snapshot)=>(

          <form action="" className={`todos_single ${snapshot.isDragging? 'drag':''}`} onSubmit={(e)=> handleEdit(e, todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            {
              edit? (
                <input ref={inputRef} className='todo_single--text' value={editTodo} onChange={(e)=> setEditTodo(e.target.value)}/>
              ): todo.isDone? (
              <s className="todos_single--text">{todo.todo}</s>

            ):(

              <span className="todos_single--text">{todo.todo}</span>
            )

            }
              <div>
                  <span className='icon' onClick={ editHandle}>
                      <AiFillEdit />
                  </span>
                  <span className="icon" onClick={()=> handleDelet(todo.id)}>
                    <AiFillDelete />
                  </span>
                  <span className="icon" onClick={(e)=> {
                    edit?  handleEdit(e, todo.id) :
                    handleDone(todo.id)
                  
                  }
                    } >
                    <MdDone />
                  </span>
              </div>
          </form>
      )
                  }
    </Draggable>
  )
}

export default TodoSingle