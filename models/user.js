module.exports = (dbPoolInstance) => {
    return {
        create: (userInfo, callback) => {
            const queryText ='SELECT name from users WHERE id > 0';
            let nameFound = false;
            let user = null;

            dbPoolInstance.query(queryText, (error, result) => {
                for (let i = 0; i < result.rows.length; i++ ) {
                    if (result.rows[i].name === userInfo.name) {
                        nameFound = true;
                        break;
                    }
                }
                if (!nameFound) {
                    const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2)';
                    const values = [
                    userInfo.name,
                    userInfo.password
                    ];

                    user = { name: userInfo.name,     password: userInfo.password
                           }

                    dbPoolInstance.query(queryString, values, (error, queryResult) => {
                    });
                }

                callback(error, user);
            })
        }
    }
}