import book from "../service/Book"
import cart from "../service/Cart"
import React, { Component } from "react";
import { withRouter, Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import "../Home/Home.css"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import pic from "../assets/book/vidhapith.jpg"
import { CardMedia, Select, Card } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import logo from "../assets/BOOK.png";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            books: [],
            carts: [],
        };
    }


    addCard(bookId) {
        let id = localStorage.getItem('Authorization');
        let card = {
            userId: JSON.parse(JSON.stringify(id)),
            bookID: bookId,
            quantity: 1
        }
        console.log(card)
        cart.addCard(card).then((data) => {
            console.log(data);
            this.setState({ carts: data.data.data })
            alert(data.data.message);
        })
        window.location.reload();
    }

    logOut() {
        window.localStorage.clear();
        console.log("login")
    }

    order(bookId) {
        this.props.history.push(`/order/${bookId}`);
    }

    updateEmployee() {
        console.log("update Person");
        let userId = localStorage.getItem('Authorization')
        this.props.history.push(`/createAccout/${userId}`);
    }

    fetchCarts() {
        cart.getAllCartByUserId(localStorage.getItem('Authorization')).then((data) => {
            this.setState({ carts: data.data.data });
        })
    }

    fetchData() {
        book.findAllBook().then((responce) => {
            console.log("fetch")
            console.log(responce)
            this.setState({ books: responce.data.data })
        });
    }

    componentDidMount() {
        this.fetchData();
        this.fetchCarts();
    }

    sortByHigher() {
        book.sortingHighToLow().then((responce) => {
            this.setState({ books: responce.data.data })
        })
    }

    sortByLower() {
        book.sortingLowToHigh().then((responce) => {
            this.setState({ books: responce.data.data })
        })
    }

    onSelect = (event) => {
        if (event.target.value === "low_to_high") {
            console.log("High")
            this.sortByLower();
        }
        else if (event.target.value === "high_to_low") {
            console.log("Low")
            this.sortByHigher()
        } else if (event.target.value === "new_book") {
            console.log("new Book")
            this.componentDidMount();
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

    render() {
        return (
            <div>
                <header class="header-content header">
                    <div class="logo-content">
                        <img src={logo} alt="logo" />
                        <div><span class=" book-text">BOOK</span>
                            <span class="book-text add-book">STORE</span>
                        </div>
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
                                            position: "absolute", bottom: 640, right: "5%",
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
                <Toolbar >
                    <Typography component="div" sx={{ marginTop: "2rem", flexGrow: 1, fontWeight: 'bold', fontSize: '30px' }}>
                        Books {this.state.books.length}
                    </Typography>
                    <FormControl sx={{ marginTop: "2rem", marginLeft: "60rem", marginbottom: "3rem" }}>
                        <Select color="" native defaultValue="" id="grouped-native-select" label="Grouping" onChange={this.onSelect}>
                            <option value="new_book" id="new_book" onClick={this.componentDidCatch}>New Book</option>
                            <option value="low_to_high" id="low_to_high" onClick={this.sortByLower}>Low to high Price</option>
                            <option value="high_to_low" id="high_to_low" onClick={this.sortByHigher}>high to low Price</option>
                        </Select>
                    </FormControl>
                </Toolbar>
                <div className='booksbody'>
                    <Box sx={{
                        flexGrow: 1, marginTop: '15px', marginBottom: '20px', padding: '25px', background: '#EFF5F5', boxShadow: '1px 2px 3px 2px grey', borderRadius: '20px'
                    }}
                    >
                        <Grid container spacing={2}>
                            {this.state.books && this.state.books.map((book, index) => (
                                <Grid item xs={6} sm={4} md={4}>
                                    <Card sx={{
                                        maxWidth: 300, boxShadow: ' 2px 3px grey', borderBottomLeftRadius: '40px', borderBottomRightRadius: '40px', paddingTop: '0px', marginBottom: '40px', marginLeft: '80px'
                                    }}
                                    >
                                        <div className='books'>
                                            <div className='base'>
                                                <FormControl>
                                                    <div className='title'>
                                                        <CardMedia
                                                            component="img"
                                                            alt="green iguana"
                                                            height="280"
                                                            padding="1rem" width="50"
                                                            src={book.bookImg} />
                                                        <h3>{book.bookName}</h3>
                                                        <h5>{book.authorName}</h5>
                                                        <h4>Rs.{book.price}</h4>
                                                    </div>
                                                    <div >
                                                        {book.quantity === 0 ? <Button variant="contained" size='medium' color="info" disabled='true'>OUT OF STOCKS</Button> :
                                                            <Button type='submit' color="error" className="btn" onClick={() => this.addCard(book.bookId)}>Add to cart</Button>
                                                        }
                                                    </div>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </div>
            </div >
        )
    }
}

export default withRouter(Home);