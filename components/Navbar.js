import { AppBar,Button,Box, Toolbar, Typography,Drawer } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../assets/images/logo.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStateContext } from '../context/StateContext'
import Cart from './Cart'

const Navbar = () => {

const { showCart,setShowCart,totalQuantities,handleCart} = useStateContext();

  return (
    <Box>
    <Box sx={{
        flexGrow: 1,
        display: 'flex',
    }}>

        <AppBar 
            position={'static'} 
            color={'transparent'} 
            sx={{
                borderRadius: '5px',
                display:'flex',
                mb: 2
            }}
            > 
            <Toolbar>
                <Box sx={{ flexGrow: 1, mr: 2}}>
                    <Link href='/'>
                        <Image src={Logo} layout="fixed" height={50} width={100}/>
                    </Link>
                </Box>
                <Box>
                    <Button onClick={handleCart} color={'secondary'}>
                        <ShoppingCartIcon/>
                        <Typography>{totalQuantities}</Typography>
                    </Button>
                                 
                </Box>
            </Toolbar>
        </AppBar>
        <Drawer anchor={'right'} open={showCart} onClose={() => setShowCart(false)}>
            <Cart/>
        </Drawer>  
        
     </Box>
     
     </Box>
  )
}

export default Navbar