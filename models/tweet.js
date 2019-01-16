module.exports = (dbPoolInstance) => {

    return {
        get: (callback) => {
            let queryString = "SELECT * FROM users INNER JOIN tweets ON (tweets.user_id = users.id) WHERE users.id > 0";
            dbPoolInstance.query(queryString, (error, queryResult)=> {
                callback(error, queryResult);
            })
        },

        createForm: (userInfo, callback) => {
            let name = userInfo.name;
            let password = userInfo.password;
            const queryString = "SELECT id, password FROM users WHERE name=$1";
            const values = [name];

            dbPoolInstance.query(queryString, values, (error, queryResult)=> {
                let correctPassword = queryResult.rows[0].password;
                let id = queryResult.rows[0].id;
                let user;
                if (correctPassword === password) {
                    user = {"name": name,
                            "id": id};
                }

                else {
                    user = null;
                }

                callback(error, user);
            })
        },

        create: (tweet, id, callback) => {
            let content = tweet.content;
            const queryString = "INSERT INTO tweets (content, user_id) VALUES ($1, $2)";
            const values = [content, id];
            dbPoolInstance.query(queryString, values, (error, queryResult) => {
                callback(error);
            })
        }
    }
}