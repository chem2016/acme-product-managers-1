const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const User = conn.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    unique: true
  }
});
const Product = conn.define('product', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    unique: true
  }
});

Product.belongsTo(User, { as: 'manager' });


const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(()=> Promise.all([
      Promise.all([
        User.create({ name: 'moe' }),
        User.create({ name: 'larry' }),
        User.create({ name: 'curly' }),
      ]),
      Promise.all([
        Product.create({ name: 'foo'}),
        Product.create({ name: 'bar'}),
        Product.create({ name: 'bazz'}),
      ]),
    ]))
    .then(([[moe, larry, curly], [foo, bar, bazz]])=> {
      return Promise.all([
        foo.setManager(moe),
        bar.setManager(larry)
      ]);
    });
};

syncAndSeed();
const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', (req, res, next)=> {
  User.findAll()
    .then( users => res.send(users))
    .catch(next);
})

app.get('/api/products', (req, res, next)=> {
  Product.findAll({
    order: [['name']]
  })
    .then( products => res.send(products))
    .catch(next);
});

app.put('/api/products/:id', (req, res, next)=> {
  Product.findByPk(req.params.id)
    .then( product => product.update(req.body))
    .then( product => res.send(product))
    .catch(next);
});





app.listen(port, ()=> console.log(`listening on port ${port}`))
