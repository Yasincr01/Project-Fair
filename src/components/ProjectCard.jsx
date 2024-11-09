import React,{useState} from 'react'
import { Card,Modal } from 'react-bootstrap'
import SERVER_URL from '../services/serverUrl';


const ProjectCard = ({displayData}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card show={show} className='btn bg-secondary-emphasis shadow p-2 border-dark' onClick={handleShow} style={{ width: '19rem' }}>
        <Card.Img height={'200px'} variant="top" src={`${SERVER_URL}/uploads/${displayData?.projectImg}`} />
        <Card.Body>
          <Card.Title className='text-center '>{displayData.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal size='lg'  show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Project Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div  className='row '>
          <div className='col-lg-6'>
            <img className='img-fluid' src={`${SERVER_URL}/uploads/${displayData?.projectImg}`} alt="" />
          </div>
          <div className='col-lg-6'>
            <h3 className='fw-bolder text-warning'>{displayData.title}</h3>
            <h6 className='fw-bolder mb-1'>Languages Used : <span className='text-success'>{displayData.language}</span></h6>
            <p style={{textAlign:'justify'}}><span className='fw-bolder'>Project Overview : </span> {displayData.overview} </p>
          </div>
        </div>
        <div className="mt-2 float-start">
          <a className='btn btn-secondary me-2' target='_blank' href={displayData?.github}><i className='fa-brands fa-github'></i></a>
          <a className='btn btn-secondary ' target='_blank' href={displayData?.website}><i className='fa-solid fa-link'></i></a>
        </div>
      </Modal.Body>
      
    </Modal>
    </>
  )
}

export default ProjectCard