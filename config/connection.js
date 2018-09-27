const mongoose = require('mongoose');

mongoose.connect('mongodb://app:app1234@ds115963.mlab.com:15963/app', (err, res)=>{
    if(err) throw err;
    console.log('established connection');
});


module.exports = mongoose;