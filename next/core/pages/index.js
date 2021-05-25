import { CardContent, CardMedia, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box"
import Header from "../components/header"
import Link from "next/link"
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles((theme) => ({
example: {
  color: "#ccc",
},
cardGrid:{
  paddingBottom: theme.spacing(8),
},
card: {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "0",
},
cardMedia: {
  paddingTop: '140%',
},
})); 


function Home({ posts, categories }) {
  const classes = useStyles();
  return (
    <>
      <Header data={categories}/>
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Link key={post.id} href={`product/${encodeURIComponent(post.slug)}`}>
                <Grid item xs={6} sm={4} md={3}>
                  <Card className={classes.card} elevation={0}>
                    <CardMedia 
                    className={classes.cardMedia} 
                    image={post.product_image[0].image}
                    title = 'Image title'
                    alt={post.product_image[0].alt_text}
                    />
                    <CardContent>
                      <Typography gutterBottom component="p">
                        {post.title}
                      </Typography>
                      <Box component="p" fontSize={16} fontWeight={900}>
                        ${post.regular_price}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Link>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}

export async function getStaticProps(){
  const res = await fetch ("http://127.0.0.1:8000/api/")
  const posts = await res.json();

  const response = await fetch("http://127.0.0.1:8000/api/category")
  const categories = await response.json();

  return {
    props: {
      posts,
      categories
    }
  }
}

export default Home;
