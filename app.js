require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
require('./config/db');

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const heroRoutes = require('./routers/heroes.routes');
const constellationRoutes = require('./routers/constellation.routes');
const userRoutes = require('./routers/user.routes');
const inventoryRoutes = require('./routers/inventoryRoutes');
const adminHeroRoutes = require('./routers/adminHeroRoutes');

app.use('/api/heroes', heroRoutes);
app.use('/api/constellations', constellationRoutes);
app.use('/api/users', userRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/admin/heroes', adminHeroRoutes);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/register', (req, res) => {
  res.render('register');
});
app.get('/inventory', (req, res) => {
  const inventory = [];
  try{
    res.render('inventory', { inventory });
  }catch(err){
    res.status(500).send(err.message);
  }
});

const Hero = require('./models/heroes.model');

app.get('/simulation', async (req, res) => {
    try {
      const heroes = await Hero.find();
      res.render('simulation', { heroes });
    } catch (error) {
      res.render('simulation', { heroes: [] });
    }
  });
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/logout', (req, res) => {
  localStorage.clear();
  res.redirect('/');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
