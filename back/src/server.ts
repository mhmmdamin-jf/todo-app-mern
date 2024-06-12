import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";
import cors from "cors";
import { resetData } from "./devData";
dotenv.config({ path: "./src/config.env" });
const connectionString = process.env.DATABASE_CONNECTION_STRING?.replace(
  /<PASSWORD>/g,
  process.env.DATABASE_PASSWORD as string
).replace(/,/g, "");
process.on("uncaughtException", (e) => {
  console.log("uncaught rejection detected. shuting down...");
  process.exit(1);
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type, Authorization"],
    credentials: true,
  })
);

mongoose
  .connect(connectionString as string)
  .then(async () => {
    console.log("connection successfull.");
    if (process.argv.includes("--resetData")) {
      await resetData();
    }
  })
  .catch((err) => console.log(err));

const server = app.listen(3002, () => {
  console.log(`app is runing in port ${process.env.PORT} ...`);
});
process.on("unhandledRejection", () => {
  console.log("unhandled rejection. shuting down ...");
  server.close(() => {
    process.exit(1);
  });
});
