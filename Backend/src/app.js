import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));   
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));


import userRouter from "./routes/user.routes.js";
import ngoRouter from "./routes/ngo.routes.js";
import restaurantRouter from "./routes/restaurants.routes.js"

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/ngos", ngoRouter);
app.use("/api/v1/restaurants", restaurantRouter);

// export default app;
export { app }; 