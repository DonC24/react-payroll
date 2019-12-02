module.exports = (app, db) => {

    const users = require('./controllers/users')(db);
    const contracts = require('./controllers/contracts')(db);
    const payroll = require('./controllers/payroll')(db);

    app.post('/signup', users.signUp);
    app.post('/login', users.login);
    app.get('/signout', users.signOut);
    app.get('/get_user_info', users.getUserInfo);
    app.get('/get_all_users/:id', users.getAllUsers);

    app.post('/contract', contracts.createContract);
};