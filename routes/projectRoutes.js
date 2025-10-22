const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const projectController = require('../controllers/projectController');

router.post('/', protect, projectController.createProject);
router.get('/', protect, projectController.getProjects);
router.get('/:id', protect, projectController.getProjectById);
router.put('/:id', protect, projectController.updateProject);
router.delete('/:id', protect, projectController.deleteProject);

module.exports = router;
