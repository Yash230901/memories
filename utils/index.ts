import axios from 'axios';

import jwt_decode from 'jwt-decode';
import { decode } from 'punycode';
import { GiCloakDagger } from 'react-icons/gi';

export const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any,addUser:any) => {
  const decoded: { name: string, picture: string, sub: string } = jwt_decode(response.credential)//Sub is used as a unique identifier for every user.
  console.log(decoded)
  const { name, 
    picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture
  }
  //upper user object has things which is all required sanity user store. 

  addUser(user);  

  //post request because we are passing data with the request.
  await axios.post(`${BASE_URL}/api/auth`,user);
};