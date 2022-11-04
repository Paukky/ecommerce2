import React, {useRef} from 'react'
import Link from'next/link'
import { Container,IconButton,Button, Typography,Box } from '@mui/material'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import getStripe from '../lib/getStripe';
import {urlFor} from '../lib/client'
import { useStateContext } from '../context/StateContext'
const Cart = () => {

  const cartRef = useRef();
  const {totalPrice, totalQuantities, cartItems, setShowCart,toggleCartItemQuantity,onRemove } = useStateContext();

  const handleCheckout = async () => {
    
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });
    
    if(response.statusCode === 500) return;
    const data = await response.json();
    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <Container
      maxWidth={'lg'}
      ref={cartRef}
    >
      <Button 
        color={'black'} 
        sx={{
          margin: '1em',
          display: 'flex',
          alignItems:'center',
          justifyContent:'center',
        }}>
        <ChevronLeftIcon/>
        <Typography variant={'button'}>Your Cart</Typography>
        <Typography color={'secondary'} variant={'button'}>({totalQuantities} items)</Typography>
      </Button>
      {cartItems.length < 1 && (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <LocalMallOutlinedIcon sx={{fontSize: 150}}/>
          <Typography >Your shopping bag is empty</Typography>
          <Link href="/">
            <Button
              variant={'contained'}
              color={'secondary'}
              onClick={() => setShowCart(false)}
              sx={{
                marginY: '1em'
              }}
            >
              <Typography variant={'button'}>Continue shopping!</Typography>
            </Button>
          </Link>
        </Box>
      )}
      <Container sx={{ paddingBottom:'20em'}}>
        {cartItems.length >= 1 && cartItems.map((item) => (
          <Container key={item._id} sx={{display: 'flex', flexDirection:'row', gapY:'20px'}}>
            <img src={urlFor(item?.image[0])} width={'200px'}/>
            <Container >
              <Container>
                <Container sx={{ display:'flex'}}>
                  <Typography variant={'h5'} sx={{flexGrow: '1', marginRight: '2em'}}>{item.name}</Typography>
                  <Typography variant={'h6'}>${item.price}</Typography>
                </Container>
                <Container sx={{ display:'flex',marginTop:'120px', alignItems:'center'}}>
                  <IconButton o
                    onClick={() => toggleCartItemQuantity(item._id, 'dec')} 
                    color={'black'} 
                    edge={'start'}
                  >
                    <IndeterminateCheckBoxOutlinedIcon/>
                  </IconButton>
                  <Typography variant={'h6'}>{item.quantity}</Typography>
                  <IconButton 
                    onClick={() => toggleCartItemQuantity(item._id, 'inc')} 
                    color={'black'}
                  >
                      <AddBoxOutlinedIcon/>
                  </IconButton>
                  <Box sx={{flexGrow: '1'}}/>
                  <IconButton onClick={() => onRemove(item)} color={'secondary'} edge={'end'} >
                    <HighlightOffOutlinedIcon/>
                  </IconButton>
                </Container>
              </Container>
            </Container>
          </Container>
        ))}
      </Container>      
      {cartItems.length >= 1 && (
      <Box sx={{display: 'flex', alignItems: 'center', flexDirection:'column', justifyContent:'center', gap: '15px'}}>
        <Container maxWidth={'lg'} sx={{display: 'flex'}}>
          <Typography sx={{flexGrow :'1'}} variant={'h5'}>Subtotal:</Typography>
          <Typography variant={'h5'}>${totalPrice}</Typography>
        </Container>
        <Button variant={"contained"} color={'secondary'} sx={{paddingX: '4em', borderRadius:'10px'}} onClick={handleCheckout}>
          <Typography variant={'subtitle1'}>Pay With Stripe</Typography>
        </Button>
      </Box>
      )}
    </Container>
  )
}

export default Cart