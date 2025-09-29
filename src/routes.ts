import {Router} from 'express'
import { CreateUserController  } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DatailsUserController } from './controllers/user/DatailsUserController'

import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'

import { CreateProductController } from './controllers/product/CreateProductController'

import { isAuthenticated } from './middlewares/isAuthenticated'

const router = Router()

// -- Rotas User --
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me',isAuthenticated, new DatailsUserController().handle)

// -- ROTAS CATEGORY --
router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

//-- ROTAS PRODUCT --

router.post('/product', isAuthenticated, new CreateProductController().handle)

export {router}