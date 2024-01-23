const express = require('express');
const systemController = require('../controllers/index');

const router = express.Router();

router.post('/sendDescription', systemController.sendDescription);
router.post('/receiveClassification', systemController.receiveClassification);
router.get('/measureRedisLatency', systemController.measureRedisLatency);
router.get('/getClassification/:key', systemController.getClassificationByRedisKey);
router.get('/resetRedis', systemController.resetRedis);

module.exports = router;