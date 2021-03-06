## project ->  1) frontend  &   2) backend


# frontend ->
    tech stack = React.js , Material.ui , HTML , CSS , axios 
    deployment link = https://memerhub.netlify.app/

# backend ->
    tech stack = NeDB( NOSQL database, stores data in the local machine ), Node.js ( Express )
    deployment link = https://memerhub.herokuapp.com/ ( in use!)

    another deploymen link = https://memerbackend.herokuapp.com/ ( there is no delete endpoint and it is based on firebase)

    @ api documentation ->
            GET METHOD :-

                    '/memes'  =>  return list of json data of memes
                    '/memes/:id' =>  return json data of specific meme id
                    './memes/ids' => return array id's of all memes in sorted order ( recent to oldest )       

            POST METHOD :-

                    '/memes'  =>  add new meme into database 
                    
                    body : { 
                            "name" : "<user Name>",
                            "caption" : "<user Caption>",
                            "url" : "<meme url>"
                            }         
                    each post request body should be unique else it will respond with 409 status
                        and for empty payload 400 status ( bad request ).

            PATCH METHOD :-
            
                    '/memes/:id'  => it will update url/caption or both
                    body : { 
                            "caption" : "<user Caption>",
                            "url" : "<meme url>"
                            } 
                    each post request body should not contain name feild else it will respond with 400 ( bad request ) status.

            DELETE METHOD :-

                    '/memes/:id'  => it will remove the given meme ( using id parameter )
                    if it unable to find such id then 404 status else 'ok' status.