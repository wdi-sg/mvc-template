module.exports = (dbPoolInstance) => {
    var reduceByObj = function (list) {
        var newArray = [];
        for (let i = 0; i < list.length; i++) {
            let repeated = false;
            for (let j = i+1; j < list.length; j++) {
                if (list[i].img_id === list[j].img_id) {
                    repeated = true;
                    break;
                }
            }
            if (!repeated) {
                newArray.push(list[i]);
            }
        }
        return newArray;
    }

    var reduceByArray = function (list) {
        var newArray = [];
        for (let i = 0; i < list.length; i++) {
            let repeated = false;
            for (let j = i+1; j < list.length; j++) {
                if (list[i] === list[j]) {
                    repeated = true;
                    break;
                }
            }
            if (!repeated) {
                newArray.push(list[i]);
            }
        }
        return newArray;
    }

    return {
        getAllBlouse: (email, callback) => {
            let queryText = 'SELECT description,img_path,img_id FROM product WHERE type_of_product=$1';
            let values = ['blouse'];
            dbPoolInstance.query(queryText, values, (error, result)=> {
                let objArray = result.rows;
                objArray = reduceByObj(objArray);

                let img_idArray = [];
                for (let i = 0; i < objArray.length; i++) {
                    img_idArray.push(objArray[i].img_id);
                }
                img_idArray = img_idArray.sort((a, b) => a - b);

                let sortObjArray = [];
                for (let i = 0; i < img_idArray.length; i++) {
                    for(let j = 0; j < objArray.length; j++) {
                        if (objArray[j].img_id === img_idArray[i]) {
                            sortObjArray.push(objArray[j]);
                            break;
                        }
                    }
                }
                let obj = { "email": email,
                            "item": sortObjArray
                            }
                callback(error, obj);
            })
        },

        getABlouse: (email, img_id, callback)=> {
            let queryText = 'SELECT * FROM product WHERE type_of_product=$1 AND img_id=$2';
            let values = ['blouse', img_id];
            dbPoolInstance.query(queryText, values, (error, result)=> {
                result.rows;
                let item = new Object();
                let size = [];
                let color = [];
                item.description = result.rows[0].description;
                item.price = result.rows[0].price;
                item.available = result.rows[0].available;
                item.sold = result.rows[0].sold;
                item.img_id = result.rows[0].img_id;
                item.img_path = result.rows[0].img_path;
                item.date_created = result.rows[0].date_created;
                item.date_trans = result.rows[0].date_trans;
                for (i = 0; i < result.rows.length; i++) {
                    size.push(result.rows[i].size);
                    color.push(result.rows[i].color);
                }
                item.size = reduceByArray(size);
                item.color = reduceByArray(color);
                let obj = { "email" : email,
                            "item": item
                           }
                callback(error, obj);
            })
        }
    }
}