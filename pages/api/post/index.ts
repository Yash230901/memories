import type { NextApiRequest, NextApiResponse } from 'next'
import { allPostsQuery } from '../../../utils/queries'
import { client } from "../../../utils/client"
type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse)//req:nextApiRequest is typescript syntax showing request type 
{
  if (req.method === 'GET') {
    const query = allPostsQuery();
    const data = await client.fetch(query);//this function will fetch all the videos from sanity and this client is the sanity client object.
    res.status(200).json(data);
  }
  else if (req.method === 'POST') {

    const document = req.body;
    client.create(document)
      .then(() => res.status(201).json('video created'))//201 means created
  }
}
