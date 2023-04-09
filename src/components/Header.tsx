/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box'; 
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Autocomplete from '@mui/material/Autocomplete'; 
import { TextField, Typography } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import WifiIcon from '@mui/icons-material/Wifi';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WalletButton from './WalletButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface Network {
    name: string;
    value: string;
    color: string;
}   
const networks: Network[] = [
    {name:'Shasta', value:'Shasta', color:'#FACE7A'},
    {name:'Mainnet', value:'Mainnet', color:'#6DDA78'}, 
    {name:'Nile', value:'Nile', color:'#7AC4FA'},
]    

const ColorDot = styled('span')(({color}) =>({
    width: '12px !important',
    height: '12px !important',
    backgroundColor: networks[Number(color)].color, 
    borderRadius: '30px', 
    marginRight: '10px',
}));  

interface AppBarProps extends MuiAppBarProps {
}

const AppBar = styled(MuiAppBar, {})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
})); 
  

const Header: React.FC  = ( ) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); 
    const open = Boolean(anchorEl);
    const [opennetwork, setOpenNetwork] = React.useState(false);
    const [network, setNetwork] = React.useState(0);
    const anchorRefNetwork = React.useRef<HTMLButtonElement>(null);
    const [openexplorer, setOpenExplorer] = React.useState(false); 
    const anchorRefExplorer = React.useRef<HTMLButtonElement>(null);  

     
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };   
    const handleToggleNetwork = () => {
        setOpenNetwork((prevOpen) => !prevOpen);
    };  
    const handleSelectNetwork = (index:number) => {        
        if(index == 1 || index == 2){
            setOpenNetwork(false);
            alert("Now we are opened for only Shasta test network.")
            return 
        }
        setNetwork(index);
        setOpenNetwork(false);
    }; 
    function handleListKeyDownNetwork(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenNetwork(false);
        } else if (event.key === 'Escape') {
            setOpenNetwork(false);
        }
    }   
    const handleToggleExplorer = () => {
        setOpenExplorer((prevOpen) => !prevOpen);
    };  
    const handleSelectExplorer = (index:number) => {
        if(index === 0){
            window.location.href = '/planters'
        }else if(index === 1){
            window.location.href = '/trees'
        }else{
            // window.location.href = '/ '
        } 
        setOpenExplorer(false);
    }; 
    function handleListKeyDownExplorer(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenExplorer(false);
        } else if (event.key === 'Escape') {
            setOpenExplorer(false);
        }
    }      
    
    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'var(--background)', color: '#000' }}>
            <Grid container spacing={2} sx={{ justifyContent: "space-between", maxWidth:"1400px", margin:"-16px auto 0", height:'100px' }}>
                <Grid item sx={{ width: '80px', paddingLeft: '30px !important', display: 'flex', alignItems: 'center' }} xs={1} md={2}>
                    <a href='/'>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <img
                                src="/assets/logo.png"
                                alt="BlockForest"
                                style={{ objectFit: 'cover', width: '35px' }}                                
                            />
                            <Typography sx={{ display: { xs: 'none', md: 'flex' } }} style={{margin:'0', fontSize:'22px', fontWeight:'700'}}><span>BlockForest</span></Typography> 
                        </div>  
                    </a> 
                </Grid>
                <Grid item xs={5} md={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', minWidth: '240px', paddingRight: { sm: '0px', md: '120px' } }}>
                    <Button
                        ref={anchorRefNetwork}
                        id="composition-button"
                        aria-controls={opennetwork ? 'composition-menu' : undefined}
                        aria-expanded={opennetwork ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggleNetwork}
                        style={{color:'#333333', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', borderRadius: '40px', height:'38px', width:'170px'}} 
                    >
                         <ColorDot color={network.toString()}/>
                         <span style={{fontWeight:'600', textTransform: 'capitalize'}}>{networks[network].name}</span> 
                         <WifiIcon style={{marginLeft:'5px', color:'#C1C1C1'}} />
                         <KeyboardArrowDownIcon style={{marginLeft:'5px', color:'#C1C1C1'}}  />
                    </Button>
                    <Popper
                        open={opennetwork}
                        anchorEl={anchorRefNetwork.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                                >
                                <Paper>
                                    <ClickAwayListener onClickAway={()=>handleSelectNetwork(0)}>
                                    <MenuList
                                        autoFocusItem={opennetwork}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDownNetwork}
                                    >
                                        <MenuItem style={{width:'170px', color:'#888888' }} onClick={()=>handleSelectNetwork(0)}>
                                            <div style={{display:'flex', justifyContent:'start', alignItems:'center'}}>
                                                <ColorDot color={'0'}/><div>Shasta</div>
                                            </div>                                            
                                        </MenuItem>
                                        <MenuItem style={{width:'170px', color:'#888888'}} onClick={()=>handleSelectNetwork(1)}>
                                            <div style={{display:'flex', justifyContent:'start', alignItems:'center'}}>
                                                <ColorDot color={'1'}/>
                                                <div>Mainnet</div>
                                                <LockOutlinedIcon style={{fontSize:'14px', marginLeft:'5px'}}/>
                                            </div> 
                                        </MenuItem>
                                        <MenuItem style={{width:'170px', color:'#888888'}} onClick={()=>handleSelectNetwork(2)}>
                                            <div style={{display:'flex', justifyContent:'start', alignItems:'center'}}>
                                                <ColorDot color={'2'}/>
                                                <div>Nile</div>
                                                <LockOutlinedIcon style={{fontSize:'14px', marginLeft:'5px'}}/>
                                            </div>                                            
                                        </MenuItem>
                                    </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Grid>
                <Grid item xs={1} md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '20px' }}> 
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, paddingRight:'30px' }} >
                        <Button
                            ref={anchorRefExplorer} 
                            aria-controls={openexplorer ? 'composition-menu' : undefined}
                            aria-expanded={openexplorer ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggleExplorer}
                            style={{color:'#333333', height:'38px', width:'170px',marginRight:'10px'}}                            
                            >  
                            <span style={{fontWeight:'600', textTransform: 'capitalize'}}>Explore</span>
                            <KeyboardArrowDownIcon style={{marginLeft:'5px', color:'#C1C1C1'}}  />
                        </Button>
                        <Popper
                            open={openexplorer}
                            anchorEl={anchorRefExplorer.current}
                            role={undefined}
                            placement="bottom-start"
                            transition
                            disablePortal                            
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                                    }}
                                    >
                                    <Paper >
                                        <ClickAwayListener onClickAway={()=>handleSelectExplorer(5)}>
                                        <MenuList
                                            autoFocusItem={openexplorer}
                                            id="composition-menus"
                                            aria-labelledby="composition-button"
                                            onKeyDown={handleListKeyDownExplorer}
                                        >   
                                            <MenuItem style={{width:'250px', color:'#888888'}} onClick={()=>handleSelectExplorer(0)}> 
                                                <div>                                                     
                                                    <img src='/assets/icons/planter.png' style={{width:'24px', marginRight:'15px'}} alt="" />
                                                </div>
                                                <span>Planters</span> 
                                            </MenuItem>
                                            <MenuItem style={{width:'250px', color:'#888888'}} onClick={()=>handleSelectExplorer(1)}> 
                                                <div>                                                    
                                                    <img src='/assets/icons/tree.png' style={{width:'24px', marginRight:'15px'}} alt="" /> 
                                                </div>
                                                <span>Tree Blocks</span> 
                                            </MenuItem>
                                            <MenuItem style={{width:'250px', color:'#888888'}} onClick={()=>handleSelectExplorer(2)}> 
                                                <div>                                                    
                                                    <img src='/assets/icons/exchange.png' style={{width:'24px', marginRight:'15px'}} alt="" />
                                                </div>
                                                <span>Carbon Credits Status</span> 
                                            </MenuItem>
                                        </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                        <WalletButton />
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleMenuClick}
                        >
                            <MoreVertIcon sx={{ color: 'var(--text-color)' }} />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                            PaperProps={{
                                style: {
                                    maxHeight: 270,
                                    width: '25ch',
                                },
                            }}
                        >
                            <MenuItem style={{width:'250px', color:'#888888'}} onClick={()=>handleSelectExplorer(0)}>  
                                <img src='/assets/icons/planter.png' style={{width:'20px', marginRight:'15px'}} alt="" /> 
                                <span>Planters</span>  
                            </MenuItem>
                            <MenuItem style={{width:'250px', color:'#888888'}} onClick={()=>handleSelectExplorer(1)}>   
                                <img src='/assets/icons/tree.png' style={{width:'20px', marginRight:'15px'}} alt="" />  
                                <span>Tree Blocks</span>
                            </MenuItem>
                            <MenuItem style={{width:'250px', color:'#888888'}} onClick={()=>handleSelectExplorer(2)}>  
                                <img src='/assets/icons/exchange.png' style={{width:'20px', marginRight:'15px'}} alt="" />                                
                                <span>Carbon Credits Status</span>
                            </MenuItem> 
                            <MenuItem >
                                <WalletButton />
                             </MenuItem>
                        </Menu>
                    </Box>
                </Grid>
            </Grid>
        </AppBar>
    );
}

export default Header;
