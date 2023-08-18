var mysql = require ('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'geologin',
    user: 'root',
    password: 'Canarias.2023'
});

 connection.connect(function(error){
    if(error){
        throw error;
    }
    else{
        console.log("Conecion exitosa");
    }
 });

const getUsuarios = connection.query('SELECT * FROM users', function(error,results){
    if(error){
        throw error;
    }
    results.forEach(result => { 
       console.log(result); 
    });
});
