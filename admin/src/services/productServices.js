import axios from "axios";
import { URL } from "../Redux/Url";

export const addhotsale =async (id) => {
     const {data} = await axios.put(`${URL}/api/products/addhotsale/${id}`);
      return data.message;
} 
export const deletehotsale =async (id) => {
    const {data} = await axios.delete(`${URL}/api/products/deletehotsale/${id}`);
     return data.message;
} 