const { response } = require("express");
const Task = require("../models/Task");

// https://loremipsumx.com/

const createTask = async (req, res = response) => {
  try {
    let dbTask = new Task(req.body);
    await dbTask.save();
    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log("😵", error);
    return res.status(500).json({
      success: false,
      msg: "Create task error please contact with soport",
    });
  }
};

const getTasks = async (req, res = response) => {
  try {
    const tasks = await Task.find({}, {}).sort({ date: 1 });
    return res.status(201).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.log("😵", error);
    return res.status(500).json({
      success: false,
      msg: "Get tasks error please contact with soport",
    });
  }
};

const getTask = async (req, res = response) => {
  try {
    const { query } = req;
    const task = await Task.findOne({ _id: query.id });
    return res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log("😵", error);
    return res.status(500).json({
      success: false,
      msg: "Get task error please contact with soport",
    });
  }
};

const deleteTask = async (req, res = response) => {
  try {
    const { query } = req;
    const dbRes = await Task.deleteOne({ _id: query.id });
    if (!dbRes.acknowledged) throw Error(`${JSON.stringify(dbRes)}`);
    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log("😵", error);
    return res.status(500).json({
      success: false,
      msg: "Delete task error please contact with soport",
    });
  }
};

const updateTask = async (req, res = response) => {
  try {
    const { body } = req;
    const { _id, updates } = body;
    const dbRes = await Task.updateOne({ _id }, { $set: updates });
    if (!dbRes.acknowledged) throw Error(`${JSON.stringify(dbRes)}`);
    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log("😵", error);
    return res.status(500).json({
      success: false,
      msg: "Update task error please contact with soport",
    });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
