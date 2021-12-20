const Userdb = require('../model/model');

//create and save new users
exports.create = (req,res) => {
    //validating request
    if(!req.body){
        res.status(400).send({message: "Content cannot be blank"});
        return;
    }

    //new user 
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    //save user in database
    user.save(user).then(data => {
        //res.send(data);
        res.redirect('/');
    }).catch(err => {
        res.status(500).send({message: err.message || "Some error occurred while creating a create operation."});
    });



}

//find and retrieve all users and a sinngle user
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id).then(data => {
            if(!data){
                res.status(404).send({message: "User cannot be found of id " + id + "Maybe it doesn't exist"});
            }else{
                res.send(data);
                //res.redirect('/');
            }
        }).catch(err => {
            res.status(500).send({message: err.message || "Error in finding user with id " + id});
        })

    }else{
        Userdb.find().then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while getting user information."})
        })
    }

}

// update a user with specified user id 
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({message: "Data update cannot be empty."});
    }

    const id = req.params.id;

    Userdb.findByIdAndUpdate(id, req.body,{ useFindAndModify: false }).then(data => {
        if(!data){
            res.status(400).send({message: `Cannot Update a user with id ${id}.Maybe we can't find the id.`});
        }else{
            res.send(data);
        }
    }).catch(err => {
      res.status(500).send({message: "Error update user information."})      
    })
}

//delete user with specified user id
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id).then(data => {
        if(!data){
            res.status(404).send({message: `Could not delete record with id ${id}. Maybe we can't find it.`});
        }else{
            res.send({message: `Successfully deleted record with id ${id}`});
        }
    }).catch(err => {
        res.status(500).send({message: err.message || "Error occurred while deleting the record."})
    })

}