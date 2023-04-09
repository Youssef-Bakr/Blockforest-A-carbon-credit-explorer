/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'; 
import { Box, Button, Typography, Divider } from '@mui/material'; 
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase'; 
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import axios from 'axios';
import { create } from 'domain';

const Main = styled('main', {})<{}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: '#F9F9F9',
  backgroundImage: 'url("/assets/backimg/backimg2.png"), url("/assets/backimg/backimg1.png")',
  backgroundPosition:'right bottom, left center',
  backgroundRepeat:'no-repeat, no-repeat',
  minHeight: '90vh'
}));  

interface Props { }  

interface Contributer {
  name: string,
  updatedAt: string,
  cnt: number
}
 
const TreeDetail: React.FC<Props> = ({}) => {  
  const apiHost = 'https://blockforest-bakc.onrender.com/';
  const router = useRouter()
  const { id } = router.query
  const [load, setLoad] = useState(false);
  const [contributer, setContributer] = useState<any[]>([]);
  const [createAt, setCreateAt] = useState(0);
  const [updateAt, setUpdateAt] = useState(0);
  const [name, setName] = useState("");

  const [moreTree, setMoreTree] = useState(1);

  useEffect(()=>{       
    if(id){
      setLoad(true); 
      axios.get(apiHost+'treeblock/'+id)
        .then((res) => {        
          var c:Contributer[] = []; 
          const ct = res['data']['contribute']
          if(ct != undefined){   
            ct.forEach((e:any)=>{ 
              const a : Contributer = {
                name: e['name'],
                updatedAt: e['updatedAt'],
                cnt:0              
              }
              c.push(a)
            })
            setCreateAt(Number(res['data']['createdAt']));
            setUpdateAt(Number(res['data']['updatedAt']));
            setName(res['data']['name']) 
          }  
          const r:Contributer[]  = c.reverse();
          const contributers: Contributer[] = Object.values(r.reduce((acc: Record<string, Contributer>, obj: Contributer) => {
            if(acc[obj.name]){
              acc[obj.name].cnt = acc[obj.name].cnt + 1
            }
            acc[obj.name] = acc[obj.name] ||  {name:obj.name, updatedAt: obj.updatedAt, cnt: obj.cnt+1 };
            return acc;
          }, {})); 
          setContributer(contributers)
        })
        .catch((e)=>{ 
        }) 
    }
  },[id])


  const getDate = (t:any) => {
    const date = new Date(Number(t)); 
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()]; 
    var dat = date.getDate();
    return  "Last Contribution on " + dat + " " + month + " " + year ;
  }

  const getTime = (t:any) => {
    const date = new Date(t); 
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var dat = date.getDate();
    var st = date.getHours() > 12 ? "pm": "am";
    return  month + " " + dat + ", " + year + ' at ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + st;
  }

  return (
    <Main>
     <Grid container spacing={2} style={{marginBottom:'50px'}}>
            <Grid item md={12} xs={12} style={{display:'flex', justifyContent:'center', marginTop: '15vh'}}>
                <Grid container spacing={2}  maxWidth="md">
                    <Grid item md={12} xs={12}>
                        <p style={{color:'#333333', fontSize:'32px', fontWeight:'700', margin:'0'}}>Tree Block #{name}</p>  
                    </Grid>   
                    <Grid item md={12} xs={12}>
                      <Box style={{ padding: '20px', background:'white', border:'solid 2px #C1C1C1'}}>   
                         
                        <Grid container>
                          <Grid item md={4} xs={12} sx={{ borderRight: { xs: 'none', md: 'solid 1px #C1C1C1' }, paddingLeft:'20px' }}>
                            <span style={{color:'#888888', fontSize:'14px', margin:'0'}}>Planters</span>
                            <p style={{color:'#333333', fontSize:'30px', fontWeight:'900', margin:'15px 0'}}>{contributer.length}</p>
                          </Grid>
                          <Grid item md={4} xs={12} sx={{ borderRight: { xs: 'none', md: 'solid 1px #C1C1C1' },  paddingLeft:'20px' }}>
                            <span style={{color:'#888888', fontSize:'14px', margin:'0'}}>Contributing Status</span>
                            <p style={{color:'#333333', fontSize:'30px', fontWeight:'900', margin:'15px 0'}}>Ongoing <FiberManualRecordIcon style={{color:'orange', fontSize:'16px'}} /></p>
                          </Grid>
                          <Grid item md={4} xs={12} style={{ paddingLeft:'20px'}} >
                            <span style={{color:'#888888', fontSize:'14px', margin:'0'}}>Tree Planting Certificate</span>
                            <p style={{color:'#333333', fontSize:'30px', fontWeight:'900', margin:'15px 0'}}>TBA</p>
                          </Grid>
                        </Grid>
                        <Divider style={{marginTop:'10px', marginBottom:'10px'}}/>
                        <Grid container>
                          <Grid item md={6} xs={12}>
                            <Box style={{marginTop:'10px', padding:'10px' }} sx={{ borderRight: { xs: 'none', md: 'solid 1px #C1C1C1' } }}>
                              <span style={{color:'#888888', fontSize:'14px', margin:'0'}}>Created on</span>
                              <p style={{color:'#333333', fontSize:'22px', fontWeight:'500', margin:'15px 0'}}>{getTime(createAt)}</p>
                            </Box>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Box style={{marginTop:'10px', padding:'10px'}}>
                              <span style={{color:'#888888', fontSize:'14px', margin:'0'}}>Last contributed on</span>
                              <p style={{color:'#333333', fontSize:'22px', fontWeight:'500', margin:'15px 0'}}>{getTime(updateAt)}</p>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>   

                    <Grid item md={12} xs={12} style={{marginTop:'40px'}} >
                        <Box style={{display:'flex', justifyContent:'start', }}>
                          <img src='/assets/icons/planter.png' style={{width:'20px', marginRight:'15px'}} alt="" />
                          <p style={{color:'#333333', fontSize:'16px', fontWeight:'900', margin:'0'}}>Contributed planters</p> 
                        </Box>
                        <Divider style={{marginTop:'10px', marginBottom:'10px'}}/>
                        {
                          contributer.length>0?contributer.map((item, index)=>{
                            if(index < 5 * moreTree)
                            return(
                              <Box key={index} style={{ overflow:'auto', marginTop:'15px'}}>
                                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                    <div style={{display:'flex', alignItems:'center', minWidth:'300px'}}>  
                                            <span style={{color: '#333333', fontWeight:'600'}}>{item['name']}</span> 
                                    </div>
                                    <div style={{textAlign:'right', minWidth:'330px'}}>
                                        <div style={{fontSize:'14px', fontWeight:'600', color:'#007BFF'}}><span>{item.cnt} Contribution{item.cnt!=1&&"s"}</span></div>
                                        <div style={{fontSize:'14px',  }}><span>{getDate(item.updatedAt)}</span></div>
                                    </div> 
                                </div>
                              </Box> 
                            )
                          }):<Box>No Recorded Data</Box>
                        }                          
                        <Grid item md={12} xs={12} style={{marginTop:'20px'}} >
                          <Button style={{width:'100%', border:'solid 1px #C1C1C1', textTransform:'none'}} onClick={()=>setMoreTree(moreTree+1)}>Load More</Button>
                        </Grid>   
                    </Grid>  
                                        
                </Grid>
            </Grid>       
      </Grid>
       
    </Main>
  );
}

export default TreeDetail
