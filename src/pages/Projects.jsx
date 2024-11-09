import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import { allProjectAPI } from '../services/allAPI'


const Projects = () => {
  const [searchkey,setSearchKey] = useState("")
  const [allProjects,setAllProjects] = useState([])


useEffect(()=>{
  getAllProjects()
},[searchkey])

const getAllProjects = async ()=>{
  const token = sessionStorage.getItem("token")

  if(token){
    const reqHeader = {
      "Authorization":`Bearer ${token}`
    }
    try{
      const result = await allProjectAPI(searchkey,reqHeader)
      if(result.status==200){
        setAllProjects(result.data)
      }
    }catch(err){
      console.log(err)
    }
  }
}
console.log(allProjects);


  return (
    <>
    <Header/>
    <div style={{paddingTop:'150px'}} className='container-fluid'>
      <div className='d-flex justify-content-between'>
        <h1>All Projects</h1>
        <input onChange={e=>setSearchKey(e.target.value)} placeholder='Search Projects by their Language' type="text" className='form-control w-25 me-3' />
      </div>
      <Row className='mt-3'>
      { allProjects?.length>0?
      allProjects?.map(project=>(
        <Col key={project?._id} className='mb-3' sm={12} md={6} lg={4}>
        <ProjectCard displayData={project}/>
        </Col>
      ))
      :
      <div className='text-danger fw-bolder'>
        No Projects Found
      </div>
}
      </Row>
    </div>
    </>
  )
}

export default Projects