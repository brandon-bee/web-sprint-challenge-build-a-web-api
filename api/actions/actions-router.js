// Write your "actions" router here!
const router = require('express').Router();
const Actions = require('./actions-model');
const { logger, validateActionId, validateAction } = require('./actions-middlware');

router.use(logger);

module.exports = router;