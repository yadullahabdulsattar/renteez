const express = require("express");
const { signinForm } = require("../controllers/signinController");

const router = express.Router();
const { generateAuthToken } = require("../middleware/authentication");

// POST for signin
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginUserRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 *       example:
 *         email: bob@marley.com
 *         password: 4wa95#Cf-
 */

// Define User routes first

/**
 * @swagger
 * tags:
 *   - name: "User"
 *     description: "Signin Endpoint"
 */

// login route
/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Login User
 *     operationId: LoginUser
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User login data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: bob@marley.com
 *               password: 4wa95#Cf-
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid user credentials
 */
router.post("/", signinForm);

module.exports = router;
