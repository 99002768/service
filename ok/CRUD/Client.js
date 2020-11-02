const express= require("express");
const app=express();
app.use(express.static("IMAGES"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/home.html");
})
app.get("/home.html", (req, res) => {
    res.sendFile(__dirname + "/home.html");
})

app.get("/Achieve.html", (req, res) => {
    res.sendFile(__dirname+ "/Achieve.html");
})
app.get("/services.html", (req, res) => {
    res.sendFile(__dirname+ "/services.html");
})
app.get("/aboutUs.html", (req, res) => {
    res.sendFile(__dirname + "/aboutUs.html");
})
app.get("/contactUs.html", (req, res) => {
    res.sendFile(__dirname + "/contactUs.html");
})
app.get("/Client.html", (req, res) => {
    res.sendFile(__dirname + "/Client.html");
})
app.listen(3334, () => {
    console.log("Client App running at 3334");
})
