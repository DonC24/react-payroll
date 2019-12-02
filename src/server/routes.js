module.exports = (app, db) => {

    const users = require('./controllers/users')(db);

    app.post('/signup', users.signUp);
    app.post('/login', users.login);
    app.get('/signout', users.signOut);
    app.get('/get_user_info', users.getUserInfo);
    app.get('/get_all_users/:id', users.getAllUsers);
};