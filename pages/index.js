import {client} from '../lib/client'
import HeroBanner from "../components/HeroBanner";
import React from 'react';
import { Container } from '@mui/system';
import Product from '../components/Product'
import { Grid } from '@mui/material';

const Home= ({products, bannerData }) =>{
  return (
    <React.Fragment>
      {/* <HeroBanner heroBanner={bannerData.length && bannerData[0]}/> */}
      <Container
        sx={{
          marginTop: '2em'
        }}
      >
        <Grid
          container
          justifyContent={'center'}
          alignItems={'center'}      
        >
          {products?.map((product) => <Product key={product._id} product={product}/>)}
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: { products}
  }
}

export default Home;