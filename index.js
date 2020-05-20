const express = require("express");
const app = express();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require('mongoose')
const port = process.env.PORT || 8081;

const db_link = "mongodb://mongo:27017/helloworlddb";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
    };

mongoose.connect(db_link, options).then( function() {
    console.log('MongoDB is connected');
    })
    .catch( function(err) {
    console.log(err);
    });

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "HelloWorld API",
      description: "Hello World Class",
      contact: {
        name: "andresr",
      },
      servers: ["http://localhost:8081"],
    },
  },
  apis: ["index.js", "./modules/users/users.route.js"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const userRoute = require("./modules/users/users.route")

app.use('/users', userRoute);
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /customers:
 *  get:
 *      description: Use to request all customers
 *      responses:
 *          '200':
 *              description: A successful response    
 */
app.get('/customers', function (req, res) {
    res.status(200).send("Customer result");
});

app.get("/", function (req, res) {
  res.status(200).send("Hello world!");
});

app.listen(port, function () {
  console.log("app listening port " + port);
});