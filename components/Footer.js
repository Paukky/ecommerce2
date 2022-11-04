import { Box, Container, Typography } from '@mui/material'
import { Instagram,Twitter } from '@mui/icons-material'
import React from 'react'

const Footer = () => {

  return (
    <Container sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        marginY: '1em',
        flexDirection: 'column'
    }}>
        <Typography variant={'h8'}>2022 Plushies All rights reserved</Typography>
        <br/>
        <Box sx={{
            marginY: '0.5em'
        }}>
            <Instagram/>
            <Twitter/>
        </Box>
    </Container>
  )
}

export default Footer