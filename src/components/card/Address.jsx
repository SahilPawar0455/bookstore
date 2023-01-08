import React, { Component } from "react";
import { useParams, Link, withRouter } from "react-router-dom";
import logo from "../assets/BOOK.png";
import "./Address.css"
import Menu from '@mui/material/Menu';
import Cart from "../service/Cart";
import Order from "../service/Order";
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControl, Select, TextField } from "@mui/material";

class address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ""
        };
    }

    getName() {
        let nm = localStorage.getItem('Name');
        return nm;
    };

    onClick() {
        localStorage.clear()
    }

    onValueChange = (event) => {
        this.setState({
          address: event.target.value
        })
        console.log(event.target.value);
      }

    placeOrder =()=> {
          var id = localStorage.getItem("Authorization")
          console.log("userId", id)
         let add = this.state.address;
         console.log(add);

          Order.postOrder(id,add).then((responce) => {
            console.log("fetch");
            console.log(responce)
        })
        this.props.history.push("/order")
    }

    render = () => {
        return (
            <>
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

                    <div>
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
                                        <Link to="" style={{ textDecoration: 'none' }} >
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
                <div class="form-content1">
                    <form class="form1" action="#">
                        <TextField fullWidth id="fullWidth" margin="normal" placeholder="Enter Your Delivery Address..!" name='address' onChange={this.onValueChange}/>
                        <Link to="/cart"><Button color="error">Back</Button></Link>
                        
                        <Button disabled={this.state.address.length<2} color="success" onClick={this.placeOrder}>Place Order</Button>

                    </form>
                </div>
            </>
        )
    }
}
export default withRouter (address);