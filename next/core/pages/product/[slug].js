import React from "react";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/header";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import { InputLabel, Link } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    display: "flex",
    flexWrap: "wrap",
  },
  paper: {
    padding: theme.spacing(0),
    borderRadius: "0",
  },
  paperImagePreview: {
    paddingTop: 30,
  },
  paperImage: {
    padding: theme.spacing(0),
    borderRadius: "0",
    marginLeft: 25,
    ["@media (max-width:600px)"]: {
      marginLeft: -20,
      marginRight: -20,
    },
  },
  paperRight: {
    padding: theme.spacing(0),
    borderRadius: "0",
    paddingLeft: 40,
    paddingTop: 30,
    ["@media (max-width:600px)"]: {
      paddingLeft: 0,
      paddingTop: 10,
    },
  },
  img: {
    maxWidth: "100%",
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function Product({ post, categories }) {
  const classes = useStyles();
  const router = useRouter();
  const [val, setVal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [size, setSize] = useState('')


  const handleChange = (e) => {
    setVal(e.target.value)
    setAmount(e.target.value * post.regular_price);
    console.log(amount)
  };

  const handleSize = (e) => {
    setSize(e.target.value)
  }

  const handleAddToCart = (e, href, props) => {
    if (!amount || !size) {
      alert('Please select item quantity and size.')
    }
    else {
      e.preventDefault()
      router.push(href='/cart/orderpage')
    }
    return(
      <a href={href}>{props}</a>
    )
  };

  if (router.isFallback) {
    return <div>Loading product...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Header data={categories} />
      <Container maxWidth="md">
        <Grid container spacing={0}>
          <Hidden only={["xs", "sm"]}>
            <Grid item sm={1}>
              <Paper className={classes.paperImagePreview} elevation={0}>
                {post.product_image.map((c) => (
                  <div key={c.id}>
                    <Paper className={classes.paperImage} elevation={0}>
                      <img
                        src={post.product_image[0].image}
                        alt={post.product_image[0].alt_text}
                        className={classes.img}
                      />
                    </Paper>
                  </div>
                ))}
              </Paper>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paperImage} elevation={0}>
              <img
                src={post.product_image[0].image}
                alt={post.product_image[0].alt_text}
                className={classes.img}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Paper className={classes.paperRight} elevation={0}>
              <Box component="h1" fontSize={18} fontWeight="400">
                {post.title}
              </Box>
              <Box component="p" fontSize={22} fontWeight="900" m={0}>
                €{post.regular_price}
              </Box>

              <Box component="p" m={0} fontSize={14}>
                <FormControl className={classes.formControl}>
                  <Box component="h1" fontSize={15} fontWeight="400">
                    <TextField
                      id="filled-number"
                      label="Select Quantity"
                      helperText="Please select the number of quantity"
                      type="number"
                      min="0"
                      max="1000"
                      value={val}
                      onChange={handleChange} 
                      // onChange={(e) => setVal(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Box>
                </FormControl>
              </Box>

              <br />
              <br />

              <FormControl
                fullWidth
                className={classes.margin}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Total Price
                </InputLabel>
                <OutlinedInput
                  disabled={true}
                  id="outlined-adornment-amount"
                  value={amount}
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment position="start">€</InputAdornment>
                  }
                  labelWidth={60}
                />
              </FormControl>
              
              <br></br>
              <br></br>

              <FormControl variant="outlined" className={classes.margin}>
                <InputLabel htmlFor="outlined-age-native-simple">Size</InputLabel>
                <Select
                  native
                  value={size}
                  onChange={handleSize}
                  label="size"
                  inputProps={{
                    name: 'size',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={'XS'}>XS</option>
                  <option value={'S'}>S</option>
                  <option value={'M'}>M</option>
                  <option value={'L'}>L</option>
                  <option value={'XL'}>XL</option>
                </Select>
              </FormControl>

                <Box component="p" variant='h5'>
                <br/> 
                Add to the Shopping Cart
                  <IconButton color="primary" aria-label="add to shopping cart" onClick={handleAddToCart}>
                    <AddShoppingCartIcon />
                    
                  </IconButton>
                </Box>

              <Box component="p" m={0} fontSize={12}>
               <Link href='/product/conditions'>Free Delivery & Returns <a>(Terms & Conditions apply)</a></Link>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "boot3" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://127.0.0.1:8000/api/${params.slug}`);
  const post = await res.json();

  const response = await fetch("http://127.0.0.1:8000/api/category");
  const categories = await response.json();

  return {
    props: {
      post,
      categories,
    },
  };
}

export default Product;
