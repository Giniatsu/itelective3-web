//creating a server
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    console.log(req.url);

    //Handling Response and File reader
    res.setHeader('Content-Type', 'text/html');
    //enabling access to multiple pages using routing responses
    let urll = './views/';
    if(req.url == '/'){
        urll += 'index.html';
        res.statusCode = 200;
    }else if(req.url == '/about'){
        urll += 'about.html';
        res.statusCode = 200;
    // Third party Package module(weatherjs)
    }else if(req.url == '/weather'){
        const weather = require('weather-js');
 
        // Options:
        // search:     location name or zipcode
        // degreeType: F or C
        
        weather.find({search: 'Davao City, PH', degreeType: 'C'}, function(err, result) {
        if(err) console.log(err);
        
        console.log(JSON.stringify(result, null, 2));
        });
        urll += 'weather.html';
    }else{
        urll += '404.html';
        res.statusCode = 404;
    }

    fs.readFile(urll, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        }else{
            res.end(data);
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('listening');
});