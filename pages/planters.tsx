/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'; 
import { Box, Button, Typography, Divider } from '@mui/material'; 
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase'; 
import ForestList from '../src/components/ForestList';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
 

const Main = styled('main', {})<{}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: '#F9F9F9',
  backgroundImage: 'url("assets/backimg/backimg2.png"), url("assets/backimg/backimg1.png")',
  backgroundPosition:'right bottom, left center',
  backgroundRepeat:'no-repeat, no-repeat',
  minHeight: '90vh'
}));  

interface Props { }  
 
const Planters: React.FC<Props> = ({}) => {   
  const apiHost = 'https://blockforest-bakc.onrender.com/'; 
  const scanUrl = 'https://shasta.tronscan.org/#/transaction/';
  const [load, setLoad] = useState(false);
  const [planters, setPlanters] = useState<any[]>([])

  const [morePlanter, setMorePlanter] = useState(1);

  useEffect(()=>{     
      setLoad(true); 
      axios.get(apiHost+'planter')
        .then((res) => {   
          var p:any[] = [];   
          if(res['data'] != undefined){
            res['data'].forEach((e: any)=>{
              p.push(e)
            }) 
          } 
          setPlanters(p);
          setLoad(false); 
        })
        .catch((e)=>{ 
          setLoad(false); 
        }) 
  },[])

  const getDate = (t:any) => {
    const date = new Date(Number(t)); 
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()]; 
    var dat = date.getDate();
    return  "Actived on " + dat + " " + month + " " + year ;
  }
 
  return (
    <Main>
        <Grid container spacing={2} style={{marginBottom:'50px'}}>
            <Grid item md={12} xs={12} style={{display:'flex', justifyContent:'center', marginTop: '15vh'}}>
                <Grid container spacing={2}  maxWidth="md">
                    <Grid item md={12} xs={12}>
                        <p style={{color:'#333333', fontSize:'32px', fontWeight:'700', margin:'0'}}>Planters</p>
                        <Divider style={{marginTop:'5px', marginBottom:'10px'}}/>
                    </Grid>   
                    {load?
                      <Grid item md={12} xs={12}>
                        <LinearProgress/>
                      </Grid>:<></>
                    }  
                    {
                      planters.length>0? planters.map((item, index)=>{
                        if(index < 5 * morePlanter)
                        return(
                          <Grid key={index} item md={12} xs={12} style={{overflow:'auto'}}>
                              <ForestList id={item['_id']} mode={1} address={item['name']} amount={item['contribute'].length} updatedAt={getDate(item['treeblock'][item['treeblock'].length-1]['updatedAt'])} />
                          </Grid> 
                        )
                      }):<Grid item md={12} xs={12}> No Recorded Data </Grid>
                    }  
                    <Grid item md={12} xs={12} style={{marginTop:'20px'}} >
                      <Button style={{width:'100%', border:'solid 1px #C1C1C1', textTransform:'none'}} onClick={()=>setMorePlanter(morePlanter+1)}>Load More</Button>
                    </Grid>                     
                </Grid>
            </Grid>       
        </Grid>       
    </Main>
  );
}

export default Planters
