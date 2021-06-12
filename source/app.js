const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

const app = express();

const port = process.env.PORT || 3000;

// addresses of respective directories
const staticDir = path.join(__dirname, "../static");
const partialPath = path.join(__dirname, "../views/partials");
const viewPath = path.join(__dirname, "../views/templates");

hbs.registerPartials(partialPath); //setting up partials path
app.use(express.static(staticDir)); //setting up static directory path
app.set("view engine", "hbs"); //setting up views path
app.set("views", viewPath); //modifying view path

app.get("", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

//main route for fetching data from weather and mapbox api
app.get("/weather", (req, res) => {
  if (!req.query.search) return res.send({ error: "No location provided" });
  geocode(req.query.search, (error, { lat, lng, location } = {}) => {
    if (error) return res.send({ error: error.error });
    forcast(lat, lng, (error, data) => {
      if (error) return res.send({ error: error.error });
      return res.send({
        location,
        temperature: data.temperature,
        description: data.description,
      });
    });
  });
});

//error route handler
app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log("chakra sage mode activate");
});
