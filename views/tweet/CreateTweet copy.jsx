var React = require("react");

class CreateTweet extends React.Component {
  render() {
    let message = `Welcome ${this.props.name} ${this.props.id} to create a tweet`;

    let urlAction = "/user/tweet/update";

    return (
      <html>
        <head />
        <body>
          <form className="user-form" method="POST" action={urlAction}>
            <h1>{message}</h1>
            <div className="user-attribute">
              <p>Content:</p>
              <textarea rows="8" cols="100" name="content" type="text"></textarea>
            </div>
            <div>
                <input name="submit"  type="submit" />
            </div>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = CreateTweet;