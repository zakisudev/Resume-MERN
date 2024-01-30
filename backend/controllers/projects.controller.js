const asyncHandler = require('express-async-handler');
const Project = require('../models/project.model');
const mongoose = require('mongoose');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (_, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json({ projects, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { title, description, link, image, technologies } = req.body;

  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (!title || !description || !link || !technologies) {
    res.status(400).json({ message: 'Please fill all fields', status: false });
  }

  try {
    const project = await Project.create({
      title,
      description,
      link,
      image,
      technologies,
    });

    if (!project) {
      res
        .status(400)
        .json({ message: 'Unable to create project', status: false });
    }

    res.status(201).json({ project, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const { title, description, link, image, technologies } = req.body;

  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ message: 'Project not found', status: false });
  }

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: req.params.id }, // filter
      {
        // update
        title,
        description,
        link,
        image,
        technologies,
      },
      { new: true } // options
    );

    if (!updatedProject) {
      res
        .status(400)
        .json({ message: 'Unable to update project', status: false });
    }

    res.status(200).json({ project: updatedProject, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ message: 'Project not found', status: false });
  }

  try {
    const deletedProject = await Project.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedProject) {
      res
        .status(400)
        .json({ message: 'Unable to delete project', status: false });
    }

    res.status(200).json({ project: deletedProject, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
