import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from "../../utils/client"

export default async function handler(req: NextApiRequest, res: NextApiResponse)//req:nextApiRequest is typescript syntax showing request type 
{
    if (req.method === 'POST')//post method because we are passing the data with the request
    {
      const user=req.body;//we are sending data to the request and we are getting in req.body

      client.createIfNotExists(user)
      .then(()=>res.status(200).json("Login Success"))//this will create a new user if doesnot exist in the sanity database
    }
}
