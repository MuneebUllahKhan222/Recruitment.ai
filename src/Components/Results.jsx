import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Chart from "react-apexcharts";

function Results() {

    const options = {
        chart: {
            type: 'donut'
        },
        series: [69],
        chartOptions: {
            labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
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

            <Box mt={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography mr={2} variant='h3' sx={{ fontSize: '60px', fontWeight: 650, fontFamily: 'Kanit, sans-serif' }}>Here are the</Typography>
                <Typography variant='h3' sx={{ fontSize: '60px', fontWeight: 650, fontFamily: 'Kanit, sans-serif', color: 'rgb(174,255,107)' }}> Results</Typography>
            </Box>

            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Chart
                    width={400}
                    height={400}
                    type='donut'
                    series={[50, 50]}
                    options={{
                        labels: ['Result'],
                        title: {
                            text: "Your Interview Result"
                        },
                        plotOptions: {
                            pie: {
                                donut: {
                                    labels:{show:true}
                                }
                            }
                        }
                    }}

                />
            </Box>
        </>
    )
}

export default Results