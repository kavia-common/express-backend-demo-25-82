const express = require('express');
const itemsController = require('../controllers/items');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item management APIs
 */

/**
 * @swagger
 * /api/v1/items:
 *   get:
 *     summary: List items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Array of items
 */
router.get('/', itemsController.list.bind(itemsController));

/**
 * @swagger
 * /api/v1/items/{id}:
 *   get:
 *     summary: Get item by id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Item id
 *     responses:
 *       200:
 *         description: The item
 *       404:
 *         description: Item not found
 */
router.get('/:id', itemsController.getById.bind(itemsController));

/**
 * @swagger
 * /api/v1/items:
 *   post:
 *     summary: Create item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', itemsController.create.bind(itemsController));

/**
 * @swagger
 * /api/v1/items/{id}:
 *   put:
 *     summary: Update item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Item not found
 */
router.put('/:id', itemsController.update.bind(itemsController));

/**
 * @swagger
 * /api/v1/items/{id}:
 *   delete:
 *     summary: Delete item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Item id
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Item not found
 */
router.delete('/:id', itemsController.remove.bind(itemsController));

module.exports = router;
