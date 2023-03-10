/**
 * @swagger
 * tags:
 *   name: Borrow
 *   description: Borrowing books API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Borrow:
 *       type: object
 *       required:
 *         - memberCode
 *         - bookCode
 *       properties:
 *         memberCode:
 *           type: string
 *           description: Member code that borrows the book
 *         bookCode:
 *           type: string
 *           description: Book code that is being borrowed
 *       example:
 *         memberCode: M001
 *         bookCode: JK-45
 *
 *   responses:
 *     BorrowSuccess:
 *       type: object
 *       properties:
 *         borrowId:
 *           type: string
 *           description: ID of the borrowing transaction
 *       example:
 *         borrowId: B001
 *     BadRequest:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *       example:
 *         message: Member has reached maximum number of borrowed books
 */

const express = require("express");
const router = express.Router();
const { borrowBook } = require("../controllers/borrow.controller");

/**
 * @swagger
 * /borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Borrow'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/BorrowSuccess'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/BadRequest'
 */
router.post("/", borrowBook);

module.exports = router;
