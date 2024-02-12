'use client'
import { useState } from 'react'

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
    }

    return (
        <div>
            <form onSubmit={handleAddTodo}>
                <input className="border-2 border-black rounded" type="text"/>
                <button>Add</button>
            </form>
            <ShowTodo data={input} setData={setInput}/>
        </div>
    );
    
}

export function ShowTodo({data, setData}){
    const [edit, setEdit] = useState(false);
    const [originalValue, setOriginal] = useState('')

    function handleEdit(todo){
        setOriginal(todo)
        setEdit(!edit)
    }

    function saveChanges(choosenId){
        setData(data.map(item => {
            if(item.id === choosenId){
                return {
                    ...item,
                    todo: originalValue,
                }
            }
        }))
        setEdit(!edit)
    }

    function deleteTodo(id){
        setData(data.filter((e) => e.id !== id));
    }

    function markAsDone(choosenId){
        setData(data.map(item => {
            if(item.id === choosenId){
                return {
                    ...item,
                    done: true,
                }
            }
        }))
    }

    return (
        <ul className='m-6'>
            {
                data.map((item) => (
                    <li key={item.id} className='w-full border-2 border-black p-4'>
                        {
                            edit ?
                            (
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <input type='text' value={originalValue} onChange={(e) => setOriginal(e.target.value)}/> 
                                    <button onClick={() => saveChanges(item.id)}>Save</button>
                                    <button onClick={handleEdit}>Cancel</button>
                                </form>
                            ) :
                            (
                                <div className='flex justify-between align-center'>
                                    <div>{item.id + 1}. {item.todo}</div>
                                    <div>
                                        <button onClick={() => handleEdit(item.todo)}>Edit</button> 
                                        <button onClick={() => deleteTodo(item.id)}>Delete</button>
                                        <button onClick={() => markAsDone(item.id)}>Done</button>
                                    </div>
                                </div>
                            )
                        }
                    </li>
                ))
            }
        </ul>
    );
}

