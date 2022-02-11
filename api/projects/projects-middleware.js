const { get } = require('./projects-model');
// add middlewares here related to projects
function logger (req, res, next) {
  const timestamp = new Date().toLocaleString();
  const { method, url } = req;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

function validateProjectId(req, res, next) {
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

module.exports = {
  logger,
  validateProjectId
}