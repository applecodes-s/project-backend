const express = require('express');
const router = express.Router();
const { createProject, getProjects } = require('../controllers/projectController');
const Project = require('../models/Project');

// CREATE using controller
router.post('/', createProject);

// READ all projects using controller
router.get('/', getProjects);

// READ single project by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id || id === 'undefined') {
    return res.status(400).json({ error: 'Invalid project ID' });
  }

  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE project
router.put('/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE project (✅ FIXED)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Failed to delete project' });
  }
});

module.exports = router;
