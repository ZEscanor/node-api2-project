const express = require("express");

const model = require("./data/db.js");

const server = express()


server.use(express.json());
const PORT = 5000
server.get("/", (req,res)=>{
    res.send({message:"welcome"});
});

server.get('/api/posts',(req,res)=>{
    model.find(req.query)
    .then(mode =>{
        res.status(200).json(mode)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({errorMessage:"server 404"})
    })
})

server.get('/api/posts/:id', (req,res)=>{ //Note To self by specifying the : field you can call the variable whatever you want.
    model.findById(req.params.id)
    //console.log(req.params) you cant put console logs before the .then apparently
    .then(mode=>{
        if(mode.length!=0){
            res.status(200).json(mode)
        }
        else{
            res.status(404).json({errorMessage:"post not found"})
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({errorMessage:"server 4049"})
    });
});

server.get('/api/posts/:id/comments', (req,res)=>{ //Note To self by specifying the : field you can call the variable whatever you want.
    model.findCommentById(req.params.id)
    //console.log(req.params) you cant put console logs before the .then apparently
    .then(mode=>{
        if(mode.length!=0){
            console.log(res.body)
            res.status(200).json(mode)
        }
        else{
            res.status(404).json({errorMessage:"post not found"})
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({errorMessage:"server 4049"})
    });
});

server.post("/api/posts",(req,res)=>{
    model.insert(req.body)
    
    .then(mode=>{
        res.status(201).json()
    })
    .catch(err=>{
       // console.log(err);
        res.status(400).json({errorMessage:"Please Provide Title and Contents"})
    });
})

server.post("/api/posts/:id/comments",(req,res)=>{
    model.insertComment(req.body)
    
    .then(mode=>{
        res.status(201).json()
    })
    .catch(err=>{
       // console.log(err);
        res.status(400).json({errorMessage:"Please Provide Title and Contents"})
    });
})

server.delete("/api/posts/:id",(req,res)=>{
   model.findById(req.params.id)
    

    .then(mode=>{
        model.remove(mode[0].id)
        .then(
            res.status(201).json(mode)
        )
        .catch(
            res.send({message:"nope"})
        )
        
        console.log(mode[0].id)
        res.status(201).json(mode)
    })
    .catch(error=>{
        res.status(404).json({errorMessage:"yep didnt work"})
    })
})

server.put("/api/posts/:id",(req,res)=>{
    model.update(req.params.id,req.body)
    
        //console.log(req.params) you cant put console logs before the .then apparently
        .then(mode=>{
            
             res.status(201).json(mode)

        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({errorMessage:"server 4049"})
        })
})



server.use('*',(req,res)=>{
    res.status(200).json({message:"Hello It LIVES"})
})
server.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})