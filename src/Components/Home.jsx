import React from 'react';
import Box from '@mui/material/Box';
import Logo from '../assets/Asset 2.png'
import { Typography, Modal } from '@mui/material';
import People from '../assets/Asset 7.png'
import { useNavigate } from 'react-router-dom';
import Aboutus from './Aboutus';
import { useState } from 'react';


function Home() {
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const startInterview = () => {
    navigate('/interview')
  }

  const toggleModal= () => {
    setModal(true)
  }

  const toggleModalOff= () => {
    setModal(false)
  }
  


  

  return (
    <>
      <Box pl={6} pr={6} pt={6} sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          {/* <img src={Logo} height={75}  width={150}/> */}
          <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Typography sx={{fontSize:'23px', fontWeight:650}}>Recruitment</Typography>
            <Typography sx={{fontSize:'23px', fontWeight:650,color:'rgb(174,255,107)' }}>.ai</Typography>
          </Box>
          <Box onClick={toggleModal} className='login-button' sx={{borderRadius:'15px', border:'1px solid white',width:'80px', height:'30px', color:'linear-gradient(red, yellow)',display:'flex', justifyContent:'center', alignItems:'center'}}>
            About us
          </Box>
      </Box>
      <Box sx={{display:'flex', fontWeight:550 ,flexDirection:'column',justifyContent:'flex-end', alignItems:'center', height:'40vh',}}>
        <Typography  variant='h3' sx={{ fontFamily: 'Kanit, sans-serif', fontWeight:550}}>Take Interview to</Typography>
        <Typography mt={2} sx={{color:'rgb(174,255,107)', fontWeight:550,fontFamily: 'Kanit, sans-serif'}} variant='h3'>The Next Level</Typography>
        <Typography mt={1} variant='subtitle2' sx={{fontFamily: 'Kanit, sans-serif',}}>Revolutionizing the way we hire - with AI-powered recruitment</Typography>
        <Box onClick= {startInterview} mt={3} className='start-interview' sx={{borderRadius:'15px', border:'1px solid white', width:'120px', height:'30px',display:'flex', justifyContent:'center', alignItems:'center'}}>
          Start Interview
        </Box>
      </Box>
      <Box sx={{display:'flex', flexDirection:'column',justifyContent:'flex-end', alignItems:'center', height:'47vh'}}>
        <img  src={People} style={{border:'1px solid white', borderRadius:'30px'}} width={650} height={270}/>

      </Box>

      <Aboutus open={modal} handleClose={toggleModalOff}/>

      {/* <Modal
    open={modal}
    // onClose={modal}
    // onClose={handleClose(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
    </Box>
    </Modal> */}
    </>
  )
}

export default Home