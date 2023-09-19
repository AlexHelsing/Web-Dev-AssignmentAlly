const Group = require('../models/AssignmentGroup');

async function createGroup(req, res) {
  const course = req.body.course;
  const members = req.body.members;
  const currentUser = req.user;

  console.log('Creating group for course: ' + course);

  const newGroup = new Group({
    course: course,
    members: members,
    createdBy: currentUser.id,
  });

  try {
    newGroup.members.push(currentUser.id);
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
async function getAllGroups(req, res) {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getMyGroups(req, res) {
  console.log('Getting groups for user: ' + req.user.id);
  try {
    const groups = await Group.find({ members: req.user.id });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
    s;
  }
}

async function getGroup(req, res) {
  try {
    const group = await Group.findOne({ course: req.params.course });
    res.json(group);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteGroup(req, res) {
  try {
    const deleteGroup = req.params.course;
    await Group.findOneAndDelete({ course: deleteGroup });
    console.log('Deleted Group ');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  createGroup,
  getAllGroups,
  getGroup,
  deleteGroup,
  getMyGroups,
};
