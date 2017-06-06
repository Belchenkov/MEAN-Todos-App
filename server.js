const expess = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const todos = require('./routes/todos');

const app = expess();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index);
app.use('/api/v1/', todos);


// Run Server
app.listen(3000, () => {
    console.log('Server Started on port localhost:3000');
});