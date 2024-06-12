"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const devData_1 = require("./devData");
dotenv_1.default.config({ path: "./src/config.env" });
const connectionString = (_a = process.env.DATABASE_CONNECTION_STRING) === null || _a === void 0 ? void 0 : _a.replace(/<PASSWORD>/g, process.env.DATABASE_PASSWORD).replace(/,/g, "");
process.on("uncaughtException", (e) => {
    console.log("uncaught rejection detected. shuting down...");
    process.exit(1);
});
app_1.app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type, Authorization"],
    credentials: true,
}));
mongoose_1.default
    .connect(connectionString)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("connection successfull.");
    if (process.argv.includes("--resetData")) {
        yield (0, devData_1.resetData)();
    }
}))
    .catch((err) => console.log(err));
const server = app_1.app.listen(3002, () => {
    console.log(`app is runing in port ${process.env.PORT} ...`);
});
process.on("unhandledRejection", () => {
    console.log("unhandled rejection. shuting down ...");
    server.close(() => {
        process.exit(1);
    });
});
