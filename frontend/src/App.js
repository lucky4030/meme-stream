import './App.css';
import React ,{ useEffect  , useState } from 'react';
import Button from '@material-ui/core/Button';
import Meme from './Memes.js';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

function App() {

   var [form , setForm ] = useState({ name : '' , caption : '' , url : '' });
   var [memes , setMeme] = useState([]);
   var [dataId , setId]= useState([]);

   useEffect( () => { 

    document.title = 'Xmemes';
    axios.get('https://memerhub.herokuapp.com/memes')
    .then( ( res ) => { 
      setMeme( res.data );
     })
    .catch( (error) => { console.log(error); }); 

    axios.get('https://memerhub.herokuapp.com/memes/ids' )
    .then( ( res ) => { 
      setId(res.data);
    })
    .catch( error => { console.log(error) });

   } , []);

  var handelSubmitMeme = ( Event ) =>{
    
    Event.preventDefault();

    axios.post('https://memerhub.herokuapp.com/memes' , form )
    .then( ( response ) => { 
      setMeme( memes => [form ,...memes ] );
      
      setForm({ name : "" , url : "" , caption : "" });
    })
    .catch( (error) => { 
      console.log(error); 
    });

  };

  return (
    <div>
      <div className="header">
        <h1 className ="top" > Meme Stream </h1>
      </div>
      <div className ="form" >
        <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name" 
                  value = { form.name }
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  autoFocus
                  onChange = { (event) => {  setForm({...form , name : event.target.value} ) } }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="caption" 
                  value = { form.caption }
                  name="caption"
                  variant="outlined"
                  required
                  fullWidth
                  id="caption"
                  label="caption"
                  autoFocus
                  onChange = { (event) => {  setForm({...form , caption : event.target.value} ) } }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined" 
                  value = { form.url }
                  required
                  fullWidth
                  id="URL"
                  label="url"
                  name="url"
                  autoComplete="url"
                  onChange = { (event) => {  setForm({...form , url : event.target.value} ) } }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Button type="submit"  variant="contained"  color="primary" onClick = {handelSubmitMeme} >
                Submit Meme
              </Button>
              </Grid>
            </Grid>
        </form>  
      </div>
      <div>
        <Meme data = { memes } dataId = { dataId } />
      </div>
      <div className="footer"> 
        {'XMEME By Satyendra Tiwari'}
      </div>
  </div>
  );
}

export default App;
