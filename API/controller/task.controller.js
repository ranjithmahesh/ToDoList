const Task = require("../models/Task");

module.exports.createTask = async (req, res) => {
  const { title, des } = req.body;

 
  const task = new Task({ title, des });
  // , user: req.user.id
  task.save();
  res.status(200).send({ message: "Task created", task });
};
module.exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    res.status(200).send({ message: "Task Updated", task });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .send({ message: "An error occurred while updating the task" });
  }
};

module.exports.getTaskTask = async (req, res) => {
  const { id } = req.params;
  
  const task = await Task.findById(id);

  res.status(200).send({ message: "Task Details", task });
};
module.exports.deletedTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);

  res.status(200).send({ message: "Task deleted", task });
};
module.exports.AllTask = async (req, res) => {
  const task = await Task.find();

  res.status(200).send({ message: "All Task", task });
};
