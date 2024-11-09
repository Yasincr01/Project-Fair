import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import LandingImg from '../assets/project.gif'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { getHomeProjectAPI } from '../services/allAPI'


const Home = () => {
  const [allHomeProjetcs,setAllHomeProjetcs] = useState([])
  const navigate = useNavigate()
   
  useEffect(()=>{
    getAllHomeProjects()
  },[])

  const handleProjects = ()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      alert("Please Login to get full access to our Projects!!!...")
    }
  }

  const getAllHomeProjects = async()=>{
     try{
      const result = await getHomeProjectAPI()
      if(result.status==200){
        setAllHomeProjetcs(result.data)
      }
     }catch(err){
      console.log(err)
     }
  }

  console.log(allHomeProjetcs);
  

  return (
    <>
      <div style={{minHeight:'100vh'}} className="d-flex justify-content-center align-items-center rounded shadow w-100">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <h1 className='fw-bolder mb-2' style={{fontSize:'80px'}}><i className='fa-brands fa-docker me-2'></i>Project Fair</h1>
                    <p style={{textAlign:'justify'}}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam ullam corrupti nam nesciunt molestias, cupiditate delectus repudiandae nostrum modi officia, blanditiis eveniet praesentium iusto magnam, impedit quidem repellendus iste veritatis!</p>
                  { 
                  sessionStorage.getItem("token")?
                    <Link to={'/dashboard'} className='btn btn-warning text-primary fw-bolder' >MANAGE YOUR PROJECTS</Link>
                    :
                    <Link to={'/login'} className='btn btn-warning text-primary fw-bolder' >STARTS TO EXPLORE</Link>
                  }
                </div>
                <div className='col-lg-6'>
                     <img className='img-fluid' src="https://static.vecteezy.com/system/resources/previews/010/872/698/original/3d-web-developer-working-on-project-illustration-png.png" alt="" />
                </div>
            </div>
        </div>
      </div>
      <div className='mt-5 text-center'>
        <h1 className='mb-5'>Explore Our Projects</h1>
        <marquee>
            <div className='d-flex'>
                {
                  allHomeProjetcs?.map((project)=>(
                    <div key={project?._id} className='me-5'>
                    <ProjectCard displayData={project}/>
                </div>
                  ))
                }
            </div>
        </marquee>
        <button onClick={handleProjects} className='btn btn-link mt-5 text-white'>CLICK HERE TO VIEW MORE PROJECTS...</button>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-5 flex-column">
        <h1>Our Testimonials</h1>
        <div className='d-flex justify-content-eevenly align-items-center mt-3'>
    <Card className='me-5' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex align-items-center justify-content-center flex-column mb-2'>
            <img width={'70px'} height={'70px'} className='rounded-circle img-fluid' src="https://png.pngtree.com/png-vector/20190629/ourlarge/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_1527664.jpg" alt="" />
            <span className='mt-2'>Max Miller</span>
        </Card.Title>
        <Card.Text className='mt-3 '>
          <div className='d-flex justify-content-center '>
          <i className='fa-solid fa-star text-warning me-1'></i>
            <i className='fa-solid fa-star text-warning me-1'></i>
            <i className='fa-solid fa-star text-warning me-1'></i>
            <i className='fa-solid fa-star-half-stroke text-warning me-1'></i>
          </div>
          <p className='mt-3' style={{textAlign:'justify'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis numquam ab quos assumenda impedit expedita veniam commodi temporasint!</p>
        </Card.Text>       
      </Card.Body>
    </Card> 
    <Card className='me-5' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex align-items-center justify-content-center flex-column mb-2'>
            <img width={'70px'} height={'70px'} className='rounded-circle img-fluid' src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png" alt="" />
            <span className='mt-2'>Max Miller</span>
        </Card.Title>
        <Card.Text className='mt-3 '>
          <div className='d-flex justify-content-center '>
          <i className='fa-solid fa-star text-warning me-1'></i>
            <i className='fa-solid fa-star text-warning me-1'></i>
            <i className='fa-solid fa-star text-warning me-1'></i>
            <i className='fa-regular fa-star text-warning me-1'></i>
          </div>
          <p className='mt-3' style={{textAlign:'justify'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis numquam ab quos assumenda impedit expedita veniam commodi temporasint!</p>
        </Card.Text>       
      </Card.Body>
    </Card> 
    <Card className='me-5' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex align-items-center justify-content-center flex-column mb-2'>
            <img width={'70px'} height={'70px'} className='rounded-circle img-fluid' src="https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg" alt="" />
            <span className='mt-2'>Max Miller</span>
        </Card.Title>
        <Card.Text className='mt-3 '>
          <div className='d-flex justify-content-center '>
            <i className='fa-solid fa-star text-warning me-1'></i>
            <i className='fa-solid fa-star text-warning me-1'></i>
            <i className='fa-solid fa-star text-warning me-1'></i>
            <i className='fa-solid fa-star text-warning me-1'></i>
          </div>
          <p className='mt-3' style={{textAlign:'justify'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis numquam ab quos assumenda impedit expedita veniam commodi temporasint!</p>
        </Card.Text>       
      </Card.Body>
    </Card>
        </div>
      </div>
    </>
  )
}

export default Home