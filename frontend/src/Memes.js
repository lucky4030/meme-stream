import React from 'react';
import './Memes.css';

function Meme( props )
{
    var cards =[]; 
    let cnt = 0;
     cards = props.data.map( element => {
        
           return ( 
           <div key={cnt++} className="card" >
                <div className = "container">
                    <h1>{element.name}</h1>
                    <p>{element.caption}</p>
                </div>
                <img src={element.url} alt = "memeImage" width="400" height="400" ></img>
            </div>);
    });
    return <div className="cards">{cards}</div>;
};

export default Meme;