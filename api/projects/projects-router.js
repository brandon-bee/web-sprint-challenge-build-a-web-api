// Write your "projects" router here!
const router = require('express').Router();
const Projects = require('./projects-model');
const { logger, validateProjectId, validateProject } = require('./projects-middleware');

router.use(logger);

router.get('/', (req, res, next) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get('/:id', validateProjectId, (req, res) => {
  res.json(req.project);
});

router.post('/', validateProjectId, validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
  const { completed } = req.body;
  if (completed === true || completed === false) {
    Projects.update(req.params.id, req.body)
    .then(updatedProject => {
      res.json(updatedProject);
    })
    .catch(next);
  } else {
    next({
      status: 400,
      message: 'completed field required'
    });
  }
});

router.delete('/:id', validateProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.json(req.project);
    })
    .catch(next);
});

router.get('/:id/actions', validateProjectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then(actions => {
      res.json(actions);
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