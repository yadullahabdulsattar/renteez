const express = require("express");
const {
  getUserById,
  deleteUserById,
  changeDetails,
} = require("../controllers/usersController");

const router = express.Router();
const { generateAuthToken } = require("../middleware/authentication");

router.use(generateAuthToken);

// GET user by id
/**
 * @swagger
 * components:
 *   schemas:
 *     GetUserDetails:
 *       type: object
 */

// user detail route
/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: User Detail
 *     operationId: UserDetail
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: ID
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User Details
 *       400:
 *         description: Unauthorized User
 */
router.get("/me", getUserById);
// DELETE a user by id
/**
 * @swagger
 * components:
 *   schemas:
 *     DeleteUser:
 *       type: object
 */

// user delete route
/**
 * @swagger
 * /user/me:
 *   delete:
 *     summary: Delete User
 *     operationId: DeleteUser
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User Details
 *       400:
 *         description: Unauthorized User
 */
router.delete("/me", deleteUserById);
// PATCH change user details
/**
 * @swagger
 * components:
 *   schemas:
 *     ChangeUserDetails:
 *       type: object
 */

// user detail change route
/**
 * @swagger
 * /user/me:
 *   patch:
 *     summary: Change User Detail
 *     operationId: ChangeUserDetail
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User detail change data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *             example:
 *               password: abcABC123!
 *     responses:
 *       200:
 *         description: User Details
 *       400:
 *         description: Unauthorized User
 */
router.patch("/me", changeDetails);

module.exports = router;
