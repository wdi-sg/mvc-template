module.exports = (db) => {
    /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
   const login = (request, response)=> {
        response.render("home_login", {"email": request.cookies['email']});
   }

   const checkUser = (request, response)=> {
        db.user.checkUser(request.body, (error, user)=> {
            if(error) {
                response.send(error);
            }
            else {
                if (user === null) {
                    response.send("User email has already been used.");
                }
                else {
                    response.render("home_prompt_login", {"email": request.cookies['email']});
                }
            }
        });
   }

   const checkLogin = (request, response)=> {
        db.user.checkLogin(request.body, (error, user)=> {
            if (error) {
                response.send("error");
            }
            else {
                if(user === null) {
                    response.send("Incorrect password or email");
                }
                else {
                    response.cookie("email", user.email);
                    response.cookie("passwordHash", user.passwordHash);
                    response.render("home", {"email": request.cookies['email']});
                }
            }
        })
   }

   const signup = (request, response)=> {
        response.render("home_signup");
   }

   return {
        login,
        checkUser,
        signup,
        checkLogin
   };
}