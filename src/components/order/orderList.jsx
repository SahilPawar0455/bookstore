import React, { Component } from 'react';
import { withRouter, Link, useParams } from "react-router-dom";
import { CardMedia, Select, Card } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import logo from "../assets/BOOK.png";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import OrderService from "../service/Order"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container } from '@mui/material';
import Box from '@mui/material/Box';
import Cart from "../service/Cart";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';

class MyOrders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            carts: [],
        }
    }
    getName() {
        let nm = localStorage.getItem('Name');
        console.log("User Name : ", localStorage.getItem('Name'))
        return nm;
      }
    
      onClick() {
        localStorage.clear()
      }

    fetchOrderData() {
        Cart.getAllCartByUserId(localStorage.getItem('Authorization')).then((responce) => {
            console.log("fetch");
            console.log(responce)
            this.setState({ carts: responce.data.data })
          })
        OrderService.getOrderByUserId(localStorage.getItem('Authorization')).then(response => {
            console.log(response.data.data);
            this.setState({
                orders: response.data.data
            })
        })
    }

    componentDidMount() {
        this.fetchOrderData();
    }

    handleCancelOrder = (orderId) => {
        OrderService.cancelOrder(orderId).then(() => {
            this.fetchOrderData();
        })
    }

    render() {
        return (
            <div>
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
                    <div class="user-name">
                        <Link to="/cart">
                            <Button> <LocalGroceryStoreIcon />{this.state.carts.length}</Button>
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
                                            position: "absolute", bottom: 630, right: "5%",
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
                    <div>
                    </div>
                </header>
                <Container>

                    <TableContainer component={Paper} style={{ marginTop: 45 }}>
                        <Table sx={{ minWidth: 550 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell align="right">Order Date</TableCell>
                                    <TableCell align="right">Address</TableCell>
                                    <TableCell align="right">Quantity </TableCell>
                                    <TableCell align="right">Total Price</TableCell>
                                    <TableCell align="right">Order Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.orders.map((orderdata) => (

                                    <TableRow
                                        key={orderdata.orderId}

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {orderdata.orderId}
                                        </TableCell>
                                        <TableCell align="right">{orderdata.date}</TableCell>
                                        <TableCell align="right">{orderdata.address}</TableCell>
                                        <TableCell align="right">{orderdata.quantity}</TableCell>
                                        <TableCell align="right">{orderdata.price}</TableCell>
                                        {orderdata.cancel ? (
                                            <TableCell align="right"> <Button variant='text' color="error" disabled>Cancelled</Button> </TableCell>
                                        ) : (
                                            <TableCell align="right"> <Button variant='contained' color="error" onClick={() => this.handleCancelOrder(orderdata.orderId)}>Cancel</Button> </TableCell>
                                        )}
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>

                </Container>
            </div>
        );
    }
}

export default MyOrders;