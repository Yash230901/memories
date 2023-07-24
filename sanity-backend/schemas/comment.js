export default{
    name:'comment',
    title:'Comment',
    type:'document',
    fields:[
        {
            name:'postedBy',//who posted that comment
            title:'Posted By',
            type:'postedBy'
        },{
            name:'comment',
            title:'Comment',
            type:'string',
        }
    ]
}