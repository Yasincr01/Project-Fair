import React, { useContext, useState } from 'react'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import { tokenAuthContext } from '../contexts/AuthContextAPI'
// import authImage from '../assets/login.png'



const Auth = ({ insideRegister }) => {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const navigate = useNavigate()
  const [inputData,setInputData] = useState({
    username:"",email:"",password:""
  })
  const [isLogined,setIsLogined] = useState(false)

  console.log(inputData);
  
  const handleRegister= async (e)=>{
    e.preventDefault()
    console.log("Inside handleRegister");
    if(inputData.username && inputData.email && inputData.password){
      try{
        const result = await registerAPI(inputData)
        console.log(result);
        if(result.status==200){
          alert(`welcome ${result.data?.username}, Please login to explore our website!!!`)
          navigate('/login')
          setInputData({username:"",email:"",password:""})
        }
        else{
          if(result.response.status==406){
            alert(result.response.data)
            setInputData({username:"",email:"",password:""})
          }
        }
      }
      catch(err){
        console.log(err);
      }
    }
    else{
      alert("Please fill the form completely!!!")
    }
  }

  const handleLogin = async (e)=>{
    e.preventDefault()
    if(inputData.email && inputData.password){
      try{
        const result = await loginAPI(inputData)
        if(result.status==200){
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorised(true)
          setIsLogined(true)
          setTimeout(()=>{
            setInputData({username:"",email:"",password:""})
            navigate('/')
            setIsLogined(false)
          },2000)
        }
        else{
          if(result.response.status==404){
            alert(result.response.data)
          }
        }
      }
      catch(err){
        console.log(err);
      }
    }
    else{
      alert("Please fill the form completely!!!")
    }
  }
  return (
    <div style={{ minHeight: '100vh', width: '100%' }} className='d-flex justify-content-center align-items-center '>
      <div className="container w-75  bg-dark">
        <div className="shadow card p-2 rounded-5 ">
          <div className='row align-items-center'>
            <div className="col-lg-6">
              <img className='img-fluid rounded-5' src="https://static.vecteezy.com/system/resources/previews/011/153/360/original/3d-web-developer-working-on-project-illustration-png.png" alt="" />
            </div>
            <div className="col-lg-6 ">
              <h1 className="mt-1 text-center mb-3"><i className='fa-brands fa-docker me-2'></i>Project Fair</h1>
              <h5 className="mt-1 text-success-emphasis"> Sign {insideRegister ? "Up" : "In"} to Your Account </h5>
              <Form>
                {
                  insideRegister &&
                  <FloatingLabel controlId="floatingInputName" label="Username">
                  <Form.Control value={inputData.username} onChange={e=>setInputData({...inputData,username:e.target.value})} type="text" placeholder="Username" className='mb-3 mt-4' />
                </FloatingLabel>
                }
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control value={inputData.email}   onChange={e=>setInputData({...inputData,email:e.target.value})}  type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control value={inputData.password}   onChange={e=>setInputData({...inputData,password:e.target.value})} type="password" placeholder="Password" />
                </FloatingLabel>
                {
                  insideRegister ?
                  <div className='mt-3'>
                    <button onClick={handleRegister} className='btn btn-success text-black mb-2'>Register</button>
                    <p>Already a User? Please Click Here To <Link to={'/login'}>Login</Link></p>
                  </div>
                  :
                  <div className='mt-3'>
                    <button onClick={handleLogin} className='btn btn-success text-black mb-2'>Login
                    { isLogined && <Spinner className='ms-1' animation='border' variant='success'
/>  }                  </button>
                    <p>Already a User? Please Click Here To <Link to={'/register'}>Register</Link></p>
                  </div>
                }
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth