module.exports = (db) => {
    /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
    const get = (request, response) => {
        // use tweet model method `get` to get all tweet entry in db
        db.tweet.get((error, queryResult) =>{
            if(error) {
                console.log('error getting tweet:', error);
                response.sendStatus(500);
            }
            else {
                let obj = {"tweets": queryResult.rows};
                response.render("home", obj);
            }
        })
    }

    const createForm = (request, response)=> {
        db.tweet.createForm(request.body, (error, user) => {
            if (error) {
                response.send("error");
            }

            else {
                if (user === null) {
                    response.send("incorrect password")
                }

                else {
                    response.cookie("id", user.id);
                    response.render('tweet/createtweet', user);
                }
            }
        })
    }

    const create = (request, response)=> {
        db.tweet.create(request.body, request.cookies["id"], (error)=> {
            if (error) {
                response.send("error");
            }

            else {
                response.send(request.body);
            }
        })
    }

    return {
        get,
        createForm,
        create
    }
}