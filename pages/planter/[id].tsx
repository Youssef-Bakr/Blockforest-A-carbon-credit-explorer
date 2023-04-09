/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'; 
import { Box, Button, Typography, Divider } from '@mui/material'; 
import { styled } from '@mui/material/styles'; 
import CheckIcon from '@mui/icons-material/Check';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
 
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { tronWeb } from '../../src/utils/TronWeb';

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

 
 
const PlanterDetail: React.FC<Props> = ( ) => {  
  const apiHost = 'https://blockforest-bakc.onrender.com/';
  const { signMessage, signTransaction, address } = useWallet();   
  const scanUrl = 'https://shasta.tronscan.org/#/transaction/';
  const router = useRouter()
  const { id } = router.query
  const [load, setLoad] = useState(false);
  const [isYou, setIsYou] = useState(false);

  const [txIds ,setTxIds] = useState<string[]>([]); 
  const [carbons, setCarbons] = useState<string[]>([]);
  const [planter, setPlanter] = useState<any>();
  const [blocks, setBlocks] = useState<any[]>([]);  

  const [moreCon, setMoreCon] = useState(1);
  const [moreCar, setMoreCar] = useState(1);
  const [moreTree, setMoreTree] = useState(1);

  const greenAddress = tronWeb.address.toHex('TNkWMgSLeazVSCG9KbiwD1mF6Q1G75kfmV')  

  useEffect(()=>{
    if(id == address){
      setIsYou(true)
    }
  },[address, id])

  useEffect(()=>{       
    if(id){ 
      setLoad(true);
      const nodeUrl = 'https://api.shasta.trongrid.io/v1/accounts/' + id + '/transactions';  
      axios.get(apiHost+'planter/'+id)
        .then((res) => {     
          const carbon = res['data']['carbon'];
          const contribute = res['data']['contribute'];
          const block = res['data']['treeblock']; 
          if(carbon != undefined && block != undefined){
            setCarbons(carbon); 
            setBlocks(block.reverse());
          }  
          var txids:string[] = [];      
          axios.get(nodeUrl)
            .then(function (response) {  
                response.data.data.forEach((item:any)=>{ 
                  const txID = item['txID']; 
                  if((carbon == undefined || block == undefined || !carbon.includes(txID) && !contribute.includes(txID))){
                    txids.push(txID)
                  } 
                })
                setTxIds(txids); 
            })
            .catch(function (error) { 
                setLoad(false);
                console.log(error);
            })
            .finally(function () {
                setLoad(false);  
            });
        })
        .catch((e)=>{ 
        }) 
    }
  },[id, planter])


  const contribute = async (m:string) => { 
    if(address == null){
      alert("You have to connect wallet.")
      return
    }
    if(address != id){
      alert("Your wallet address is different from this planter profile you are viewing. Please connect to a correct wallet to proceed this action.")
      return
    }
    try {
      const transaction = await tronWeb.transactionBuilder.sendTrx(greenAddress, tronWeb.toSun(0.3), address);
      const signedTransaction = await signTransaction(transaction); 
      tronWeb.trx.sendRawTransaction(signedTransaction)
        .then((response: any)=>{
          const txid = response.txid; 
          const data = {
            name: address,
            carbon: m,
            contribute: txid,            
          }
          axios.post(apiHost+'planter', data)
            .then((res)=>{
              setPlanter(res) 
            })
            .catch(function (error) {  
              console.log(error);
          })
        })
        .catch((error: any)=>{
          console.log(">>err", error)
        })        
    } catch (e) {
        
    }
  };   

  const getDate = (t:any) => {
    const date = new Date(Number(t)); 
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()]; 
    var dat = date.getDate();
    return  "Last Contribution on " + dat + " " + month + " " + year ;
  }

  const getTime = (t:any) => {
    const date = new Date(Number(t)); 
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
                        <p style={{color:'#333333', fontSize:'32px', fontWeight:'700', margin:'0'}}>Planter:</p> 
                        <p style={{color:'#333333', fontSize:'20px', fontWeight:'700', margin:'0'}}>{id}</p> 
                    </Grid>   
                    <Grid item md={12} xs={12}>
                      <Box style={{ padding: '20px', background:'white', border:'solid 2px #C1C1C1'}}>   
                        <Box style={{ justifyContent:'start'}} sx={{ display: { xs: 'block', md: 'flex' } }} >
                          <div style={{marginTop:'10px', marginRight:'80px'}}>
                            <span style={{color:'#888888', fontSize:'16px', margin:'0'}}>Transactions</span>
                            <p style={{color:'#333333', fontSize:'30px', fontWeight:'900', margin:'15px 0'}}>{carbons.length + txIds.length}</p>
                          </div>
                          <div style={{marginTop:'10px', marginRight:'80px'}}>
                            <span style={{color:'#888888', fontSize:'16px', margin:'0'}}>Carbon Credit Quota</span>
                            <p style={{color:'#333333', fontSize:'30px', fontWeight:'900', margin:'15px 0'}}>{txIds.length}</p>
                          </div>
                          <div style={{marginTop:'10px', marginRight:'80px'}}>
                            <span style={{color:'#888888', fontSize:'16px', margin:'0'}}>Carbon Credit Contributed</span>
                            <p style={{color:'#333333', fontSize:'30px', fontWeight:'900', margin:'15px 0'}}>{carbons.length}</p>
                          </div>
                        </Box>
                        <Divider style={{marginTop:'10px', marginBottom:'10px'}}/>
                        <Grid container>
                          <Grid item md={6} xs={12}>
                            <Box style={{marginTop:'10px', padding:'10px' }} sx={{ borderRight: { xs: 'none', md: 'solid 1px #C1C1C1' } }}>
                              <span style={{color:'#888888', fontSize:'16px', margin:'0'}}>Activated on</span>
                              <p style={{color:'#333333', fontSize:'20px', fontWeight:'500', margin:'15px 0'}}>{blocks.length&&getTime(blocks[blocks.length-1]['updatedAt'])}</p>
                            </Box>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Box style={{marginTop:'10px', padding:'10px'}}>
                              <span style={{color:'#888888', fontSize:'16px', margin:'0'}}>Last contributed on</span>
                              <p style={{color:'#333333', fontSize:'20px', fontWeight:'500', margin:'15px 0'}}>{blocks.length&&getTime(blocks[0]['updatedAt'])}</p>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    {load?
                      <Grid item md={12} xs={12}>
                        <LinearProgress/>
                      </Grid>:<></>
                    }    
                    <Grid item md={12} xs={12} style={{marginTop:'40px'}} >
                        <Box style={{display:'flex', justifyContent:'start', }}>
                          <img src='/assets/icons/exchange.png' style={{width:'25px', marginRight:'15px'}} alt="" />
                          <p style={{color:'#333333', fontSize:'16px', fontWeight:'900', margin:'0'}}>Transactions without carbon credit</p> 
                        </Box>
                        <Divider style={{marginTop:'10px', marginBottom:'10px'}}/>
                        {
                            txIds.length>0 ? txIds.map((m, index)=>{
                              if(index < 5*moreCon)
                              return (
                                <Box key={m} style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'15px', overflow:'auto'}}>
                                  <Typography><a href={scanUrl + m} target="_blank" style={{textDecoration:'underline', cursor:'pointer', color:'#333333'}} rel="noreferrer">{m}</a></Typography>
                                  {isYou&&<Button onClick={()=>contribute(m)} style={{backgroundColor:'#6DDA78', color:'white', textTransform:'none', padding:'5px 40px', marginLeft:'20px'}}>Contribute</Button>}
                                </Box> 
                              )
                            }):<Box style={{textAlign:'center'}}>No Recorded Data</Box>
                        }   
                        <Grid item md={12} xs={12} style={{marginTop:'20px'}} >
                          <Button style={{width:'100%', border:'solid 1px #C1C1C1', textTransform:'none'}} onClick={()=>setMoreCon(moreCon+1)}>Load More</Button>
                        </Grid>   
                    </Grid>    

                    <Grid item md={12} xs={12} style={{marginTop:'40px'}} >
                        <Box style={{display:'flex', justifyContent:'start', }}>
                          <img src='/assets/icons/exchange.png' style={{width:'25px', marginRight:'15px'}} alt="" />
                          <p style={{color:'#333333', fontSize:'16px', fontWeight:'900', margin:'0'}}>Transactions with carbon credit</p> 
                        </Box>
                        <Divider style={{marginTop:'10px', marginBottom:'10px'}}/>
                        {
                          carbons.length>0 ? carbons.map((item, index)=>{
                            if(index < 5*moreCar)
                            return(
                              <Box key={item} style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'15px', overflow:'auto'}}>
                                <Typography><a href={scanUrl + item} target="_blank" style={{textDecoration:'underline', cursor:'pointer',color:'#333333'}} rel="noreferrer">{item}</a></Typography>
                                <CheckIcon  style={{marginLeft:'10px'}}/>
                              </Box> 
                              )
                          }):<Box style={{textAlign:'center'}}>No Recorded Data</Box>
                        }     
                        <Grid item md={12} xs={12} style={{marginTop:'20px'}} >
                          <Button style={{width:'100%', border:'solid 1px #C1C1C1', textTransform:'none'}} onClick={()=>setMoreCar(moreCar+1)}>Load More</Button>
                        </Grid>   
                    </Grid>  

                    <Grid item md={12} xs={12} style={{marginTop:'40px'}} >
                        <Box style={{display:'flex', justifyContent:'start', }}>
                          <img src='/assets/icons/tree.png' style={{width:'25px', marginRight:'15px'}} alt="" />
                          <p style={{color:'#333333', fontSize:'16px', fontWeight:'900', margin:'0'}}>Contributed Tree Blocks</p> 
                        </Box>
                        <Divider style={{marginTop:'10px', marginBottom:'10px'}}/>
                        {
                          blocks.length>0 ? blocks.map((item, index)=>{
                            if(index < 5* moreTree)
                            return(
                                <Box key={item} style={{ overflow:'auto', marginTop:'20px'}}>
                                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                      <div style={{display:'flex', alignItems:'center', minWidth:'200px'}}>                                           
                                        <span style={{color: '#333333', fontWeight:'600'}}>Tree Block # {item['block']}</span>                                          
                                      </div>
                                      <div style={{textAlign:'right', minWidth:'330px'}}>
                                          <div style={{fontSize:'14px', fontWeight:'600', color:'#007BFF'}}><span>{item['cnt']} Contributions</span></div>
                                          <div style={{fontSize:'14px',  }}><span>{getDate(item['updatedAt'])}</span></div>
                                      </div> 
                                  </div>
                                </Box>
                            )
                          }):<Box style={{textAlign:'center'}}>No Recorded Data</Box>
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

export default PlanterDetail
