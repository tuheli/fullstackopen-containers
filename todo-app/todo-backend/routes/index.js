const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const { getAsync, setAsync } = require('../redis')

/* GET index data. */
router.get('/', async (req, res) => {
  const visits = parseInt(await getAsync('visits'))
  if (isNaN(visits) || visits === null) {
    await setAsync('visits', 1)
  } else {
    await setAsync('visits', visits + 1)
  }
  const updatedVisits = parseInt(await getAsync('visits'))

  res.send({
    ...configs,
    visits: updatedVisits
  });
});

module.exports = router;
