import React from 'react'
import Link from 'next/link'
import { Typography,Card,Button } from '@mui/material'
import { urlFor } from '../lib/client'
const Product = ({product: {image,name,slug,price}}) => {
  return (
      <Link href={`/product/${slug.current}`}>
          <Button>
            <Card 
            variant={'outlined'}
            sx={{
              padding: '2em',
              marginLeft: '1em',
              marginRight: '1em',
              borderRadius: '1em'
            }}>
              <img
                src={urlFor(image && image[0])}
                width={250}
                height={250}
              />
              <Typography variant={'h5'}>{name}</Typography>
              <Typography variant={'h6'}>${price}</Typography>
            </Card>
        </Button>
      </Link>
  )
}




export default Product