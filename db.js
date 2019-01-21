const pg = require('pg');
const product = require('./models/product');

const user = require('./models/user');

const user_cart = require('./models/user_cart');

const url = require('url');

var configs;

if( process.env.DATABASE_URL ){

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

}else{
  configs = {
    user: 'apple',
    host: '127.0.0.1',
    database: 'purpur',
    port: 5432
  };
}

const sha256 = require('js-sha256');

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

module.exports = {
  /*
   * ADD APP MODELS HERE
  */
  product: product(pool),

  user: user(pool),

  user_cart: user_cart(pool),

  // get a reference to end the connection pool at server end
  pool:pool

};