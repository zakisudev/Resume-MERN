const asyncHandler = require('express-async-handler');
const Project = require('../models/project.model');
const mongoose = require('mongoose');

// @desc    Get all projects
// @route   GET /api/projects/:id
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.findOne({
      userId: req.params.id,
    });
    res.status(200).json({ projects, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { title, description, link, technologies } = req.body;
  const image =
    req?.file?.path ||
    'https://www.svgrepo.com/show/508699/landscape-placeholder.svg';

  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized', status: false });
  }

  if (!title || !description || !link || !technologies) {
    return res
      .status(400)
      .json({ message: 'Please fill all fields', status: false });
  }

  try {
    const projectExists = await Project.findOne({
      userId: req.user._id,
    });

    if (!projectExists) {
      const createdProject = await Project.create({
        project: {
          title,
          description,
          link,
          image,
          technologies,
        },
        userId: req.user._id,
      });

      if (!createdProject) {
        return res
          .status(400)
          .json({ message: 'Unable to create project', status: false });
      }

      return res.status(201).json({ projects: createdProject, status: true });
    }

    const existingProject = projectExists.project.find(
      (p) => p.title === title && p.link === link
    );

    if (projectExists && existingProject) {
      return res
        .status(400)
        .json({ message: 'Project already exists', status: false });
    }

    if (projectExists && !existingProject) {
      projectExists.project.push({
        title,
        description,
        link,
        image,
        technologies,
      });

      await projectExists.save();

      return res.status(201).json({ projects: projectExists, status: true });
    }
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
