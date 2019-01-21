module.exports =(dbPoolInstance) => {
    const sha256 = require('js-sha256');

    return {
        addToCart: (email, passwordHash, type_of_product, img_id, product, callback)=> {
            let size = product.size;
            let color = product.color;
            let quantity = parseInt(product.quantity);
            let queryString = "SELECT password FROM users WHERE email=$1";
            let values = [email];
            dbPoolInstance.query(queryString, values, (error, queryResult)=> {
                let password = queryResult.rows[0].password;
                if (sha256(password) === passwordHash) {
                    let queryString ="SELECT * FROM product WHERE img_id=$1 AND color=$2 AND size=$3 AND type_of_product=$4"
                    let values = [parseInt(img_id), color, size, type_of_product];
                    dbPoolInstance.query(queryString, values, (error, queryResult)=> {
                        let product_id = queryResult.rows[0].id;
                        let available = queryResult.rows[0].available;

                        let queryString = "SELECT * FROM user_cart INNER JOIN product ON (user_cart.product_id = product.id) WHERE product.id=$1";
                        let values = [product_id];
                        dbPoolInstance.query(queryString, values, (error,queryResult)=> {
                            let numInOtherCart = 0;
                            for (let i = 0; i < queryResult.rows.length; i++) {
                                numInOtherCart = numInOtherCart + queryResult.rows[i].product_num;
                            }
                            if ((available >(numInOtherCart+quantity))|| (available =(numInOtherCart+quantity))) {
                                let queryString = "INSERT INTO user_cart (user_email, product_id, product_num) VALUES ($1, $2, $3)";
                                let values = [email, product_id, quantity];
                                dbPoolInstance.query(queryString, values, (error, queryResult)=> {
                                });
                                callback(error, true, true);
                            }
                            else {
                                callback(error, true, false);
                            }
                        })
                    })
                }
                else {
                    callback(error, false, false);
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
                    let queryString = "SELECT * FROM user_cart INNER JOIN product ON (user_cart.product_id = product.id) WHERE user_cart.user_email=$1";
                    let values = [email];
                    let itemInCartArray = [];
                    dbPoolInstance.query(queryString, values, (error, queryResult)=> {
                        if (queryResult.rows.length > 0) {
                            for (let i=0; i<queryResult.rows.length; i++) {
                                let objItem = {"product_id": queryResult.rows[i].product_id,
                                               "product_num": queryResult.rows[i].product_num,
                                               "available": queryResult.rows[i].available
                                               };
                                itemInCartArray.push(objItem);
                            }
                            for (let i=0; i<itemInCartArray.length; i++) {
                                let queryString = "UPDATE product SET available=$1, date_trans=$2, sold=$3 WHERE id=$4";
                                const values = [(itemInCartArray[i].available-itemInCartArray[i].product_num), new Date(), itemInCartArray[i].product_num, itemInCartArray[i].product_id];
                                dbPoolInstance.query(queryString, values, (error, queryResult)=> {
                                })
                            }
                            let queryString = "DELETE FROM user_cart WHERE user_email=$1";
                            let values = [email];
                            dbPoolInstance.query(queryString, values, (error, queryResult)=> {
                            })
                            callback(error, true, true);
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
        },

        cancelpayment: (email, callback)=> {
            let queryString = "DELETE FROM user_cart WHERE user_email=$1";
            let values = [email];
            dbPoolInstance.query(queryString, values, (error, queryResult)=> {
                callback(error);
            })
        }
    }
}