var React = require("react");


class Home extends React.Component {
    render() {

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
            <link rel="stylesheet" href="css/home_styles.css"/>
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
                        <a href="/login">Login</a> <a href="">Logout</a> <a href="/mycart">My Cart</a> <a href="/signup">Sign Up</a>
                    </div>
                </div>
                <div className="p-3 mb-2 bg-light text-dark">
                    <div className="row justify-content-md-center">
                        <div className="col-d-auto">
                            <h3> You have registered successfully. Please login! </h3>
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
        </body>
      </html>
    );
  }
}

module.exports = Home;