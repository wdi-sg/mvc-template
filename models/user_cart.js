module.exports =(dbPoolInstance) => {
    const sha256 = require('js-sha256');

    return {
        addToCart: (email, passwordHash, type_of_product, img_id, product, callback)=> {
            let sucessfulLogin = false;
            let enoughStock = false;
            let size = product.size;
            let color = product.color;
            let quantity = parseInt(product.quantity);

            let queryString = "SELECT password FROM users WHERE email=$1";
            let values = [email];
            dbPoolInstance.query(queryString, values, (error, queryResult)=> {
                let password = queryResult.rows[0].password;
                if (sha256(password) === passwordHash) {
                    sucessfulLogin = true;
                    let queryString = "SELECT * FROM product WHERE img_id=$1 AND color=$2 AND size=$3 AND type_of_product=$4";
                    let values = [parseInt(img_id), color, size, type_of_product];
                    dbPoolInstance.query(queryString, values, (error,queryResult)=> {
                        let product_id = queryResult.rows[0].id;
                        let available = queryResult.rows[0].available;
                        let product_num = quantity;
                        if (available > product_num || available === product_num) {
                            enoughStock = true;
                            let queryString = "INSERT INTO user_cart (user_email, product_id, product_num) VALUES ($1, $2, $3)";
                            let values = [email, product_id, product_num];
                            dbPoolInstance.query(queryString, values, (error, queryResult)=> {
                            });
                        }
                        callback(error, sucessfulLogin, enoughStock);
                    })
                }
                else {
                    callback(error, sucessfulLogin, enoughStock);
                }
            })
        },

        displayCart: (email, callback)=> {
            let queryString = "SELECT * FROM product INNER JOIN user_cart on (product.id = user_cart.product_id) WHERE user_cart.user_email=$1";
            let values = [email];
            let itemArray = [];
            dbPoolInstance.query(queryString, values, (error, queryResult)=> {
                for (let i = 0; i < queryResult.rows.length; i++) {
                    let objItem = {"img_path": queryResult.rows[i].img_path,
                                   "type": queryResult.rows[i].type_of_product,
                                   "price": queryResult.rows[i].price,
                                   "size": queryResult.rows[i].size,
                                   "color": queryResult.rows[i].color,
                                   "num": queryResult.rows[i].product_num
                                   }
                    itemArray.push(objItem);
                }
                let obj = { "email": email,
                            "item": itemArray
                           }
                callback(error, obj);
            })
        },

        updated: (email, passwordHash, callback)=> {
            let queryString = "SELECT password FROM users WHERE email=$1";
            let values = [email];
            dbPoolInstance.query(queryString, values, (error, queryResult)=> {
                let password = queryResult.rows[0].password;
                if (sha256(password) === passwordHash) {
                    let queryString = "SELECT * FROM product INNER JOIN user_cart on (product.id = user_cart.product_id) WHERE user_cart.user_email=$1";
                    let values = [email];
                    let itemArray = [];
                    dbPoolInstance.query(queryString, values, (error, queryResult)=> {
                        if (queryResult.rows.length > 0) {
                            let productArray = [];
                            for (let i = 0; i < queryResult.rows.length; i++) {
                                let obj = { "product_id": queryResult.rows[i]. product_id,
                                            "product_num": queryResult.rows[i]. product_num
                                           }
                                productArray.push(obj);
                            }
                            callback(error, true, productArray);
                        }
                        else {
                            callback(error, true, false);
                        }
                    })
                }
                else {
                    callback(error, false, false);
                }
            })
        }
    }
}