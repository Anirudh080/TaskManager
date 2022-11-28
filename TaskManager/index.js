const e = require('express');
const express = require('express');
const port = 8000;
const db = require('./config/mongoose');
const  Task  = require('./models/task');

const app = express();


app.use(express.static("./views"));
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', function(req, res){
    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            tittle: "Home",
            task: task
        });
    }
)});



app.post('/create-task', function(req, res){
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
        }, function(err, newtask){
        if(err){console.log('error in creating task', err); return;}
        

        return res.redirect('back');

    });
});
// app.get("/edit/:id",(req,res,next)=>{
//     // console.log(req.params.id);
//     Task.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,docs)=>{
//         if(err){
//             console.log("cant retireve data")
//             next(err);
//         }else{
//             res.render('edit',{Task:docs});
//         }
//     });
// });

// app.post('/edit/:id',(req,res,next)=>{
//     Task.findByIdAndUpdate({_id: req.params.id}, req.body ,{new:true}, (err,docs)=>{
//         if(err){
//             console.log("something is wrong with your data");
//             next(err);
            
//         }
//         else{
//             console.log(req.body);
//             res.redirect('/');
//         }
//     })
// })
app.get("/update",function(req,res){
    res.render("update");
})
app.post("/update",function(req,res){
    const prevData=req.body.prevTask;
    const updateData=req.body.updateTask;

Task.findOneAndUpdate(
        {description:prevData},
        {description:updateData},
        function(err){
            if(!err){
                console.log("update sucesfully");
                res.redirect("/")
            }
        }
    )
});

app.get('/delete-task', function(req, res){
    var id = req.query;

    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
 
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting task');
            }
        })
    }
    return res.redirect('back'); 
});

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});