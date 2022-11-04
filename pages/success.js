import React, { useEffect } from 'react';
import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useStateContext } from '../context/StateContext';
import { Box, Container, Icon,Typography,Button } from '@mui/material';
import { runFireworks } from '../lib/util';
const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <Container sx={{minHeight: '60vh'}}>
      <Box sx={{
                bgcolor: '#dcdcdc', 
                borderRadius: '15px', 
                width:'1000px', 
                margin: 'auto',
                marginTop: '160px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
        }}
      >
        <Icon color={'success'} sx={{ fontSize: 120}} >
            <CheckCircleIcon sx={{ fontSize: 80}}/>
        </Icon>
        <Typography variant={'h4'}>Thank you for your order!</Typography>
        <Typography >Check your email inbox for the receipt.</Typography>
        <Typography sx={{margin: '10px', marginTop: '20px'}}>
          If you have any questions, please email <span/>
          <a href="mailto:order@example.com">
            order@example.com
          </a>
        </Typography>
        <Link href="/">
        <Button color={'secondary'} variant={'contained'} sx={{margin:'10px', marginBottom:'30px'}}> Continue Shopping</Button>
        </Link>
      </Box>
    </Container>
  )
}

export default Success