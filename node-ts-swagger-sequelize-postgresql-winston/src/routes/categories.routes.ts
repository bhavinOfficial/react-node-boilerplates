import { Router } from 'express';
import categoryController from '../controllers/category.controller';
import auth from '../middlewares/auth';

const router = Router();

//? POST
/**
 * @openapi
 *  /category:
 *    post:
 *      tags:
 *      - Category
 *      summary: Create-Category
 *      description: This is the api for create new category
 *      operationId: Create-Category
 *      security:
 *      - BearerAuth: []
 *      requestBody:
 *        description: Enter the below fields to create new category
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *              - $ref: '#/components/schemas/Create-Category-Request'
 *              - example:
 *                  name: 'fashion'
 *                  description: 'fashion is the best'
 *            example:
 *              name: 'fashion'
 *              description: 'fashion is the best'
 *      responses:
 *        '201':
 *          description: CREATED
 *          headers: {}
 *          content:
 *            application/json; charset=utf-8:
 *              schema:
 *                allOf:
 *                - $ref: '#/components/schemas/Create-Category-Response'
 *                - example:
 *                    success: true
 *                    status: 201
 *                    message: 'Category created successfully.'
 *                    payload: {}
 *              example:
 *                success: true
 *                status: 201
 *                message: 'Category created successfully.'
 *                payload: {}
 * components:
 *    schemas:
 *      Create-Category-Request:
 *        title: Create-Category-Request
 *        required:
 *        - name
 *        - description
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          description:
 *            type: string
 *        example:
 *           name: 'fashion'
 *           description: 'fashion is the best'
 *      Create-Category-Response:
 *        title: Create-Category
 *        required:
 *        - success
 *        - status
 *        - message
 *        - payload
 *        type: object
 *        properties:
 *          success:
 *            type: boolean
 *          status:
 *            type: integer
 *            format: int32
 *          message:
 *            type: string
 *          payload:
 *            type: object
 *        example:
 *          success: true
 *          status: 201
 *          message: 'Category created successfully.'
 *          payload: {}
 */
router.post(
  '/',
  auth({
    isTokenRequired: false,
    usersAllowed: [],
  }),
  categoryController.createCategoryRequest.validation,
  categoryController.createCategoryRequest.handler
);

router.get(
  '/',
  auth({
    isTokenRequired: false,
    usersAllowed: [],
  }),
  categoryController.getCategoriesRequest.validation,
  categoryController.getCategoriesRequest.handler
);

router.get(
  '/',
  auth({
    isTokenRequired: false,
    usersAllowed: [],
  }),
  categoryController.getCategoryByIdRequest.validation,
  categoryController.getCategoryByIdRequest.handler
);

router.delete(
  '/',
  auth({
    isTokenRequired: false,
    usersAllowed: [],
  }),
  categoryController.deleteCategoryRequest.validation,
  categoryController.deleteCategoryRequest.handler
);

router.put(
  '/',
  auth({
    isTokenRequired: false,
    usersAllowed: [],
  }),
  categoryController.updateCategoryRequest.validation,
  categoryController.updateCategoryRequest.handler
);

export default router;
