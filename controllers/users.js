const User = require('../models/users');

function create( req, res, next ) {

  console.log('running post method create user'); // method test!!
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.cellphone = req.body.cellphone;
  user.username = req.body.username;
  user.password =  req.body.password;

  console.log(user); // test of creation user

  user.save((err, userStored) => {
    if (err)
      return res.status(500).send({ message: `Error in storing the data [${err}]` }); // send response to error a user

    res.status(200).send({ message: 'usaurio creado' }); // send response to user
  });

}

function search(req, res) {

  console.log('running get method for start search');
  let username = req.params.username;
  console.log('------->' + username);
  User.findOne({ username: username }, (err, user) => {
    if (err)
      return res.status(500).send({ message: `Error making the request: [${err}]` });
    if (!user)
      return res.status(404).send({ data: 'user doesn\'t exist' });

    req.user = user
      res.status(200).send({
        result: user 
      });
  });

}

function retrieve(req, res) {
  User.find({ }, (err, users) => {
    if (err)
      return res.status(500).send({ message: `Error making the request: [${err}]` });
    if (!users)
      return res.status(404).send({ data: 'users doesn\'t exist' });

      res.status(200).send({
        result: users 
      });
  });
}

function update(req, res) {
  User.findById(req.params.id, (err, user) => {
       if (err)
       return res.status(500).send({ message: `error when finding the document db: [${err}]` });
       user.set({
         name : req.body.name, 
         cellphone : req.body.cellphone,
         password : req.body.password,
         email : req.body.email,
         username : req.body.username
        });
       user.save((err, userModified) => {
         if (err)
           return res.status(500).send({ message: `error when saving the location in the db: [${err}]` });
         res.status(200).send({ result: userModified });
       });
     });
}

function remove(req, res) {
  User.findByIdAndRemove({ _id : req.params.id }, (err) => {
      if (err)
        return res.status(500).send({ message: `error when finding the document db: [${err}]` });
      res.status(200).send({result: 'Usuario eliminado!'}); 
     });
}


module.exports = {
    create : create,
    search : search,
    retrieve: retrieve,
    update : update,
    remove : remove
}