import React, { useRef } from 'react'
import './style.css';

interface PropType{
    todo: string,
    setTodo : React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e:React.FormEvent)=> void
}

const InputFeild = ({todo, setTodo, handleAdd}:PropType ) => {
    // console.log(todo);
    const inptRef = useRef<HTMLInputElement>(null);
    
  return (
    <form action="" onSubmit={(e)=>{
        handleAdd(e);
        inptRef.current?.blur();
    }} className='input'>
        <input type="text" value={todo}
        ref={inptRef}
        onChange={(e)=> setTodo(e.target.value)}
         placeholder='Enter a task' className="input_box" />
        <button type='submit' className='input_submit'>Go</button>
    </form>
  )
}

export default InputFeild