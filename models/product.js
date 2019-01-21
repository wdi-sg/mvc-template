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

    var getMax = function(Array) {
        let max = Array[0];
        for (let i=1; i<Array.length; i++) {
            if (Array[i] > max) {
                max = Array[i];
            }
        }
        return [max];
    }

    return {
        getAllBlouse: (email, callback) => {
            let queryText = 'SELECT description, price, img_path,img_id FROM product WHERE type_of_product=$1';
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
                size = reduceByArray(size);
                listOfSize = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];
                sortSize = [];
                for(let i=0; i<listOfSize.length; i++) {
                    for(let j=0; j<size.length; j++) {
                        if(listOfSize[i] === size[j]) {
                            sortSize.push(listOfSize[i]);
                            break;
                        }
                    }
                }
                item.size = sortSize;
                item.color = reduceByArray(color);
                let obj = { "email" : email,
                            "item": item
                           }
                callback(error, obj);
            })
        },

        blouseByPrice: (email, callback) => {
            let queryText = 'SELECT description,img_path,img_id,price FROM product WHERE type_of_product=$1';
            let values = ['blouse'];
            dbPoolInstance.query(queryText, values, (error, result)=> {
                let objItem = result.rows;
                objItem = reduceByObj(objItem);
                for (let i=0; i<objItem.length-1; i++) {
                    let minPrice = Number(objItem[i].price);
                    let index = i;
                    for (let j=i+1; j<objItem.length; j++) {
                        if (Number(objItem[j].price) < minPrice) {
                            minPrice = Number(objItem[j].price);
                            index = j;
                        }
                    }
                    if (i !== index) {
                        let tempObj = objItem[i];
                        objItem[i] = objItem[index];
                        objItem[index] = tempObj;
                    }
                }
                let obj = { "email" : email,
                            "item": objItem
                           }
                callback(error, obj);
            })
        },

        blouseByPopularity: (email, callback) => {
            let queryText = 'SELECT description,img_path,img_id,price,date_created FROM product WHERE type_of_product=$1';
            let values = ['blouse'];
            dbPoolInstance.query(queryText, values, (error, queryResult)=> {
                let objItem = queryResult.rows;
                objItem = reduceByObj(objItem);
                let queryText = 'SELECT img_id,sold FROM product WHERE type_of_product=$1';
                let values = ['blouse'];
                dbPoolInstance.query(queryText, values, (error, queryResult)=> {
                    let objComplete = queryResult.rows;
                    for (let i=0; i<objItem.length; i++) {
                        objItem[i].sold = 0;
                        for (let j=0; j<objComplete.length; j++) {
                            if (objItem[i].img_id === objComplete[j].img_id) {
                                objItem[i].sold = objItem[i].sold + objComplete[j].sold;
                            }
                        }
                        if (objItem[i].sold > 0) {
                            let duration = (new Date() - Date.parse(objItem[i].date_created))/3600000;
                            objItem[i].popularity = objItem[i].sold / duration * 24;
                        }
                        else {
                            objItem[i].popularity = 0;
                        }
                    }
                    for (let i=0; i<objItem.length-1; i++) {
                        let maxPopularity = objItem[i].popularity;
                        let index = i;
                        for (let j=i+1; j<objItem.length; j++) {
                            if (objItem[j].popularity > maxPopularity) {
                                maxPopularity = objItem[j].popularity;
                                index = j;
                            }
                        }
                        if (i !== index) {
                            let tempObj = objItem[i];
                            objItem[i] = objItem[index];
                            objItem[index] = tempObj;
                        }
                    }
                    let obj = { "email" : email,
                               "item": objItem
                             }
                    callback(error, obj);
                })
            })
        },
    }
}