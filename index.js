const express = require("express");
const app = express();
const port = 3000;

//Static files
app.use(express.static(__dirname + "/public/"));

//Rendering the html page
app.get("/", (req, res) => res.sendFile(__dirname + "index.html"));

//Listening to port 3000
app.listen(port, () => console.log("App listening on PORT 3000"));
