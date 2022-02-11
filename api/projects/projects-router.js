// Write your "projects" router here!
const router = require('express').Router();
const Projects = require('./projects-model');
const { logger, validateProjectId, validateProject } = require('./projects-middleware');

router.use(logger);

router.get('/', (req, res, next) => {
  Projects.get()
    .then(projects => {
      console.log(projects);
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get('/:id', validateProjectId, (req, res) => {
  res.json(req.project);
});

router.post('/', validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'something tragic inside posts router happened',
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;