const { get } = require('./actions-model');
// add middlewares here related to actions
function logger (req, res, next) {
  const timestamp = new Date().toLocaleString();
  const { method, url } = req;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

function validateActionId (req, res, next) {
  const { id } = req.params;
  get(id)
  .then(action => {
    if (action) {
      req.action = action;
      next();
    } else {
      next({
        status: 404,
        message: 'action not found'
      });
    }
  })
  .catch(next);
}

function validateAction (req, res, next) {
  let { project_id, description, notes } = req.body;
  if (project_id && description && notes) {
    description = description.trim();
    notes = notes.trim();
    next();
  } else {
    next({
      status: 400,
      message: 'project_id, description, and notes fields required'
    });
  }
}

module.exports = {
  logger,
  validateActionId,
  validateAction
}