import axios from "axios";
import { URL } from "../Redux/Url";

export const updateStock = async (cartitem) => {
    console.log(cartitem);
    const {data} = await axios.put(`${URL}/api/products/quantity/update`,cartitem);
    console.log (data);
    return data ;
}