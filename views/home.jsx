var React = require("react");

class ListItem extends React.Component {

    render() {
        let heading = `${this.props.item.name},  ${this.props.item.date_col.toString().substring(0, 15)}`;
        return (
          <div className="tweet">
            <p> {heading} </p>
            <p> {this.props.item.content} </p>
          </div>
        );
    }
}

class Home extends React.Component {
    render() {

    function createDiv(item, index) {
        return <ListItem key={index} item={item}> </ListItem>;
    }

    let listOfTweets = this.props.tweets.map(createDiv)

    return (
      <html>
        <head />
        <body>
        <div className="header">
            <a href="/user/login">Login</a>
            <a href="/users/new">Register</a>
        </div>
        <div className="content">
            {listOfTweets}
        </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;