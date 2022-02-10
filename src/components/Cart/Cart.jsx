import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

const Cart = ({
  cart,
  handleEmptyCart,
  handleUpdateCart,
  handleRemoveCart,
}) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      <Link to="/" className={classes.link} e>
        You have no items
      </Link>
    </Typography>
  );
  const FilledCart = () => (
    <>
      <Grid container spacing={2}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={3} key={item.id}>
            <CartItem
              item={item}
              handleUpdateCart={handleUpdateCart}
              handleRemoveCart={handleRemoveCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          SubTotal:{cart.subtotal.formatted_with_symbol}{" "}
        </Typography>

        <div>
          <Button
            onClick={handleEmptyCart}
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
  if (!cart.line_items) return "Loading";

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
