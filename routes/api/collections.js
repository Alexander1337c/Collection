const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Collections route'));

module.exports = router;