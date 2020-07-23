require('dotenv').config();

const cookieParser      = require("cookie-parser"),
      bodyParser        = require("body-parser"),
      mongoose          = require('mongoose'),
      express           = require("express"),
      cors              = require("cors"),
      app               = express();

const authRoutes = require("./routes/auth");

//   DB connections
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
}).then(() => {
    console.log("DB connected");
});


// my middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My routes
app.use("/api", authRoutes);

// My port
const port = process.env.PORT || 8000;

// Starting the server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});

