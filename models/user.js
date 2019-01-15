module.exports = (dbPoolInstance) => {
    return {
        create: (user, callback) => {
            const queryString ='INSERT INTO users (name, password) VALUES ($1, $2)';

            const values = [
            user.name,
            user.password
            ];

             dbPoolInstance.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        }
    }
}