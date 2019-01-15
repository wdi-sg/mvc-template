module.exports = (dbPoolInstance) => {

    return {
        get: (callback) => {
            let queryString = "SELECT * FROM users INNER JOIN tweets ON (tweets.user_id = users.id) WHERE users.id > 0";
            dbPoolInstance.query(queryString, (error, queryResult)=> {
                callback(error, queryResult);
            })
        }
    }
}