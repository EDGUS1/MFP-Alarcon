//Install express server
const express = require("express");
const path = require("path");
const compression = require("compression");

const app = express();
app.use(compression());
// Serve only the static files form the dist directory
app.use(express.static("./dist/aula-virtual"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/aula-virtual/" })
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
