import './Home.css'
import TaskCard from './../../components/TaskCard/TaskCard'
import { useEffect, useState } from 'react'
import {saveTOLocalStorage} from './../../util/LocalStorage'
import showToast from 'crunchy-toast';


const Home = ()=>
{

    const [tasksList, setTasksList] = useState([]);

    useEffect(() => {
        const getListFromLocalStroage=JSON.parse(localStorage.getItem('task'))
       if(getListFromLocalStroage && getListFromLocalStroage.length>0){
        setTasksList(getListFromLocalStroage)
       }
    }, []) ;

   const [isEdit, setIsEdit]=useState(false)
   const [title, setTitle]=useState('')
   const [discription, setDiscription]=useState('')
   const [priority, setPriority]=useState('')
   const [id, setId]=useState(0)




   const clearInputFields=()=>{
    setDiscription('')
    setPriority('')
    setTitle('')

   }

   const findId=(taskId)=>{
    let index;

    tasksList.forEach((task,i)=>{
        if(task.id===taskId){
            index=i;
        }
    })
        return index
   }

   const checkrequideFields=()=>{
       if(!title)
       {
        showToast('Enter Title', 'alert', 3000);
        return false;
       }
       if(!discription)
       {
        showToast('Enter discription', 'alert', 3000);
        return false;
       }
       if(!priority)
       {
        showToast('Enter priority', 'alert', 3000);
        return false;
       }
       
       return true;
   }

   const addToTaskBar=()=>{

    if(checkrequideFields()===false)
    {
           return;
    }

    const random = Math.ceil( Math.random()*1000 );
    const obj={
        id:random,
        title:title,
        discription:discription,
        priority:priority,
       
       }
   

       const newtask=[...tasksList,obj]
    
      setTasksList(newtask)

      clearInputFields();
     
      saveTOLocalStorage(newtask)
       
      showToast('Target Added Successfully', 'success', 3000);
     
   }

   const setTaskEdit=(id)=>{
    setIsEdit(true)
    setId(id);
       
       const index=findId(id);
       const currentEditTask=tasksList[index]
   
       setTitle(currentEditTask.title)
       setDiscription(currentEditTask.discription)
       setPriority(currentEditTask.priority)
            
   }

   const updateTask=()=>{

   const updatedTaskList=findId(id)

    const UpdateArr=tasksList;

    UpdateArr[updatedTaskList]={
        id:id,
       title:title,
       discription:discription,
       priority:priority
    }

    setTasksList([...UpdateArr])

    saveTOLocalStorage([...UpdateArr]);

    setId(0)
    clearInputFields();

    setIsEdit(false)

    showToast('Target Update Successfully', 'success', 3000);


   }

  const removeFromTaskBar=(id)=>{
    const index= findId(id)

    const tempArr=tasksList;
    tempArr.splice(index,1)
    setTasksList([...tempArr])

    saveTOLocalStorage(tempArr)

    showToast('Target Delete Successfully', 'alert', 3000);
  }


    return(<>
   <div className="header">
    <h1 className='home-title'>Day Planning 🎯</h1>
</div>
        <div className='home-main-container'>
           
            <div className='flex-contanier'>
                   <div className='add-task-list'>
                          <h1 className='text-center heading'>{ 
                                isEdit?`Update Target`:' Add Your Target'
                            }</h1>

                            <div className='add-task'>
                                <form>
                                    <input type="text"
                                         value={title}
                                         onChange={(e)=> setTitle(e.target.value)}
                                         placeholder="Enter Title"
                                         className='task-input'
                                         />
                                    <input type="text"
                                         value={discription}
                                         onChange={(e)=> setDiscription(e.target.value)}
                                         placeholder="Enter Discription"
                                         className='task-input'
                                         />
                                    <input type="text"
                                         value={priority}
                                         onChange = {(e) =>  
                                    setPriority(`${e.target.value}`)  }
                                         placeholder="Enter priority"
                                         className='task-input'
                                         />
                
                                        <div className='btn-contanier'>
                                         
                                           <button 
                                            className='btn-task'
                                            type='button'
                                           onClick={()=>{
                                            isEdit?updateTask():addToTaskBar()
                                           }}
                                            >
                                            {isEdit?'Update':'Add'}
                                              </button>
                                         

                                        </div>
                                </form>
                            </div>

                   </div>
                   <div className='add-task-list'>
                   <h1 className='text-center heading'>
                           Target List
                          </h1>
                    <div className='Card-holder'>
                         
                          {
                             tasksList.map((task,i)=>{
                                const {title,discription,priority,id}=task;
                                return  <TaskCard 
                                title={title} 
                                discription={discription} 
                                priority={priority}
                                 id={id} 
                                 key={i}
                                 removeFromTaskBar={removeFromTaskBar}
                                 setTaskEdit={setTaskEdit}
                                 />
                             })
                          } 
                          </div>
                   </div>
            </div>
        </div>

    </>)
}

export default Home;