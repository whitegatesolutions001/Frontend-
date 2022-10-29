import axios from "axios";
import { AxiosRequestInterface, Constants } from "./constants"

export const postAxiosRequest = async (value : AxiosRequestInterface) => {
    const {uri, body} = value;
    console.log(body);
    return await axios.post(Constants.HOST_ADDRESS.concat(uri), body, {
        headers : {
            'Content-Type' : 'application/json'
        }
    });
}