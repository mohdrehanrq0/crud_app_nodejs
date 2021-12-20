const axios = require('axios');


exports.homeRoute = (req, res, next) => {
    axios.get("https://mrq-crud-node.herokuapp.com/api/users").then((response) =>{
        // console.log(response);
        res.render('index',{data: response.data});
    }).catch((err) =>{
        res.status(500).send(err.message);
    });
    
}

exports.addUser = (req, res, next) => {
    res.render('add_user');
}

exports.updateUser = (req, res, next) => {
    axios.get("https://mrq-crud-node.herokuapp.com/api/users", {params: {id: req.query.id}}).then((response) => {
        res.render('update_user',{user: response.data});
    }).catch((err) => {
        res.send(err.message);
    })
    
}