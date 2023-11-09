const express = require('express');
const router = express.Router();

const { getAsync } = require('../redis');

router.get('/', async (_, res) => {
  const todoCount = parseInt(await getAsync('added_todos'))
  
  res.json({ 
    added_todos: !isNaN(todoCount) && todoCount !== null 
      ? todoCount 
      : 0 });
});

module.exports = router;