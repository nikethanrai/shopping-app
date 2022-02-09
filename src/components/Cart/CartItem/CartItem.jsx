import React from "react";
import {
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import useStyles from "./styles";
const CartItem = ({ item }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia image={item.image.url} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small">
            -
          </Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button type="button" size="small">
            +
          </Button>
        </div>
        <Button variant="contained" type="button" color="secondary">
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
