require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
require('./config/db');


// Configure Helmet for security while allowing static files
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      // defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const heroRoutes = require('./routers/heroes.routes');
const constellationRoutes = require('./routers/constellation.routes');
const userRoutes = require('./routers/user.routes');
const adminHeroRoutes = require('./routers/adminHeroRoutes');

app.use('/api/heroes', heroRoutes);
app.use('/api/constellations', constellationRoutes);
app.use('/api/users', userRoutes);
app.use('/admin/heroes', adminHeroRoutes); 

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/inventory.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'inventory.html'));
});

app.get('/simulation.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'simulation.html'));
});

app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.get('/logout', (req, res) => {
  res.redirect('/');
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admininventory.html'));
});

app.get('/createhero.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'createhero.html'));
}); 



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));