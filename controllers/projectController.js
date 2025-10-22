const Project = require('../models/Project');

const createProject = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Project name required' });

  try {
    const project = await Project.create({
      userId: req.user._id,
      name,
      files: {
        'index.html': { content: '<div id="root"><h1>Hello Project</h1></div>' },
        'style.css': { content: 'body { font-family: Arial; }' },
        'script.js': { content: 'console.log("Hello");' },
      },
    });
    res.status(201).json(project);
  } catch (error) {
    console.error('createProject:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id });
    res.json(projects);
  } catch (error) {
    console.error('getProjects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    if (project.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Unauthorized' });
    res.json(project);
  } catch (error) {
    console.error('getProjectById:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProject = async (req, res) => {
  try {
    const { files } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    if (project.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Unauthorized' });

    project.files = files;
    await project.save();
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    console.error('updateProject:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    if (project.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Unauthorized' });

    await project.deleteOne();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('deleteProject:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
