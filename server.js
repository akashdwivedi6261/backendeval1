const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const port = 8001;
let app = express();
let address = require("./address.json") 
function Validator(req, res, next) { 
    console.log("akash");
    console.log(req.body);

    if(req.method === "POST") {
        if(req.id === null || req.body.city.length < 3 ) {
            res.statusCode = 400
            res.end(`Error occured`)
        }
    }
    else if(req.method === "PATCH") {
        if(req.id === null || req.body.city.length < 3 ) {
            res.statusCode = 400
            res.end(`Error occured`)
        }
        next()
    }

    else if(req.method === "DELETE") {
        if(req.id === null ) {
            res.statusCode = 400
            res.end(`Error occured`)

        }
    }
    next()
 }
app.use(express.json());
app.use(Validator)
app.get("/GET/api/addresses", (req, res) => {
  try{
     console.log(req);
      res.json(address)
  }
  catch(e)  {
      res.statusCode = 400
      res.end(`{"error occured IN get"}`)
  }
});

app.post("/POST/api/addresses", (req, res) => {
    try {
        address.push(req.body);
        res.json(req.body)
    } catch (error) {
        res.statusCode = 400
        res.end(`{"error occured in post"}`)
    }
});

app.patch("/PATCH/api/addresses", (req, res) => {
    console.log("akash", req.body.id);

    try {
        let add = address.find((add) => add.id === req.body.id);
        add.city = req.body.city;
        res.json(add)
    } catch (error) {
        res.statusCode = 400
        res.end(`{"error occured in patch"}`)
    }
});

app.delete("/DELETE/api/addresses", (req, res) => {
   try {
       address = address.filter((add) => add.id !== req.body.id)
       res.json(address)
   } catch (error) {
       res.statusCode = 400;
       res.end(`{"error occured in delete"}`)
   }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});