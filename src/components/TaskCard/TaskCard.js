import './TaskCard.css'

export default function TaskHome({title,discription,id,priority,removeFromTaskBar,setTaskEdit}){
    return (<>
    
       <div className='task-contanier'>
           <h2 className='task-title'>{title}</h2>
           <p className='task-discription'> {discription} </p>
           <span className='task-priority'>  {priority} </span>

           <span className='remove-task' onClick={()=>
           {
            removeFromTaskBar(id)
           }} >
            <i className="fa-solid fa-trash"></i>
            </span>

           <span className='edit-task' onClick={()=>
           {
            setTaskEdit(id)
          }} >
            <i className="fa-solid fa-pen-to-square"></i>
            </span>
       </div>

    </>)

}