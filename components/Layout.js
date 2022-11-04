import { Container } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div>
        <Head>
            <title>Plushies Store</title>
        </Head>

            <Navbar/>   

        <Container>   
            {children}
        </Container>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Layout