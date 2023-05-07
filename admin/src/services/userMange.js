import axios from "axios";
import { URL } from "../Redux/Url";

export const enableUser =async (email) => {
     const {data} = await axios.put(`${URL}/api/users/enable`, {email:email});
      return data.message;
} 
export const disableUser =async (email) => {
    const {data} = await axios.put(`${URL}/api/users/disable`, {email:email});
     return data.message;
} 