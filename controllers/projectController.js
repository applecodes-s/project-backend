// controllers/projectController.js

const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { title, description, tags, github, liveDemo } = req.body;

    const project = new Project({
      title,
      description,
      tags,
      github,
      liveDemo,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create project' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};
