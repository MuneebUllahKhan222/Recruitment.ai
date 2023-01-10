import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Chart from "react-apexcharts";
import { useLocation, useNavigate } from 'react-router-dom';

function Results() {

    const {state} = useLocation()
    console.log(state?.score)
    console.log(Number(state?.score[0]) + Number(state?.score[1]) + Number(state?.score[2])  + Number(state?.score[3]))
    // const seriesForPie = Number(state?.score[0]) + Number(state?.score[1]) + Number(state?.score[2]) + Number(state?.score[3]) + Number(state?.score[4])
    const seriesForPie = Number(state?.score[0]) + Number(state?.score[1]) + Number(state?.score[2]) + Number(state?.score[3])
    console.log(seriesForPie)
    const navigate = useNavigate()

    const donutOptions = {
        chart: {
            type: 'donut',
        },
        series: [seriesForPie, 100-seriesForPie],
        // chartOptions: {
        //     labels: []
        // },
        labels:['Your score'],
        colors: ['#AEFF6B', '#FFFFFF'],
        legend: {
            show:false
        },
        dataLabels: {
            enabled: true,
        },
        plotOptions: {
            pie: {
                expandOnClick: true,
                donut: {
                    size: '57%',
                    background: 'transparent',
                    labels: {
                        show: false,
                        name: {
                        //   show: false,
                          show: true,
                          fontSize: '22px',
                          fontFamily: 'Helvetica, Arial, sans-serif',
                          fontWeight: 600,
                          color: "#AEFF6B",
                        }, 
                        value: {
                            show: true,
                            fontSize: '40px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            color: "#FFFFFF",
                            offsetY: 10,
                          }, 
                }

            }
            
        }
    },
    tooltip: {
        enabled: true,
        fillSeriesColor: false,
        theme: 'dark',
        marker: {
            show: true,
        },
    },
    subtitle: {
        text: 'Total Score',
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '20px',
          fontWeight:  'normal',
          fontFamily:  undefined,
          color:  '#FFFFFF'
        },
    },
    fill: {
        colors: ['#AEFF6B', '#FFFFFF'],
        opacity: 0.9,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: "horizontal",
            shadeIntensity: 0.2,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100],
            colorStops: []
        },
    },
}


const barOptions = {
    chart: {
        type:'bar',
        toolbar: {
            show: true,
        }
    },
    colors: ['#AEFF6B', '#77FFE4'],
    series: [{
        data: [{
          x: 'Question1',
          y: Number(state?.score[0])
        }, {
            x: 'Question2',
            y: Number(state?.score[1])
          },
          {
            x: 'Question3',
            y: Number(state?.score[2])
          },
          {
            x: 'Question4',
            y: Number(state?.score[3])
          },
          {
            x: 'Question5',
            // y: Number(state?.score[3])
            y:8
          },
        ]
        }],
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 5,
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'last',
            columnWidth: '70%',
            barHeight: '100%',  
            distributed:true,
            // dataLabels: {
            //     total: {
            //         enabled:true,
            //         style: {
            //             color: '#AEFF6B',
            //             fontSize: '50px',
            //             fontFamily: undefined,
            //             fontWeight: 600
            //           }
            //     }
            // }
        }
    },
    legend: {
        show: false,
    },
    grid: {
        show: true,
    },
    fill: {
        colors: ['#AEFF6B', '#77FFE4'],
        opacity: 0.9,
        type: 'gradient',
        gradient: {
            shade: 'light',
            type: "vertical",
            shadeIntensity: 0.1,
            inverseColors: true,
            opacityFrom: 0.9,
            opacityTo: 1,
            stops: [0, 50, 100],
            colorStops: []
        },
    },
    yaxis: {
        show: true,
        labels: {
            show: true,
            style: {
                colors: ['#AEFF6B', '#77FFE4'],
                fontSize: '20px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-yaxis-label',
        },
        },
        title: {
            text: 'Score',
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
                color: '#FFFFFF',
                fontSize: '20px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-yaxis-title',
            },
        },
    },
    xaxis: {
        show: true,
        labels: {
            show: true,
            style: {
                colors: ['#AEFF6B', '#77FFE4', '#AEFF6B', '#77FFE4', '#AEFF6B'],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-yaxis-label',
        },
        },
    },
    subtitle: {
        text: 'Score per question',
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '16px',
          fontWeight:  '600',
          fontFamily:  undefined,
          color:  '#FFFFFF'
        },
    },
    tooltip: {
        enabled: true,
        fillSeriesColor: true,
        theme: 'dark',
        marker: {
            show: true,
        },
    }
}
    

    return (
        <>
            <Box pl={6} pr={6} pt={6} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '23px', fontWeight: 650 }}>Recruitment</Typography>
                    <Typography sx={{ fontSize: '23px', fontWeight: 650, color: 'rgb(174,255,107)' }}>.ai</Typography>
                </Box>
            </Box>

            <Box mt={4} sx={{display: 'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography mr={2} variant='h3' sx={{ fontSize: '60px', fontWeight: 650, fontFamily: 'Kanit, sans-serif' }}>Here are the</Typography>
                <Typography variant='h3' sx={{ fontSize: '60px', fontWeight: 650, fontFamily: 'Kanit, sans-serif', color: 'rgb(174,255,107)' }}> Results</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography mr={2} variant='h3' sx={{ fontSize: '60px', fontWeight: 650, fontFamily: 'Kanit, sans-serif'}}>You scored </Typography>
                <Typography variant='h3' sx={{ fontSize: '60px', fontWeight: 650, fontFamily: 'Kanit, sans-serif', color: 'rgb(174,255,107)' }}>{seriesForPie} %</Typography>
                </Box>
            </Box>

            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',}}>
                <Box mt={4} sx={{ width:'70%', display:'flex', justifyContent:'space-around', alignItems:'center',}}>
                <Chart
                    width={350}
                    height={350}
                    type='donut'
                    series={donutOptions.series}
                    options={donutOptions}

                />

                <Chart
                    width={500}
                    height={350}
                    type='bar'
                    series={barOptions.series}
                    options={barOptions}

                />
                </Box>
            </Box>

            <Box mt={5} sx={{display:'flex', justifyContent:'center', alignItems:'center',}}>
                <Box onClick={() => navigate('/interview')} mt={3} className='start-interview' sx={{borderRadius:'15px', border:'1px solid white', width:'200px', height:'35px',display:'flex', justifyContent:'center', alignItems:'center'}}>
                    Retake Interview
                </Box>
            </Box>
            
            <Box mt={5} pb={5} sx={{display:'flex', justifyContent:'center', alignItems:'center',}}>
                <Box onClick={() => navigate('/')} mt={3} className='start-interview' sx={{borderRadius:'15px', border:'1px solid white', width:'200px', height:'35px',display:'flex', justifyContent:'center', alignItems:'center'}}>
                    Go to home screen
                </Box>
            </Box>
        </>
    )
}

export default Results