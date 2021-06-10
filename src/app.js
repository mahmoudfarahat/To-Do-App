//instaled packages
 
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const  fetch = require('node-fetch')
 //custom vars
const PORT = 3000
//creat instance from express
const app = express()
//set default engine for dynamic html files
app.set('view engine', 'hbs')
//get public and views and partials paths
const pubicDir = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname,'../frontEnd/views')
const partialDir = path.join(__dirname,'../frontEnd/partials')
//set use if public and views and partials paths
app.use(express.static(pubicDir)) // ملفات ثابتة
app.set('views', viewsDir) // غيرلي المكان بتاع فيوس وخلي فيوسدير
hbs.registerPartials(partialDir) // اعملي الحجات المتكررة باسم الفولدر دا 
const tasks = []  
//routes
app.get('',(req,res)=>{
    res.render('home',{
        pageName: 'home',
        userName:'Mahmoud Farahat'
    })
}) 
app.get('/allPro', async (req,res)=>{ //  اي ابي اي بيطلع بروميس ومحتاج مننا اويت أو زين 
    try{
        fData = await fetch('https://jsonplaceholder.typicode.com/posts')
        posts=await fData.json()
        res.render('allPro',{
            posts: posts
        })
    }
    catch(e){ 
        res.redirect('404')
    }
})
app.get('/allPro/:id', async(req,res)=>{
    id=req.params.id
    try{
        fData = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        post =await fData.json()
        res.render('singlePost',{
            post: post
        })
    }
    catch(e){
        res.redirect('404')
    }
})

   






app.get('/addTask',(req,res)=>{
    if (req.query.id && req.query.title){
        task = {
            id: req.query.id,
            title: req.query.title,
            status:'false'
        }
        tasks.push(task)
        res.redirect('/allTasks')// انتقلت للروت دا 
    }
       res.render('addTask')
      
   }) 
app.get('/allTasks',(req,res)=>{ 
    res.render('allTasks',{ 
        pageName: 'all Tasks' ,
        tasks:tasks 
        
    }) 
})    
app.get('/allTasks/:id',(req,res)=>{    //   بحط : لما يكون معايا حاجة متغيرة 
    const id = req.params.id  // بقره من فوق 
    res.render('singleTask',{
        pageName: 'single Task' ,
        task: tasks[id],
        taskId:id
        
    })     
    
}) 
    
app.get('/deleteCustomer/:id',(req,res)=>{ 
    const id = req.params.id  
    
    tasks.splice(id,1)
    
    
    res.redirect('/allTasks')
   
      
})     

 app.get('*',(req,res)=>{     //* يعني أي حاجة عندي  
    res.render('404',{          // مينفعش احط اي راوت بعد الراوت دا 
        pageName: '404'
    })     
})  

 
 
 
 

app.listen(PORT) 