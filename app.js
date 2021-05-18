// Import express, database connection,
const express =         require('express');
const app =             express();
const bodyParser =      require('body-parser');
app.use(express.json());

// cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


// ROUTES------------------------------------------------------------
// users routes
const router = require('./routes/auth');
const routerOps = require('./routes/userOperations');

// posts routes
const routerPosts = require('./routes/postsRoutes');



// ENDPOINTS------------------------------------------------------------
// user routes
app.use('/api', router);                //signup and login
app.use('/api', routerOps);             //user operations
app.use('/api', routerOps);             //modify an user

// posts routes
app.use('/api', routerPosts);           //posts routers




module.exports = app;