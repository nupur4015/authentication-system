import express from 'express';
import { authUser } from "../../middlewares/auth";
import validate from '../../middlewares/validate';
import { userValidation } from '../../validations';
import { userController } from '../../controllers';

const router = express.Router();

router
  .route('/profile')
  .post(authUser(), validate(userValidation.updateUser), userController.updateUser)
  .get(authUser(), userController.getUser);

router.post('/upload-photo',authUser(),validate(userValidation.uploadPhoto),userController.updateUser);
router.post('/update-visibility',authUser(),validate(userValidation.updateVisibility),userController.updateUser)
router
  .route('/:userId')
  .get(authUser(), validate(userValidation.getUser), userController.getUsers)


export default router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval 
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user
 *     description: Admin users can fetch both public and private user's profile. Normal Users can only access public users and their own profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get own profile
 *     description: Users can get their profile details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   post:
 *     summary: Update own profile
 *     description: User can edit their profile details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []

 *     requestBody:
 *       required: atleast 1
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               bio:
 *                 type: string
 *               phone:
 *                 type: string
 *               photo:
 *                 type: string
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /users/upload-photo:
 *   post:
 *     summary: Upload photo URL
 *     description: User can upload their photo by providing a photo URL
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []

 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * /users/update-visibility:
 *   post:
 *     summary: Update visibility status
 *     description: User can update their visibility status
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

