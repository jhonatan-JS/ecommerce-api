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
const user_1 = __importDefault(require("../../models/user"));
const UserController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (yield user_1.default.findOne({ email })) {
                return res.status(400).json({ error: 'Usuário já existente' });
            }
            const user = {
                email,
                password,
            };
            try {
                const isExist = yield user_1.default.findOne({ email: req.body.email });
                if (isExist) {
                    return res.status(409).json({ message: 'User ja existe' });
                }
                yield user_1.default.create(user);
                res.status(201).json({ message: 'User created' });
            }
            catch (err) { }
        });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find();
                res.status(200).json(users);
            }
            catch (err) { }
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body.data;
            const userCurrent = yield user_1.default.findOne({ email });
            (userCurrent === null || userCurrent === void 0 ? void 0 : userCurrent.password) === password
                ? res.status(200).json(userCurrent)
                : res.status(404).json({ message: 'User not found' });
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const user = yield user_1.default.findById(id);
                user
                    ? res.status(200).json(user)
                    : res.status(404).json({ message: 'User not found' });
            }
            catch (err) {
                res.status(404).json({ message: 'User not found' });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { name, email, password } = req.body.data;
            const userCurrent = yield user_1.default.findById(id);
            if (!userCurrent) {
                return res.status(404).json({ message: 'User not found' });
            }
            const user = {
                name,
                email,
                password,
            };
            try {
                const updateUser = yield user_1.default.findOneAndUpdate(id, user);
                updateUser
                    ? res.status(200).json(user)
                    : res.status(404).json({ message: 'User not found' });
            }
            catch (err) {
                res.status(404).json({ message: 'User not found' });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const getUser = yield user_1.default.findById({ _id: req.params.id });
            if (!getUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            try {
                yield user_1.default.deleteOne({ _id: req.params.id });
                res.status(200).json({ message: 'User deleted' });
            }
            catch (err) {
                res.status(404).json({ message: 'User not found' });
            }
        });
    },
};
exports.default = UserController;
