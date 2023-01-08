import axios from "axios";

class Cart{

    baseUrl = "http://localhost:8080";

    addCard(data){
        return axios.post(`${this.baseUrl}/insertProductInCart`,data);
    }

    getCartById(id){
        return axios.get(`${this.baseUrl}/getCartById/${id}`);
    }

    getAllCartByUserId(id){
        return axios.get(`${this.baseUrl}/getCartByUserId/${id}`);
    }

    deleteCartByCartId(id){
        return axios.delete(`${this.baseUrl}/deleteCartById/${id}`);
    }

    updateCartById(cartId, cartData){
        return axios.put(`${this.baseUrl}/updateCartById/${cartId}`,cartData)
    }

}
export default new Cart();