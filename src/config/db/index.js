const mongoose = require('mongoose');

async function connect() { 
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/blog_education',  {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connect successfully');
    } catch (e) {
        console.log('Error connecting');
    }
}

module.exports = {connect};