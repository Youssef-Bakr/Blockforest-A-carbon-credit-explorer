import * as React from 'react';
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { WalletActionButton,  } from '@tronweb3/tronwallet-adapter-react-ui'; 
import { useWallet,  } from '@tronweb3/tronwallet-adapter-react-hooks';
 

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Props { }

const WalletButton: React.FC<Props> = ({ }) => { 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);  
   
    const {address} = useWallet()

    return ( 
       <WalletActionButton className='wallet-btn'/>   
    );
}

export default WalletButton;
