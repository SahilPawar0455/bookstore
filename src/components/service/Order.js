import axios from "axios";

class order{

    baseUrl = "http://localhost:8080";

    createPerson(data) {
        return axios.post(`${this.baseUrl}/placeOrder`,data);
      };

      postOrder(id, newAddress){
        // let add = newAddress;
        // console.log(add);
        return axios.post(`${this.baseUrl}/placeOrderByUserId/${id}?address=${newAddress}`)
      }

      getOrderByUserId(id){
        return axios.get(`${this.baseUrl}/getOrderById/${id}`)
      }

      cancelOrder(orderId){
        return axios.put(`${this.baseUrl}/changeOrderStatus/${orderId}`)
      }
}
export default new order();