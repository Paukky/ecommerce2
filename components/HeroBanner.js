import React from 'react'
import Image from 'next/image'
import { urlFor } from '../lib/client';
import { Container, Typography,Box } from '@mui/material'
const HeroBanner = ({heroBanner}) => {
  return (
    <React.Fragment>
        <Container maxWidth={'false'} sx={{
          bgcolor: '#cfe8fc',
          display: 'flex',
          alignItems: 'center',
          justifyitems: 'center',
          borderRadius: '10px'
        }}>
      <img src={urlFor(heroBanner.image)}/>
      <Box sx={{
        flexDirection: "column",
        justifyContent: "center",
        padding: '30px',
        maxWidth: '60ch',
        textAlign: 'center'
      }}>
        <Typography variant={'h5'}>{heroBanner.smallText}</Typography>
        <Typography variant={'h2'}>{heroBanner.largeText}</Typography>
        <Typography variant={'h7'}>{heroBanner.desc}</Typography>
      </Box>
      </Container>
    </React.Fragment>
  )
}

export default HeroBanner