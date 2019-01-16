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
        db.user.create(request.body, (error, user)=> {
            if (error) {
                response.send("error");
            }
            else {
                if (user===null) {
                    response.send("User name has already been used. Please choose another name.");
                }

                else {
                    response.send('user created');
                }
            }
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