"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DatailsUserController_1 = require("./controllers/user/DatailsUserController");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const DetailCategoryController_1 = require("./controllers/category/DetailCategoryController");
const DeleteCategoryController_1 = require("./controllers/category/DeleteCategoryController");
const CreateSizeController_1 = require("./controllers/size/CreateSizeController");
const ListSizesController_1 = require("./controllers/size/ListSizesController");
const DeleteSizeController_1 = require("./controllers/size/DeleteSizeController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListByCategoruController_1 = require("./controllers/product/ListByCategoruController");
const DeleteProductController_1 = require("./controllers/product/DeleteProductController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const AdditemController_1 = require("./controllers/order/AdditemController");
const RemoveitemController_1 = require("./controllers/order/RemoveitemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListOrderController_1 = require("./controllers/order/ListOrderController");
const DetailOrderController_1 = require("./controllers/order/DetailOrderController");
const FInishOrderController_1 = require("./controllers/order/FInishOrderController");
const SearchClientsController_1 = require("./controllers/order/SearchClientsController");
const SalesController_1 = require("./controllers/order/SalesController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const multer_2 = __importDefault(require("./config/multer"));
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload('./tmp'));
// -- Rotas User --
router.post('/users', new CreateUserController_1.CreateUserController().handle);
router.post('/session', new AuthUserController_1.AuthUserController().handle);
router.get('/me', isAuthenticated_1.isAuthenticated, new DatailsUserController_1.DatailsUserController().handle);
// -- ROTAS CATEGORY --
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
router.get('/category', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
// IMPORTANTE: Rotas mais específicas devem vir ANTES de rotas com parâmetros
router.get('/category/product', isAuthenticated_1.isAuthenticated, new ListByCategoruController_1.ListByCategoryController().handle);
router.get('/category/:category_id', isAuthenticated_1.isAuthenticated, new DetailCategoryController_1.DetailCategoryController().handle);
router.delete('/category', isAuthenticated_1.isAuthenticated, new DeleteCategoryController_1.DeleteCategoryController().handle);
// -- ROTAS SIZE --
router.post('/size', isAuthenticated_1.isAuthenticated, new CreateSizeController_1.CreateSizeController().handle);
router.get('/sizes', isAuthenticated_1.isAuthenticated, new ListSizesController_1.ListSizesController().handle);
router.delete('/size', isAuthenticated_1.isAuthenticated, new DeleteSizeController_1.DeleteSizeController().handle);
//-- ROTAS PRODUCT --
//router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.post('/product', isAuthenticated_1.isAuthenticated, new CreateProductController_1.CreateProductController().handle);
router.delete('/product', isAuthenticated_1.isAuthenticated, new DeleteProductController_1.DeleteProductController().handle);
// -- ROTAS ORDER --
router.get('/order/clients', isAuthenticated_1.isAuthenticated, new SearchClientsController_1.SearchClientsController().handle);
router.post('/order', isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
router.delete('/order', isAuthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle);
router.post('/order/add', isAuthenticated_1.isAuthenticated, new AdditemController_1.AddItemController().handle);
router.delete('/order/remove', isAuthenticated_1.isAuthenticated, new RemoveitemController_1.RemoveItemController().handle);
router.put('/order/send', isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
router.get('/orders', isAuthenticated_1.isAuthenticated, new ListOrderController_1.ListOrderController().handle);
router.get('/order/detail', isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle);
router.get('/order/sales', isAuthenticated_1.isAuthenticated, new SalesController_1.SalesController().handle);
router.put('/order/finish', isAuthenticated_1.isAuthenticated, new FInishOrderController_1.FinishOrderController().handle);
