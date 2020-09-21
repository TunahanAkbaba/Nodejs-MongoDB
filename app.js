const express = require("express")
const exphbs = require("express-handlebars")
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const fileUpload = require('./node_modules/express-fileupload/lib/index');
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const process = require('process');

const app = express()
const port = 3000
const hostname = "127.0.0.1"
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const server = app.listen(port, () => { console.log(`Listening on ${3000}`) });



mongoose.connect("mongodb://127.0.0.1/nodeblog_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});


const MongoStore = connectMongo(expressSession)

app.use(expressSession(
  {
    secret: 'true',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }
))

app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash
  delete req.sessionFlash
  next()
})

app.use((req, res, next) => {
  const { userId } = req.session
  if (userId) {
    res.locals = {
      displayLink: true
    }
  } else {
    res.locals = {
      displayLink: false
    }
  }
  next()
})

app.use(fileUpload())

app.use(express.static("public"))

module.exports = server;



app.engine("handlebars", expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}), exphbs());
app.set('view engine', 'handlebars')


app.use(bodyParser.urlencoded({ extended: false }))



app.use(bodyParser.json())






const main = require("./routes/main");
const posts = require("./routes/posts");
const users = require("./routes/users");
const admin = require('./routes/admin/index')



app.use("/", main);
app.use("/posts", posts);
app.use("/users", users);
app.use('/admin',admin)

app.listen(port, hostname, () => {
  console.log(` Connected to server, http://${hostname}:${port}/`);
});

