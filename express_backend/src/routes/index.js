const express = require('express');
const healthController = require('../controllers/health');

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint (root)
 *     responses:
 *       200:
 *         description: Service health check passed
 */
router.get('/', healthController.check.bind(healthController));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 */
router.get('/health', healthController.check.bind(healthController));

module.exports = router;
