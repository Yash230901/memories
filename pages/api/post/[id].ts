import type { NextApiRequest, NextApiResponse } from 'next'
import { postDetailQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';
import { uuid } from 'uuidv4';
export default async function handler(req: NextApiRequest, res: NextApiResponse)//req:nextApiRequest is typescript syntax showing request type 
{
    if (req.method === 'GET') {
        const { id } = req.query;
        const query = postDetailQuery(id!);//this non-null assertion operator tells typescript that this value will never be null or undefined

        const data = await client.fetch(query);
        res.status(200).json(data[0]);
    }
    else if (req.method === 'PUT') {
        const { comment, userId } = req.body;
        const { id }: any = req.query;

        const data = await client
        .patch(id)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
                {
                    comment,
                    _key: uuid(),
                    postedBy: { _type: 'postedBy', _ref: userId }
                }
            ])
        .commit()
            res.status(200).json(data);
    }
}