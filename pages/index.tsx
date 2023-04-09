/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'; 
import { Box, Button, Typography, Divider } from '@mui/material'; 
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase'; 
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';


const Main = styled('main', {})<{}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: '#F9F9F9',
  backgroundImage: 'url("assets/backimg/backimg2.png"), url("assets/backimg/backimg1.png")',
  backgroundPosition:'right bottom, left center',
  backgroundRepeat:'no-repeat, no-repeat',
  minHeight: '90vh'
}));  

interface Props {}  
 
const Home: React.FC<Props> = ({}) => {   
    const apiHost = 'https://blockforest-bakc.onrender.com/';
    const router = useRouter()
    const [load, setLoad] = useState(false);
    const [address, setAddress] = useState('');
    const [pnum, setPnum] = useState(0);
    const [bnum, setBnum] = useState(0);
    const [cnum, setCnum] = useState(0);
    const [tnum, setTnum] = useState(0);
    const [cb, setCb] = useState(0);


    useEffect(()=>{       
        
          setLoad(true); 
          axios.patch(apiHost+'planter','')
            .then((res) => {     
               setLoad(false);     
               setPnum(res['data']['p']);
               setBnum(res['data']['t']);
               setTnum(res['data']['b']);
               setCnum(((res['data']['t']-1)*5+res['data']['l']['contribute'].length));
               setCb((res['data']['l']['contribute'].length/100)*100) 
            })
            .catch((e)=>{ 
            }) 
         
      },[])

    const searchNodeHistory = () => {  
        router.push('/planter/' + address);  
    }
 
 
    return (
        <>
            <Main> 
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={12} style={{marginTop:'15vh', textAlign:'center'}}> 
                        <Typography className='big-slogan' sx={{ fontSize: { xs: '24px', sm: '32px', md: '40px' }, color:'#333333', fontWeight:'bold', marginBottom:'0px' }}>Together make a greener <span style={{color:'#33903D'}}>TRON</span></Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} style={{textAlign:'center', paddingTop: '0px !important'}}> 
                        <Typography><span style={{color:'#888888', }}>A carbon credit explorer and marketplace for TRON network</span></Typography>
                    </Grid> 
                    <Grid item md={12} style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
                        <Grid container spacing={2}  maxWidth="md">
                        <Grid item md={12}>
                            <Paper
                            component="form"
                            sx={{  display: 'flex', alignItems: 'center', width: "100%", height:'43px', border:'solid 1px #EAEAEA', background:'#FFF', boxShadow:'none' }}
                            > 
                            <InputBase
                                sx={{ ml: 1, flex: 1, }}
                                style={{ backgroundColor:'white'}}
                                placeholder="Search for TronLink Account Address "
                                inputProps={{ 'aria-label': 'Search for TronLink Account Address ' }}
                                onChange={(e)=>setAddress(e.target.value)}
                            /> 
                            <Button onClick={()=>searchNodeHistory()} style={{minWidth:'120px', height:'43px', backgroundColor:'#333333', color:'white', textTransform:'none', borderRadius:'0', borderBottomRightRadius:'5px', borderTopRightRadius:'5px'}}>Search</Button>              
                            </Paper>
                        </Grid>
                        {load?
                            <Grid item md={12}>
                                <LinearProgress/>
                            </Grid>:<></>
                        }                        
                        <Grid item md={6}  xs={12}>
                            <Box style={{boxShadow: '0px 0px 19px rgba(0, 0, 0, 0.05)', padding: '20px', borderRadius:'5px', background:'white'}}>
                            <Box style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <Box style={{display:'flex', alignItems:'center'}}>
                                <img src='/assets/icons/planter.png' style={{width:'20px', marginRight:'10px'}} alt=""/>
                                <span style={{color: '#333333', fontWeight:'900', fontSize:'18px'}}>Planters</span>
                                </Box>
                                <a href='/planters' style={{fontSize:'12px', color:'#007BFF', cursor:'pointer'}}>View all</a>
                            </Box>
                            <Divider style={{marginTop:'10px', marginBottom:'10px'}}/>
                            <Box style={{marginTop:'20px'}}>
                                <span style={{color:'#888888', fontSize:'14px', margin:'0'}}>Active Planters</span>
                                <p style={{color:'#333333', fontSize:'22px', fontWeight:'700'}}>{pnum}</p>
                            </Box>
                            <Box style={{marginTop:'20px'}}>
                                <span style={{color:'#888888', fontSize:'14px', margin:'0'}}>Total Carbon Credit Contributed</span>
                                <p style={{color:'#333333', fontSize:'22px', fontWeight:'700'}}>{cnum}</p>
                            </Box>
                            </Box>
                        </Grid>
                        <Grid item md={6}  xs={12}>
                            <Box style={{boxShadow: '0px 0px 19px rgba(0, 0, 0, 0.05)', padding: '20px', borderRadius:'5px', background:'white'}}>
                            <Box style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <Box style={{display:'flex', alignItems:'center'}}>
                                <img src='/assets/icons/tree.png' style={{width:'20px', marginRight:'10px'}} alt=""/>
                                <span style={{color: '#333333', fontWeight:'900', fontSize:'18px'}}>Tree Blocks</span>
                                </Box>
                                <a href='/trees' style={{fontSize:'12px', color:'#007BFF', cursor:'pointer'}}>View all</a>
                            </Box>
                            <Divider style={{marginTop:'10px', marginBottom:'10px'}}/>
                            <Box style={{marginTop:'20px'}}>
                                <span style={{color:'#888888', fontSize:'14px', margin:'0'}}>Current Tree Block Contribution</span>
                                <p style={{color:'#333333', fontSize:'22px', fontWeight:'700'}}>{cb}%</p>
                            </Box>
                            <Box style={{marginTop:'20px'}}>
                                <span style={{color:'#888888', fontSize:'14px', margin:'0'}}>Total BLocks Activated</span>
                                <p style={{color:'#333333', fontSize:'22px', fontWeight:'700'}}>{bnum}</p>
                            </Box>
                            </Box>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Box style={{boxShadow: '0px 0px 19px rgba(0, 0, 0, 0.05)', padding: '20px', borderRadius:'5px', background:'white'}}>
                            <Box style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <Box style={{display:'flex', alignItems:'center'}}>
                                <img src='/assets/icons/exchange.png' style={{width:'20px', marginRight:'10px'}} alt=""/>
                                <span style={{color: '#333333', fontWeight:'900', fontSize:'18px'}}>Carbon Credits Status</span>
                                </Box>
                                <a href='#' style={{fontSize:'12px', color:'#007BFF', cursor:'pointer'}}>View all</a>
                            </Box>
                            <Divider style={{marginTop:'10px', marginBottom:'10px'}}/>
                            <Box style={{ justifyContent:'start'}} sx={{ display: { xs: 'block', md: 'flex' } }} >
                                <Box style={{marginTop:'20px', marginRight:'60px'}}>
                                    <span style={{color:'#888888', fontSize:'14px', margin:'0'}}>Carbon Credit Price</span>
                                    <p style={{color:'#333333', fontSize:'22px', fontWeight:'700'}}>0.30 TRX / CC</p>
                                </Box>
                                <Box style={{marginTop:'20px', marginRight:'60px'}}>
                                    <span style={{color:'#888888', fontSize:'14px', margin:'0'}}>24Hr Total Purchased</span>
                                    <p style={{color:'#333333', fontSize:'22px', fontWeight:'700'}}>{tnum} CC</p>
                                </Box>
                                <Box style={{marginTop:'20px', marginRight:'60px'}}>
                                    <span style={{color:'#888888', fontSize:'14px', margin:'0'}}>Tree Block Price</span>
                                    <p style={{color:'#333333', fontSize:'22px', fontWeight:'700'}}>30 TRX</p>
                                </Box>
                            </Box>              
                            </Box>
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>       
            </Main>
        </>    
    );
}

export default Home
