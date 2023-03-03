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
const product_1 = __importDefault(require("../../models/product"));
const drive_1 = __importDefault(require("./drive"));
const ProductController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { path } = req.file;
            if (yield product_1.default.findOne({ name: req.body.name })) {
                return res.status(400).json({ error: 'Produto já existente' });
            }
            const responseFile = yield (0, drive_1.default)(path);
            const pathFile = 'https://drive.google.com/uc?export=view&id=' + (responseFile === null || responseFile === void 0 ? void 0 : responseFile.data.id);
            const product = {
                name: req.body.name,
                description: req.body.description,
                brand: req.body.brand,
                image: pathFile,
                price: parseInt(req.body.price),
            };
            try {
                yield product_1.default.create(product);
                res.status(201).json({ message: 'Product created' });
            }
            catch (err) {
                console.log(err);
                res.status(404).json({ message: 'Product not created' });
            }
        });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_1.default.find();
                res.status(200).json(products);
            }
            catch (err) {
                res.status(404).json({ message: 'Products not found' });
            }
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const product = yield product_1.default.findById(id);
                product
                    ? res.status(200).json(product)
                    : res.status(404).json({ message: 'Product not found' });
            }
            catch (err) {
                res.status(404).json({ message: 'Product not found' });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { path } = req.file;
            const responseFile = yield (0, drive_1.default)(path);
            const pathFile = 'https://drive.google.com/uc?export=view&id=' + (responseFile === null || responseFile === void 0 ? void 0 : responseFile.data.id);
            const productUpdated = {
                name: req.body.name,
                description: req.body.description,
                brand: req.body.brand,
                image: pathFile,
                price: parseInt(req.body.price),
            };
            try {
                const updateProduct = yield product_1.default.findByIdAndUpdate(id, productUpdated, {
                    new: true,
                });
                res.status(200).json(updateProduct);
            }
            catch (err) {
                res.status(404).json({ message: 'Product not found' });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    },
};
exports.default = ProductController;
