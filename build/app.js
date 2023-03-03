"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('strictQuery', true);
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*' }));
app.use('/user', user_routes_1.default);
app.use('/product', products_routes_1.default);
mongoose_1.default
    .connect(`${MONGO_URL}`)
    .then(() => {
    app.listen(process.env.PORT || 3333);
})
    .catch((err) => {
    console.log('Connection failed:', err);
});
