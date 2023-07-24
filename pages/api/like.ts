import type { NextApiRequest, NextApiResponse } from 'next'
import { uuid } from 'uuidv4';//this allows to attach unique identifier to every single like

import { client } from "../../utils/client"

export default async function handler(req: NextApiRequest, res: NextApiResponse)//req:nextApiRequest is typescript syntax showing request type 
{
    if(req.method === "PUT"){
        const {userId,postId,like}=req.body;
        //patch is used for change something in the client
        const data=
        like ? await client
        .patch(postId)
        .setIfMissing({likes:[]})
        .insert('after','likes[-1]',[
            {
                _key:uuid(),
                _ref:userId
            }
        ])
        .commit()
        :
        await client
        .patch(postId)
        .unset([`likes[_ref=="${userId}"]`])
        .commit()
        res.status(200).json(data);
    }
}


//like ko shi se smjhna h baad mein