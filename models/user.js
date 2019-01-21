module.exports = (dbPoolInstance) => {
    const sha256 = require('js-sha256');

    return {
        checkUser: (userInfo, callback)=> {
            let user = null;
            let repeatedEmail = false;
            let email = userInfo.email;
            let password = userInfo.password;
            let queryString = "SELECT email FROM users WHERE id > 0";
            dbPoolInstance.query(queryString, (error, queryResult) => {
                for(let i = 0; i < queryResult.rows.length; i++){
                    if (queryResult.rows[i].email === email) {
                        repeatedEmail = true;
                        break;
                    }
                }
                if (!repeatedEmail) {
                    let queryString = "INSERT INTO users (email, password) VALUES ($1, $2)";
                    let values = [email, password];
                    dbPoolInstance.query(queryString, values, (error,queryResult) => {
                    })
                    user = {"email": email,
                            "password": password
                            };
                }
                callback(error, user);
            })
        },

        checkLogin: (userInfo, callback)=> {
            let user = null;
            let email = userInfo.email;
            let password = userInfo.password;
            let queryString = "SELECT * FROM users WHERE id>0";
            dbPoolInstance.query(queryString, (error,queryResult) => {
                for (let i = 0; i < queryResult.rows.length; i++) {
                    if (queryResult.rows[i].email === email) {
                        if (queryResult.rows[i].password === password) {
                            user = {"email": email,
                                    "passwordHash": sha256(password)
                                    }
                        }
                        break;
                    }
                }
                callback(error, user);
            })
        }
    }
}