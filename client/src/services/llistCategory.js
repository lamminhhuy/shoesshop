import axios from "axios";
import { URL } from "../Redux/Url";

export const getlist =async () => {
     const {data} = await axios.get(`${URL}/api/categories`);
      return data.categories;
} 
export const deleteCategory =async (id) => {
    const {data} = await axios.delete(`${URL}/api/categories/${id}`);
     return data.message;
} 