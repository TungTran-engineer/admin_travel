import express from "express";
import rootRouter from "./routes/root.js";
import { connectDB } from "./config/connectDB.js";
import userRouter from "./routes/user.js";
import travelRoutes from './routes/travelRoutes.js';
import bodyParser from "body-parser";
import methodOverride from "method-override";
import adminRoutes from './routes/adminRoutes.js';
import loginadminRoutes from './routes/loginadminRoutes.js';

connectDB();
const app = express();
const port = 3000;



app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })  
);
app.use(bodyParser.json()); 




// Set view engine and static files
app.set("view engine", "ejs");
app.set("views", "./bt/views");
app.use(express.static("./bt/public"));
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/", loginadminRoutes);
app.use("/", rootRouter);
app.use('/travel', travelRoutes);
app.use("/users", userRouter);
app.use("/Dashboard", userRouter);
app.use('/admin', adminRoutes);
app.use('/login', loginadminRoutes);

app.listen(port, () => {
  console.log("Server started on port", port);
});
