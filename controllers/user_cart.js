module.exports = (db) => {
     /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
    const addToCart = (request, response) => {
        if (request.cookies['email'] === undefined || request.cookies['email'] === 'j:null') {
            response.render("home_login", {"email": request.cookies['email']});
        }
        else {
            db.user_cart.addToCart(request.cookies['email'], request.cookies['passwordHash'], request.params.type_of_product, request.params.img_id, request.body, (error, successfulLogin, enoughStock ) => {
                    if (error) {
                        response.send(error);
                    }
                    else {
                        if (!successfulLogin) {
                            response.send("Please login through proper channel");
                        }
                        else {
                            response.render("home", {"email": request.cookies['email']});
                        }
                    }
            });
        }
   }

    const displayCart = (request, response)=> {
        db.user_cart.displayCart(request.cookies['email'], (error, obj)=> {
            if(error) {
                response.send(error);
            }
            else {
                response.render("mycart", obj);
            }
        })
   }

    const updated = (request, response)=> {
        db.user_cart.updated(request.cookies['email'], request.cookies['passwordHash'], (error, sucessfulLogin, successfulPayment)=> {
            if (error) {
                response.send(error);
            }
            else {
                if (!sucessfulLogin) {
                    response.send("Please login through proper channel.");
                }
                else {
                    if (!successfulPayment) {
                        response.render("home", {"email": request.cookies['email']});
                    }
                    else {
                        response.render("successful_payment", {"email": request.cookies['email']});
                    }
                }
            }
        })
    }

    const cancelpayment =(request, response)=> {
        if (request.cookies['email'] === undefined || request.cookies['email'] === 'j:null') {
            response.render("home_login");
        }

        else {
            db.user_cart.cancelpayment(request.cookies['email'], (error)=> {
                if (error) {
                    response.send(error);
                }
                else {
                    response.render("home", {"email": request.cookies['email']});
                }
            })
        }
    }

    return {
        addToCart,
        displayCart,
        updated,
        cancelpayment
    };
}