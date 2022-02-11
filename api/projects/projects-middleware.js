const { get } = require('./projects-model');
// add middlewares here related to projects
function logger (req, res, next) {
  const timestamp = new Date().toLocaleString();
  const { method, url } = req;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

function validateProjectId (req, res, next) {
  const { id } = req.params;
  get(id)
  .then(project => {
    if (project) {
      req.project = project;
      next();
    } else {
      next({
        status: 404,
        message: 'project not found'
      });
    }
  })
  .catch(next);
}

function validateProject (req, res, next) {
  let { name, description } = req.body;
  if (name && description) {
    name = name.trim();
    description = description.trim();
    next();
  } else {
    next({
      status: 400,
      message: 'name and description fields required'
    });
  }
}

module.exports = {
  logger,
  validateProjectId,
  validateProject
}