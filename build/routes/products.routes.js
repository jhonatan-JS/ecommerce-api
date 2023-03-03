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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importDefault(require("../models/product"));
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("../controller/multer"));
const productController_1 = __importDefault(require("../controller/productController"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)(multer_2.default);
router.post('/', upload.single('image'), productController_1.default.create);
router.get('/', productController_1.default.getAll);
router.get('/:id', productController_1.default.getById);
router.put('/:id', upload.single('image'), productController_1.default.update);
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getProduct = yield product_1.default.findById({ _id: req.params.id });
    if (!getProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    try {
        yield product_1.default.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Product deleted' });
    }
    catch (err) {
        res.status(404).json({ message: 'Product not found' });
    }
}));
exports.default = router;
