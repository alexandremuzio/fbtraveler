var app = require('express')();
var http = require('http').Server(app);
var verbose  = false;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.get( '/*' , function( req, res, next ) {

        //This is the current file they have requested
    var file = req.params[0];

        //For debugging, we can track what files are requested.
    if(verbose) console.log('\t :: Express :: file requested : ' + file);

        //Send the requesting client the file.
    res.sendFile( __dirname + '/' + file );

}); //app.get *

http.listen(3000, function(){
  console.log('listening on *:3000');
});