module.exports = (app, db) => {

    const tweets = require('./controllers/tweet')(db);

    const users = require('./controllers/user')(db)


  /*
   *  =========================================
   *  Routes for one controller
   *  =========================================
   */
   app.get('/', tweets.get);

   app.get('/users/new', users.createForm);

   app.post('/users',users.create);

   app.get('/user/login', users.login);

   app.post('/user/tweet', tweets.createForm);

   app.post('/user/tweet/update', tweets.create);
};