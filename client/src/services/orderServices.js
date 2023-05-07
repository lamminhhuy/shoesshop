import axios from "axios";
import { URL } from "../Redux/Url";

export const cancelOrder = async (id) => {
    const {data} = await axios.delete(`${URL}/api/orders/cancel/${id}`);
    return data.message ;
}