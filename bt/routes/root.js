import express, { query } from "express";
import HomeController from "../controllers/home_controller.js";
import DashboardController from "../controllers/Dashboard_controller.js";
const rootRouter = express.Router()

  rootRouter.get("/about", HomeController.about );
  
  rootRouter.get("/", HomeController.index);
  rootRouter.get("/Dashboard", DashboardController.detail);
  
  
  export default rootRouter;