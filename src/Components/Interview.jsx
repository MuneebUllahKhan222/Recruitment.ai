import { Box, Divider, IconButton, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import Volume from '../assets/Asset 6.png'
import CachedIcon from '@mui/icons-material/Cached';
import { useNavigate } from 'react-router-dom';
import { useSpeechSynthesis } from "react-speech-kit"
import { useEffect } from 'react';
function Interview() {

    const [questionNo, setQuestionNo] = useState(0)
    const navigate = useNavigate();
    const { speak } = useSpeechSynthesis();
    const [questions, setQuestions] = useState(null)
    const [answer, setAnswer] = useState('')
    const [score, setScore] = useState([])

    const steps = [
        'Question 1',
        'Question 2',
        'Question 3',
        'Question 4',
        'Question 5',
      ];
      console.log(score, 'score')



    const submit = () => {
      const dataRecieved = {
        // quest_ID:`question${questionNo}`,
        quest_ID: `question${questionNo+1}`,
        ans:answer
      }
      const  data = JSON.stringify(dataRecieved)
      console.log(data)
        if (questionNo !== 4){
          const submitAnswer = axios.post('http://127.0.0.1:8000/answer', dataRecieved).then(res => {
            // console.log(res?.data[0])
            setScore([...score, res?.data[0].toFixed(2)])
          })
          
            questionSpeech(questions[`question${questionNo +2}`])
            setQuestionNo(prev => prev +1 )
            setAnswer('')

        } else {
          const submitAnswer = axios.post('http://127.0.0.1:8000/answer', dataRecieved).then(res => {
            // console.log(res?.data[0])
            setScore([...score, res?.data[0].toFixed(2)])
          })
            setQuestionNo(0)
            setAnswer('')
            navigate('/result', {state:{score}})
        }

    }

    // const getQuestions =axios.get("http://127.0.0.1:8000/question").then(res => {
    //   // setQuestions(res?.data)
    // })
    
    const questionSpeech = (question) => {
      console.log(question)
      // setTimeout(() => {
        speak({text : question})
      // },100)
      
    }


    useEffect(() => {

      const getQuestions =  axios.get("http://127.0.0.1:8000/question").then(res => {
        console.log(res?.data.question1)
        questionSpeech(res?.data.question1)
      setQuestions(res?.data) 
    },[])
    
    }, [])
    console.log(questions)
    // useEffect(() => {
    //   questionSpeech(questions['question1'])
    // },[questions])



    
    
  return (
    <>
    <Box pl={6} pr={6} pt={6} sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Typography sx={{fontSize:'23px', fontWeight:650}}>Recruitment</Typography>
        <Typography sx={{fontSize:'23px', fontWeight:650,color:'rgb(174,255,107)' }}>.ai</Typography>
        </Box>
    </Box>
    {/* <Divider light sx={{}}/> */}
    <Box mt={3} sx={{ height:'3px',display:'flex', justifyContent:'center', alignItems:'center' ,backgroundImage: 'linear-gradient(60deg, #AEFF6B, #77FFE4)'}}>
        <img height={50} widht={50} src={Volume} />
    </Box>
    <Box mt={4} sx={{height:'75vh', display:'flex', flexDirection:'column' ,justifyContent:'space-around', alignItems:'center'}}>
        {/* <Box className='questions' sx={{backgroundColor:'white', height:'50%', width:"50%", borderRadius:'40px', border:'2px solid rgb(174,255,107)',display:'flex', justifyContent:'center', alignItems:'center'}}> */}
        {/* <Box  sx={{backgroundColor:'white', height:'50%', width:"50%", borderRadius:'40px', border:'2px solid rgb(174,255,107)'}}> */}
        <TextField
          id="standard-multiline-static"
          label="Kindly write your answer here."
          multiline
          rows={12}
          fullWidth
          color='success'
          inputProps={{borderRadius:'40px'}}
          sx={{backgroundColor:'white', width:'50%'}}
          onChange = {(e) => setAnswer(e.target.value)}
          value={answer}
        />
        {/* </Box > */}
        <Box onClick={submit} mt={3} className='start-interview' sx={{borderRadius:'15px', border:'1px solid white', width:'100px', height:'35px',display:'flex', justifyContent:'center', alignItems:'center'}}>
          Submit
        </Box>
        {/* </Box> */}
        <Stepper activeStep={questionNo} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}
          sx={{
          '& .MuiStepLabel-root .Mui-completed': {
            color: 'rgb(174,255,107)', // circle color (COMPLETED)
          },
          '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
            {
              color: 'grey.500', // Just text label (COMPLETED)
            },
          '& .MuiStepLabel-root .Mui-active': {
            color: '#77FFE4', // circle color (ACTIVE)
          },
          '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
            {
              color: '#77FFE4', // Just text label (ACTIVE)
            },
          '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
            fill: 'black', // circle's number (ACTIVE)
          },
        }}
        >
            <StepLabel >{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    <IconButton onClick={() => questionSpeech(questions[`question${questionNo +1}`])} sx={{backgroundImage:'linear-gradient(60deg, #AEFF6B, #77FFE4)', position:'sticky', left:'71%', bottom:'42%', right:'26%', top:'53%'}}>
        <CachedIcon />
    </IconButton>



    </>
  )
}

export default Interview