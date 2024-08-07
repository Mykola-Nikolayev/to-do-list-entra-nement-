"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const URI = process.env.MONGODB_URI;
const PORT = 5050;
if (URI) {
    mongoose_1.default.connect(URI)
        .then(() => {
        console.log("mongodb is connected !");
    })
        .catch((error) => console.log(error));
}
else {
    console.log("No uri to db");
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(PORT, () => {
    console.log(`server listen on port ${PORT} => url : http://localhost:${PORT}`);
});
