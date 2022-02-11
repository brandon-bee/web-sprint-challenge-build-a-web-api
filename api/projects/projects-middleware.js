// add middlewares here related to projects
function logger (req, res, next) {
  const timestamp = new Date().toLocaleString();
  const { method, url } = req;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

module.exports = {
  logger
}