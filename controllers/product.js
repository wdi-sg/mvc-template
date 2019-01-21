module.exports = (db) => {
    /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
    const get = (request, response) => {
        response.render("home", {"email": request.cookies['email']});
    }

    const getAllBlouse = (request, response)=> {
        db.product.getAllBlouse(request.cookies['email'], (error,obj)=> {
            response.render("home_blouse", obj);
        })
    }

    const getABlouse = (request, response)=> {
        let img_id = request.params.img_id;
        let email = request.cookies['email'];
        db.product.getABlouse(email, img_id, (error,obj)=> {
            response.render("home_single_blouse", obj);
        })
    }

    const blouseByPrice = (request, response)=> {
        db.product.blouseByPrice(request.cookies['email'], (error,obj)=> {
            response.render("home_blouse", obj);
        })
    }

    const blouseByPopularity = (request, response)=> {
        db.product.blouseByPopularity(request.cookies['email'], (error, obj)=> {
            response.render("blouse_popular", obj);
        })
    }

    return {
        get,
        getAllBlouse,
        getABlouse,
        blouseByPrice,
        blouseByPopularity
    }
}