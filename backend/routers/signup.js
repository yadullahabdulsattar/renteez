const express = require("express");
const { createUser } = require("../controllers/signupController");

const router = express.Router();
const { generateAuthToken } = require("../middleware/authentication");

// POST a new user
/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUserRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         phone:
 *           type: string
 *       required:
 *         - title
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *         - phone
 *       example:
 *         title: Mr
 *         first_name: Bob
 *         last_name: Marley
 *         email: bob@marley.com
 *         password: 4wa95#Cf-
 *         phone: +1234556679
 */

// Define User routes first
/**
 * @swagger
 * tags:
 *   - name: "User"
 *     description: "Signup Endpoint"
 */

// signup route
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Signup User
 *     operationId: SignupUser
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User signup data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *             example:
 *               title: Mr
 *               first_name: Bob
 *               last_name: Marley
 *               email: bob@marley.com
 *               password: 4wa95#Cf-
 *               phone: +1234556679
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid user data
 */
router.post("/", createUser);

module.exports = router;
