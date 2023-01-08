import Cart from "../service/Cart";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../assets/BOOK.png";
import Grid from '@mui/material/Grid';
import "./cart.css"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControl, Select, TextField } from "@mui/material";

class cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carts: [],
    };
  }

  fetchData() {
    Cart.getAllCartByUserId(localStorage.getItem('Authorization')).then((responce) => {
      console.log("fetch");
      console.log(responce)
      this.setState({ carts: responce.data.data })
    })
    localStorage.setItem('Carts', this.state.carts.length);
  }

  componentDidMount() {
    this.fetchData();
  }

  removeItemByCart(id) {
    console.log(id);
    Cart.deleteCartByCartId(id);
    window.location.reload();
  }

  updateQuantityByCartId = (cartId, bookId, newQuantity) => {
    console.log("Cart id :", cartId)
    console.log("book id :", bookId)
    console.log("quantity :", newQuantity)

    let cartData = {
      userId: localStorage.getItem("Authorization"),
      bookID: bookId,
      quantity: newQuantity
    }
    Cart.updateCartById(cartId, cartData).then((data) => {
      console.log(data);
      console.log("Book id :", data.data.data.bookId.bookId)
    })
    window.location.reload();
  }

  getName() {
    let nm = localStorage.getItem('Name');
    console.log("User Name : ", localStorage.getItem('Name'))
    return nm;
  }

  onClick() {
    localStorage.clear()
  }

  render = () => {
    return (<>
      <header class="header-content header">
        <div class="logo-content">
          <Link to="/home">
            <Button>
              <img src={logo} alt="logo" />
              <div><span class=" book-text">BOOK</span>
                <span class="book-text add-book">STORE</span>
              </div>
            </Button>
          </Link>
        </div>

        <div >
          <PopupState variant="dialog" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Box
                  m={1}
                  display="flex"
                  justifyContent="flex-end"
                >
                  <Button color='primary' variant="contained" style={{
                    position: "absolute", bottom: 630, right: "7%",
                    transform: "translateX(50%)",


                  }}  {...bindTrigger(popupState)}>
                    {localStorage.getItem('Authorization') === null ? 'welcome' : this.getName()}
                  </Button></Box>
                <Menu {...bindMenu(popupState)}>
                  <Link to="/createAccout" style={{ textDecoration: 'none' }} >
                    <MenuItem onClick={popupState.close}>{localStorage.getItem('Authorization') === null ? 'New Registration' : 'Edit Profile'}</MenuItem>
                  </Link>
                  <Link to="/myOrder" style={{ textDecoration: 'none' }} >
                    <MenuItem onClick={popupState.close}>{localStorage.getItem('Authorization') === null ? 'New Registration' : 'My Order'}</MenuItem>
                  </Link>

                  <Link to="/login" style={{ textDecoration: 'none' }} >
                    <MenuItem onClick={this.logOut}>{localStorage.getItem('Authorization') === null ? 'Login' : 'Logout'}</MenuItem>
                  </Link>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </div>
      </header>
      <div className='cartsbody'>
        <Box sx={{
          flexGrow: 1, marginTop: '15px', marginBottom: '20px', padding: '25px', background: '#EFF5F5', boxShadow: '1px 2px 3px 2px grey', borderRadius: '20px'
        }}
        >
          <Grid container spacing={2}>
            {this.state.carts && this.state.carts.map((cartItem, index) => (
              <Grid item xs={6} sm={4} md={4}>
                <Card sx={{
                  maxWidth: 300, boxShadow: ' 2px 3px grey', borderBottomLeftRadius: '40px', borderBottomRightRadius: '40px', paddingTop: '0px', marginBottom: '40px', marginLeft: '80px'
                }}
                >
                  <FormControl>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="220"
                      padding="0rem" width="50"
                      src={cartItem.bookID.bookImg}
                      marginTop="0px" />
                    <h3>{cartItem.bookID.bookName}</h3>
                    <h5>{cartItem.bookID.authorName}</h5>
                    <h5>Rs.{cartItem.bookID.price}</h5>
                    <div> <h4>Quantity :
                      <div className="quantity">
                        <button type="button" onClick={() => this.updateQuantityByCartId(cartItem.cartId, cartItem.bookID.bookId, cartItem.quantity - 1)} >-</button>
                        <h4 padding="0px">{cartItem.quantity}</h4>
                        <button type="button" onClick={() => this.updateQuantityByCartId(cartItem.cartId, cartItem.bookID.bookId, cartItem.quantity + 1)}>+</button>
                      </div>
                    </h4></div>
                    <h5>Total Price {cartItem.totalPrice}</h5>
                    <div >
                      <Button variant="outlined" color="secondary" onClick={() => this.removeItemByCart(cartItem.cartId)}>Remove Item</Button>
                    </div>
                  </FormControl>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        {this.state.carts.length === 0 ?
          <Link to="/home">
            <Button variant="contained">Back to Home</Button>
          </Link> : <Link to="/address">
            <Button variant="contained">Continue</Button>
          </Link>}
      </div>
    </>
    );
  }
}
export default cart;