'use client'

import { useState } from "react"

export function ShowDone({data}) {
    return (
        <div className="m-6">
            <h2 className="text-xl">List of completed todo</h2>
            <ul>
                {
                    data.length > 0 ? 
                    (
                        data.filter((e) => e.done === true).map((e) => (
                            <li key={e.id} className="border-2 border-black rounded p-4 mb-2">
                            <div>{e.todo}</div>
                            </li>
                        ))
                    )
                    :
                    <div>You have not done any todo yet.</div>
                }
            </ul>
        </div>
    );
}

export function ShowTodo({data, setData}){
    const [originalValue, setOriginal] = useState('')

    function handleEdit(id, todo){
        setOriginal(todo)
        setData(data.map((e) => {
          if(e.id === id){
            return {
              ...e,
              edit: true,
            }
          } else {
            return e
          }
        }))
    }

    function handleCancel(id){
      setData(data.map((e) => {
        if(e.id === id){
          return {
            ...e,
            edit: false,
          }
        } else {
          return e;
        }
      }))
    }

    function saveChanges(choosenId){
        setData(data.map(item => {
            if(item.id === choosenId){
                return {
                    ...item,
                    todo: originalValue,
                    edit: false,
                }
            } else {
              return item
            }
        }))
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
            } else {
                return item
            }
        }))
    }

return (
  <div className="m-6">
    <h2 className="text-xl">Your Todo List</h2>
    <ul>
      {data.filter((e) => e?.done !== true).length > 0 ? (
        data
          .filter((e) => e?.done !== true)
          .map((item) => (
            <li key={item.id} className='w-full border-2 border-black p-4 mb-2 rounded'>
              {item.edit ? (
                <form onSubmit={(e) => e.preventDefault()}>
                  <input type='text' value={originalValue} onChange={(e) => setOriginal(e.target.value)}/> 
                  <button onClick={() => saveChanges(item.id)}>Save</button>
                  <button onClick={() => handleCancel(item.id)}>Cancel</button>
                </form>
              ) : (
                <div className='flex justify-between align-center'>
                  <div className='p-4'>{item?.id + 1}. {item?.todo}</div>
                  <div className='flex justify-evenly align-center'>
                    <button className="p-4" onClick={() => handleEdit(item.id, item.todo)}>Edit</button> 
                    <button className="p-4" onClick={() => deleteTodo(item.id)}>Delete</button>
                    <button className="p-4" onClick={() => markAsDone(item.id)}>Done</button>
                  </div>
                </div>
              )}
            </li>
          ))
      ) : (
        <li className='w-full border-2 border-black p-4 mb-2 rounded'>
          You have not created any todo yet.
        </li>
      )}
    </ul>
  </div>
);                
      
}

