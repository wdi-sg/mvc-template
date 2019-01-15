module.exports = (db) => {
    /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
   const createForm = (request, response) => {
    // use user model method `createForm` to create form for new user
        response.render('user/newuser');
   }

   const create = (request, response) => {
        db.user.create(request.body, (error, queryResult)=> {
        response.send("User created");
        })
    }

    const login = (request, response) => {

        response.render('user/login');
    }

   return {
        createForm,
        create,
        login
   };
}