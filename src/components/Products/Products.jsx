import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";

// const products = [
//   {
//     id: 1,
//     name: "Shoes",
//     description: " Running Shoes",
//     price: "$80",
//     image:
//       "https://3q87le1gsko01ibim33e4wib-wpengine.netdna-ssl.com/wp-content/uploads/2020/04/https-hypebeast.com-image-2020-01-dior-air-jordan-1-low-high-first-look-1-1-1024x683.jpg",
//   },
//   {
//     id: 2,
//     name: "Macbook",
//     description: "Workstation",
//     price: "$1099",
//     image:
//       "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-silver-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000",
//   },
// ];

const Products = ({ products, handleAddToCart }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};
export default Products;
