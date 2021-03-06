const express = require('express')
const port = process.env.PORT || 8081

  const { db } = require('./database');
  let cors = require('cors');
  const dotenv = require('dotenv')
  const app = express();

  app.use(express.json())
  app.use(cors());
  dotenv.config();
  
// validating function for post method
  function isValid( req , res  , next ){
  
      if( req.body.name === "" || req.body.caption === "" || req.body.url === "" ) 
          return res.status(400).end(); // bad request..
  
        db.find( req.body , (err , docs ) => {

            if( docs.exists ) return res.status(409).end(); // data already exists!
            return next();
        });
  };

//get method to retrive first 100 meme's instances 
  app.get( '/memes' , (req , res ) => {
        
        var data = [];
        db.find( {} , (err , docs ) =>{
            
            if( err ) return res.status(500).end();

            if( docs.length === 0 ) return res.status(200).send([]);

            docs.forEach( element => {
                              data.push({
                                  name: element.name,
                                  caption: element.caption,
                                  url: element.url });
                            });

            // returning first 100 instance of data in revese sorted order
            res.send(data.reverse().slice( 0 , 100 ));
         });

  });

  // get method retrive first 100 meme's id in sorted order  
  app.get('/memes/ids' , (req , res ) => {
        
        var data = [];
        db.find( {} , (err , docs) => { 

            if( err ) return res.status(500).end();

            else if( docs.length  === 0 ) return res.status(200).send([]);

            docs.forEach( element => { data.push(element._id); });

            return res.status(200).send(data.reverse().slice(0,100));
        });

  });
  
// post method to insert valid data into DB
  app.post('/memes' , isValid , ( req , res ) => {
    
    var unq_id = Date.now();
    
    var data = { "name" : `${req.body.name}` , "caption" : `${req.body.caption}` , "url" : `${req.body.url}` , "_id" : `${unq_id}` };
    
    db.insert( data , ( err ) => { 

        if( err ) res.status(500).end();

        else res.status(201).send(`${unq_id}`); // insertion successfull!

    });

  });

 // get specific meme instance using its id 
  app.get('/memes/:id' , (req , res ) => {
        
        db.findOne( { _id : `${req.params.id}` } , (err , docs ) => { 
            
            if( err ) return res.status(500).end();
            
            if( docs === null ) return res.status(404).end(); // meme not found!

            delete docs._id; 
            return res.status(200).send( docs ); // got specified meme instance
        });
  });
  
// path method to update caption/url or both of specific meme   
  app.patch( '/memes/:id' , (req , res ) => { 

      const memeId = parseInt(req.params.id);

      if( 'name' in req.body ) 
          res.status(400).end(); // invalid request 
      
      db.findOne( { _id : `${memeId}` } , ( err , docs ) => { 

        if( docs === null ) return res.status(404).end(); // data not found
        
        var newUrl = docs.url , newCaption = docs.caption;

        if( 'url' in req.body ) newUrl = req.body.url;
        
        if( 'caption' in  req.body ) newCaption = req.body.caption;

        var updatedData = { name : docs.name  , caption : newCaption , url : newUrl }; 
        
        db.update( { _id : `${memeId}`} ,  updatedData , {}, (err , numAffected ) => { 
            if( err ) return res.status(500).end();
            else return res.status(200).end(); // update successful
        });
      
    });

  });

// remove specific instace of meme from DB  
  app.delete( '/memes/:id' , (req , res) => { 

    db.remove({ _id: `${req.params.id}` }, {}, function (err, numRemoved) {
       
        if( err ) return res.status(500).end();

        if( numRemoved === 0 ) return res.status(404).end(); // meme instance not found

        else return res.status(204).end();
      });

  });

// to respond all other endpoint calls  
  app.all("*", (request, response) => {

      response.status(404); 
      response.send("Invalid api!");

  });
  
  app.listen(port, '0.0.0.0', () => {
      console.log(` backend running on port no. ${port} ...`)
  });