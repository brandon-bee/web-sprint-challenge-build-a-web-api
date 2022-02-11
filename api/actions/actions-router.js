// Write your "actions" router here!
const router = require('express').Router();
const Actions = require('./actions-model');
const { logger, validateActionId, validateAction } = require('./actions-middlware');

router.use(logger);

router.get('/', (req, res, next) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get('/:id', validateActionId, (req, res) => {
  res.json(req.action);
});

router.post('/', validateActionId, validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction);
    })
    .catch(next);
});

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
  const { completed } = req.body;
  if (completed === true || completed === false) {
    Actions.update(req.params.id, req.body)
    .then(updatedAction => {
      res.json(updatedAction);
    })
    .catch(next);
  } else {
    next({
      status: 400,
      message: 'completed field required'
    });
  }
});

router.delete('/:id', validateActionId, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.json(req.action);
    })
    .catch(next);
});

module.exports = router;