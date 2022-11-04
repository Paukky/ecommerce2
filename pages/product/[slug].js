import { Container,Box, Typography, Button } from '@mui/material'
import React,{useState} from 'react'
import Product from '../../components/Product'
import { Alert, Snackbar } from '@mui/material';
import { useStateContext } from '../../context/StateContext';
import {client, urlFor} from '../../lib/client';
import {Star} from '@mui/icons-material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';




const ProductDetails = ({product, products}) => {

    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, open,handleClose} = useStateContext();
    
  return (
    <React.Fragment>
        <Snackbar 
            open={open} 
            autoHideDuration={3000} 
            onClose={handleClose} 
            anchorOrigin={{vertical: 'bottom', horizontal:'center'}}
        >
            <Alert variant={'filled'} severity={'success'}>{qty}x {product.name} added to the cart.</Alert>
        </Snackbar>
        <Box sx={{
            flexDirection: 'row',
            display: 'flex'
        }}>
            <Box sx={{
                display:'flex',
                flexDirection: 'column',   
            }}>
                <img src={urlFor(image && image[index])} />

                <Box sx={{
                    display:'flex',
                    flexDirection: 'row',
                    marginY: '1em'  
                }}>
                    {image?.map((item, i) => (
                    <img 
                        key={i}
                        src={urlFor(item)}
                        width={'20%'}
                        onMouseEnter={() => setIndex(i)}
                    />
                    ))}
                </Box>
            </Box>
              

        <Container sx={{
            marginTop:'3em'
        }}>
            <Box>
                <Typography variant={'h5'}>
                    {name}
                </Typography>
                <Box sx={{
                    display:'flex',
                    flexDirection:'row',
                    marginY: '1em',
                }}>
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    <StarBorderOutlinedIcon/> 
                    <Typography>(20)</Typography> 
                </Box>   
                <Box sx={{ marginY: '1em'}}>
                    <Typography variant={'h6'}>Details:</Typography>
                    <Typography>{details}</Typography>     
                </Box>         
                <Typography  variant={'h4'} color={'secondary'}>${price}</Typography> 
                    <Box sx={{
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center',
                        marginY: '1em'
                    }}>
                        <Typography variant={'h6'} sx={{marginRight:'0.5em'}}>Quantity:</Typography>
                        <Box sx={{
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center'
                        }}>
                            <Button onClick={decQty} color={'black'}>
                                <IndeterminateCheckBoxOutlinedIcon/>
                            </Button>
                            <Typography variant={'h6'}>{qty}</Typography>
                            <Button onClick={incQty} color={'black'}>
                                <AddBoxOutlinedIcon/>
                            </Button>
                        </Box>
                    </Box>

                <Button variant={'outlined'} color={'secondary'} sx={{mr:'1em'}} onClick={() => onAdd(product,qty)}>
                    Add to Cart
                </Button>
                <Button variant={'contained'} color={'secondary'}>
                    Buy Now
                </Button>
            </Box>
        </Container>
        </Box>
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems:'center'
            }}
        >
            <Typography variant={'h5'} sx={{marginY:'1em'}}>You may also like</Typography>
            <Box
                sx={{
                    display:'flex',
                    flexDirection:'row',
                    marginY:'1em'
                }}
            >
                {products.map((item) => (
                    <Product key={item._id} product={item} />
                ))}
            </Box>
        </Container>

    </React.Fragment>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;
  
    const products = await client.fetch(query);
  
    const paths = products.map((product) => ({
      params: { 
        slug: product.slug.current
      }
    }));
  
    return {
      paths,
      fallback: 'blocking'
    }
  }
  
  export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'
    
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
    return {
      props: { products, product }
    }
  }
  

export default ProductDetails