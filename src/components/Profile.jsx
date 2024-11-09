import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import SERVER_URL from '../services/serverUrl'
import profileImg from '../assets/profileImg.png'
import { updateUserAPI } from '../services/allAPI'


const Profile = () => {
  const [preview,setPreview] = useState("")
  const [existingProfileImg,setExistingProfileImg] = useState("")
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profilePic:""
  })

  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin
      })
      setExistingProfileImg(user.profilePic)
    }
  },[open])

  useEffect(()=>{
    if(userDetails.profilePic){
      setPreview(URL.createObjectURL(userDetails.profilePic))
    }
    else{
      setPreview("")
    }
  },[userDetails.profilePic])

  const handleUpdateProfile = async ()=>{
    const {username,email,password,github,linkedin,profilePic} = userDetails
    if(linkedin && github){
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview ? reqBody.append("profilePic",profilePic) : reqBody.append("profilePic",existingProfileImg)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        try{
          const result = await updateUserAPI(reqBody,reqHeader)
          if(result.status==200){
            alert("User profile updated successfully!!")
            sessionStorage.setItem("user",JSON.stringify(result.data))
            setOpen(!open)
          }
        }
        catch(err){
          console.log(err);
        }
      }
    }
    else{
      alert("Please fill the form completely")
    }
  }

  return (
    <>
    <div className='d-flex align-items-center flex-column shadow-lg w-100 '>
      <div className="d-flex justify-content-evenly  w-100" >
        <h3 className="text-success pt-2 ">Profile</h3>
        <button onClick={()=>setOpen(!open)} className="btn"><i className="fa-solid fa-chevron-down"></i></button>
      </div>
      <Collapse  in={open}>
          <div className='row container-fluid align-items-center justify-content-center bg-primary shadow p-2 rounded  ' id="example-collapse-text">
           <label className='text-center'>
            <input onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} type="file" style={{display:'none'}} />
            {
              existingProfileImg==""?
              <img width={'200px'} height={'180px'}  className='rounded-circle mb-3' src={preview?preview:profileImg} alt="" />
              :
              <img width={'200px'} height={'180px'} className='rounded-circle mb-3' src={preview?preview:`${SERVER_URL}/uploads/${existingProfileImg}`} alt="" />
            }
           </label>
           <div className="mb-3 w-100">
            <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} placeholder='User Github Link' type="text" className='form-control' />
           </div>
           <div className="mb-2 w-100">
            <input value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} placeholder='User Linked-In Profile Link' type="text" className='form-control' />
           </div>
           <div className="mb-3 w-100">
            <button onClick={handleUpdateProfile} className='btn btn-success text-dark mt-2 w-100' >Update Profile</button>
           </div>
          </div>
        </Collapse>
    </div>

    </>
  )
}

export default Profile