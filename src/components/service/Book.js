import axios from "axios";

class Book{

    baseUrl = "http://localhost:8080";

    findAllBook() {
        return axios.get(`${this.baseUrl}/getAllBook`);
    };

    findBookById(id){
        return axios.get(`${this.baseUrl}/getBookById/${id}`);
    }

    sortingLowToHigh(){
        return axios.get(`${this.baseUrl}/sortingBookPriceInAscendingOrder`);
    }

    sortingHighToLow(){
        return axios.get(`${this.baseUrl}/sortingBookPriceInDescendingOrder`);
    }
}
export default new Book();