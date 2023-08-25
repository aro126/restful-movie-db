This project is based upon a tutorial [that can be found here.](https://www.mongodb.com/developer/languages/javascript/hapijs-nodejs-driver/)

Additionally referenced [this tutorial](https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/) to learn Fetch API.

## Setup

* Sign up for a free [MongoDB Atlas]() account
* Create a cluster and load sample data (reference the first tutorial list above for more information)
* Run `npm install` from project folder
* Start the server by running `node movies.js "{YOUR-CONNECTION-STRING}"`. Replace {YOUR-CONNECTION-STRING} with your credentials (Should look something like mongodb+srv://{YOUR_USERNAME}:{YOUR_PASSWORD}@cluster0.hkic3jo.mongodb.net/sample_mflix?retryWrites=true&w=majority ). Make sure the connection string is surrounded by "quotation marks". Look at [this link](https://www.mongodb.com/basics/mongodb-connection-string#:~:text=How%20do%20I%20find%20my%20MongoDB%20connection%20string%3F) to get more information on how to find your connection string.
* Navigate to index.html file in browser