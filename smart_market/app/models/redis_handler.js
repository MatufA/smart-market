require('dotenv').config()
var redis = require('redis');

var client = redis.createClient({
    port: process.env.REDIS_PORT, 
    host : process.env.REDIS_URL,
    no_ready_check: true,
    auth_pass: process.env.REDIS_PASSWORD                                                                                                                                                           
});

module.exports.addGroceries = (groceries) =>{
    client.on('connect', function() {
        console.log('connected');
    });
    
    client.on('error', err => {
        console.log(err.message)
        return new Error(err.message)
    });
    
    groceries.unshift('groceries') 
    client.sadd(groceries ,function(err, reply) {
        if (err) throw new Error(error)
        console.log(reply); // num of groceries.
        return reply;
    })
}

module.exports.getGroceries = async function(callback) {
    client.on('connect', function() {
        console.log('connected');
    });
    
    client.on('error', err => {       
        console.log(err.message)
        return new Error(err.message)
    });
    
    client.smembers('groceries', function(err, reply) {
        // if (err) throw new Error(err.message)
        console.log(reply);
        callback(reply);
    });
}
