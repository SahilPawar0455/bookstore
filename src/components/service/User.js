import axios from "axios";

class user{

    baseUrl = "http://localhost:8080";

    createPerson(data) {
        return axios.post(`${this.baseUrl}/registration`,data);
      };
  
      updatePerson = (id, data) => {
        console.log(id);
        return axios.put(`${this.baseUrl}/updatePersonData/${id}`, data);
      };
      findPersonByEmail = (email) => {
        return axios.get(`${this.baseUrl}/getUserByEmail/${email}`);
      };
  
      findPerson = (id) => {
        return axios.get(`${this.baseUrl}/searchPersonById/${id}`);
      };

      login = (data) => {
        return axios.post(`${this.baseUrl}/login`,data);
      };
}
export default new user();