

const express= require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

const port=3000;


app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    var city=req.body.city;
    var url="https://api.openweathermap.org/data/2.5/weather?q=" + city+ "&units=metric&appid=657deaaecbb02142f90dc42801b425d3";
    https.get(url, function(response){
        response.on("data", function(data){
            var info=JSON.parse(data);
            var imageURL=" http://openweathermap.org/img/wn/"+info.weather[0].icon+"@2x.png"

            res.set("content-type", "text/html");
            res.write("<h3>The temperature is "+info.main.temp+"</h3><br>");
            res.write("Weather description: "+info.weather[0].description);
            res.write("<br><img src="+imageURL+">");
            res.send();
        });
    });
});

app.listen(port, function(){
    console.log("Server started on port "+ port);
});
