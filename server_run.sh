#!/bin/sh
cd backend

rm datafile 
# Setup DB or any other environment variables you want to setup.

npm install express 
npm install cors
npm install dotenv
npm install nedb
npm install body-parser

node index.js