const express = require('express');
const route = express.Router();
const controller = require('../controller/controller');

// render services 
const services = require('../services/render');


route.get('/', services.homeRoute); 

route.get('/adduser', services.addUser);

route.get('/updateuser', services.updateUser);

//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

module.exports = route;