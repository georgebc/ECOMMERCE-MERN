import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user";
// import { productRouter } from "./routes/product";

const MONGODB_URI:string = 'mongodb+srv://georgecase:tCEoL8WCdpnOzkyk@ecommerce.3l6ia11.mongodb.net/ecommerce'
const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
// app.use("/products", productRouter);

mongoose.connect(MONGODB_URI);

app.listen(3001, () => console.log("CONSOLE: Server started"));