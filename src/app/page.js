'use client'
import { useState } from 'react'
import { ShowTodo, ShowDone } from './components/show.js'

export default function Main(){
    const [input, setInput] = useState([]);

    function handleAddTodo(e){
        e.preventDefault();
        setInput(
            [
                ...input,
                {
                    id: input.length,
                    todo: e.target[0].value,
                    done: false
                }
            ]
        );
        console.log(input)
    }

    return (
        <div>
            <form onSubmit={handleAddTodo} className='flex justify-evenly align-center'>
                <div className='w-full p-4'>
                    <input className="border-2 border-black rounded w-full h-full p-4" type="text" placeholder='Input your todo here'/>
                </div>
                <div className='w-full flex align-center'>
                    <button className='w-full border-2 border-black rounded m-4'>Add</button>
                </div>
            </form>
            <ShowTodo data={input} setData={setInput}/>
            <ShowDone data={input}/>
        </div>
    );
    
}