import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from "../../../utils/client"
import { searchPostsQuery } from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse)//req:nextApiRequest is typescript syntax showing request type 
{
    if (req.method === 'GET')//post method because passing the data 
    {
        const { id } = req.query;

        const videosQuery = searchPostsQuery(id!);
    
        const videos = await client.fetch(videosQuery);
    
        res.status(200).json(videos);
    }
}