const express = require ('express');
const morgan = require ('morgan');
const mongoose = require('mongoose');
const { render } = require('express/lib/response');
const res = require('express/lib/response');
const blogRoutes = require('./routes/blogRoutes')


//express app
const app = express();

//connect to mongodb
const dbURI = "mongodb+srv://ninja:test123@nodetuts.5rqfi.mongodb.net/note-tuts?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) =>  console.log(err));

//register view engine
app.set('view engine', 'ejs');

//listen for rquests
//app.listen(3000); //return instanc e of server

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

/*app.use((req, res, next) => {
    console.log('New Request Made ');
    console.log(' host: ', req.hostname);
    console.log(' path: ', req.path);
    console.log(' method: ', req.method);
    next();
});
*/

//routes
app.get('/', (req, res)=>{
   /* const blogs = [
        {title: 'Find eggs', snippet: 'this is for find eggs  blog '},
        {title: 'Mario finds stars', snippet: 'this is for mario finds stars blog'},
        {title: 'How to defeat browser', snippet:'this is blog'}
    ];

    res.render('index', {title: 'Home', blogs});
*/
    res.redirect('/blogs');
});

app.get('/about', (req, res)=>{
 res.render('about', {title: 'About'});
});

//blog routes
app.use('/blogs',blogRoutes);

//redirect
app.get('/about-us', (req, res)=>{
    res.redirect('/about');
  });


//404 page
app.use((req, res) => {
   res.status(404).render('404', {title: '404'});
});
