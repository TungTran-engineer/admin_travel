import mongoose from 'mongoose';
import express from "express";
import rootRouter from "./routes/root.js";
import userRouter from "./routes/user.js";
import travelRoutes from './routes/travelRoutes.js';
import bodyParser from "body-parser";
import methodOverride from "method-override";
import adminRoutes from './routes/adminRoutes.js';
import loginadminRoutes from './routes/loginadminRoutes.js';

// Kết nối MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://tunglatoi2004:tunglatoi2004@cluster0.4mxgk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Dừng ứng dụng nếu không thể kết nối
  }
};

connectDB();  // Gọi hàm kết nối MongoDB trước khi khởi động ứng dụng

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

// Set view engine và static files
app.set("view engine", "ejs");
app.set("views", "./bt/views");
app.use(express.static("./bt/public"));
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Các route
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
