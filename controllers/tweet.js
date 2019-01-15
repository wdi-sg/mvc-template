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


    return {
        get
    }
}