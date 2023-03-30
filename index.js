const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const server = express();
server.use(cors());
server.use(bodyParser.json())
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/demo');
    console.log('db connected');

}
const userSchema = new mongoose.Schema({
    bug_id:Number,
  
    title:String,
   
    description:String,
  
    due_date:String,
    
    project:String,
   
    reporter:String,
    
    fileUrl:String
    
});
const Bug = mongoose.model('Bug', userSchema);

server.post('/demo', async (req, res) => {
    let bug = new Bug()
    
    bug.bug_id=req.body.bug_id 
    bug.title= req.body.title
    bug.description= req.body.description
    bug.due_date= req.body.due_date
    bug.project= req.body.project
    bug.reporter= req.body.reporter
    bug.fileUrl= req.body.fileUrl
    
    const doc = await bug.save()

    console.log(doc);
    res.json(doc);
})

server.get('/demo', async(req,res)=>{
    const docs=await Bug.find({});
    res.json(docs )
})

server.get('/getbug/:bugid',async(req,res)=>{
    const data= await Bug.findOne({bug_id:req.params.bugid})

        res.json(data)
    })


    server.delete('/deletebug/:bugid',async(req,res)=>{
        const deletedata=await Bug.deleteOne({bug_id:req.params.bugid})
        Bug.save

        res.json(deletedata)
    })


    server.patch('/updatebug/:bugid',async(req,res)=>{
      const  updatedata=await Bug.updateOne({bug_id:req.params.bugid},{$set:req.body})
        
            
        Bug.save
       
       
        res.json(updatedata)
    })

server.listen(8080, () => {
    console.log("server started");

})