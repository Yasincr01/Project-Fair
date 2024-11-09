import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { userProjectAPI, userProjectRemoveAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../contexts/ContextApi'

const View = () => {
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const{editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
  const [userProjects,setUserProjects] = useState([])

  useEffect(()=>{
    getUserProjects()
  },[addProjectResponse,editProjectResponse])

  const getUserProjects=async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization":`Bearer ${token}`
      } 
      try{
        const result = await userProjectAPI(reqHeader)
        if(result.status == 200){
          setUserProjects(result.data)
        }
      }
      catch(err){
        console.log(err);
      }
    }
  }
  console.log(userProjects);

  const deleteProject = async (id)=>{
    const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Authorization":`Bearer ${token}`
        }
        try{
          await userProjectRemoveAPI(id,reqHeader)
          getUserProjects()
        }
        catch(err){
          console.log(err);
        }
  }
}

  return (
    <>
    <div className="d-flex justify-content-between">
      <h2 className='text-secondary mt-3'>All Projects</h2>
      <div> <Add/> </div>
    </div>
    <hr />
    <div className='mt-2 allProjects' >
      {
        userProjects?.length>0?
        userProjects.map(project=>(
          <div key={project?._id} className="border rounded p-2 d-flex justify-content-between mb-3">
        <h2 className='text-success fw-bolder '>{project?.title}</h2>
        <div className='d-flex align-items-center'>
          <div className='text-success'> <Edit project={project} /> </div>
          <div className='btn'><a target='_blank' href={project?.github}><i className='fa-brands fa-github'></i></a></div>
          <button onClick={()=>deleteProject(project?._id)} className='btn text-danger'><i className='fa-solid fa-trash'></i></button>
        </div>
      </div>
        ))
        :
        <div className='text-danger fw-bolder'>
        Not Uploaded any Projects yet!!!
      </div>
      }
    </div>
    </>
  )
}

export default View