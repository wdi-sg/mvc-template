var React = require("react");

class ListItem extends React.Component {
    render() {
        let type = `Type: ${this.props.item.type}`;
        let price = `Price: SGD${this.props.item.price}`;
        let size = `Size: ${this.props.item.size}`;
        let color = `Color: ${this.props.item.color}`;
        let num = `Num of pieces: ${this.props.item.num}`;
        return (
            <div className="box">
            <img src={this.props.item.img_path}/>
            <h6>{type}</h6>
            <h6>{price}</h6>
            <h6>{size}</h6>
            <h6>{color}</h6>
            <h6>{num}</h6>
            </div>
        );
    }
}

class Home extends React.Component {
    render() {
        let loginMessage;
        if (this.props.email===undefined) {
            loginMessage = "Login"
        }
        else {
            loginMessage = this.props.email;
        }
        function createDiv(item, index) {
            return <ListItem key={index} item={item}> </ListItem>;
        }
        let itemsElement = this.props.item.map(createDiv);

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
            <link rel="stylesheet" href="/css/home_blouse_styles.css"/>
        </head>
        <body>
            <div className="container">
                 <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        <h1>Purpur Boutique</h1>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        <h1>My Cart</h1>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-d-auto">
                        <a href="/login">{loginMessage}</a> <a href="">Logout</a> <a href="/mycart">My Cart</a> <a href="/signup">Sign Up</a>
                    </div>
                </div>
                <div className="row" id="content">
                    <div className="col-2">
                        <h6> Search By </h6>
                        <div><a className="nav" href="/blouse"> Blouses </a></div>
                        <div><a className="nav" href=""> T-shirts </a></div>
                        <div><a className="nav" href=""> Pants </a></div>
                        <div><a className="nav" href=""> Skirts </a></div>
                        <div><a className="nav" href=""> Dresses </a></div>
                    </div>
                    <div className="col-10">
                        <div>
                            {itemsElement}
                        </div>
                        <form action="/payment/?_method=put" method="POST">
                            <br/>
                            <button type="submit" className="btn btn-primary">Proceed With Payment</button>
                        </form>
                        <br/>
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