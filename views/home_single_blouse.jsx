var React = require("react");

class Home extends React.Component {
    render() {
    let loginMessage;
    if (this.props.email === undefined) {
        loginMessage = "Login";
    }
    else {
        loginMessage = this.props.email;
    }
    let imagePath = this.props.item.img_path;
    let urlAction = `/addToCart/blouse/${this.props.item.img_id}`;
    let itemsSize = this.props.item.size.map((item, index)=> {
        return <option key={index} value={item}> {item} </option>;
    })
    let itemsColor = this.props.item.color.map((item, index)=> {
        return <option key={index} value={item}> {item} </option>;
    })

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
            <link rel="stylesheet" type="text/css" href="/css/single_blouse.css"/>
        </head>
        <body>
            <div className="container">
                 <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        <h1>Purpur Boutique</h1>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-d-auto">
                        <a href="/login">{loginMessage}</a> <a href="">Logout</a> <a href="/mycart">My Cart</a> <a href="/signup">Sign Up</a>
                    </div>
                </div>
                <div className="p-3 mb-2 bg-light text-dark">
                    <div className="row">
                        <div className="col-3">
                            <img src={imagePath}/>
                        </div>
                        <div className="col-9">
                            {this.props.item.description}
                            <h2> {`SGD${this.props.item.price}`}</h2>
                            <form action={urlAction} method="POST">
                                <div className="requestGr">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Size</label>
                                        </div>
                                        <select name="size" className="custom-select" id="inputGroupSelect01">
                                            <option selected>Choose...</option>
                                            {itemsSize}
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Color</label>
                                        </div>
                                        <select name="color" className="custom-select" id="inputGroupSelect01">
                                        <option selected>Choose...</option>
                                        {itemsColor}
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Quantity</label>
                                        </div>
                                        <select name="quantity" className="custom-select" id="inputGroupSelect01">
                                            <option selected>Choose...</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="3">4</option>
                                            <option value="3">5</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="submitGr">
                                    <button type="submit" className="btn btn-primary">Add to cart</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-md-center" id="footer">
                    <div className="col-md-auto">
                        <h6> Customer Care </h6>
                        <a href=""> Delivery </a>  <a href=""> Product Policy </a> <a href=""> Contact us </a> <a href=""> How to return </a>
                    </div>
                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = Home;