import React from "react"
import Layout from "../components/Layout"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StateContext } from "../context/StateContext";
const theme = createTheme({
  palette: {
    primary: {
      main: '#f8c8dc',
    },
    secondary: {
      main: '#f50057',
    },
    black: {
      main: '#000000'
    }
  },
  fontSize: {
    xxl: {
      fontSize:'1000px'
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    
      <ThemeProvider theme={theme}>   
        <StateContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>   
        </StateContext>
      </ThemeProvider>
    
  )

}


export default MyApp
