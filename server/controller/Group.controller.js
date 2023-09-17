const Group = require('../models/AssignmentGroup');

async function createGroup(req, res) {
  const course = req.body.course;
  const members = req.body.members;
  const currentUser = req.user;

  const newGroup = new Group({
    course: course,
    members: members,
  });

  try {
    // newGroup.Members.push(currentUser.id);
    const savedGroup = await newGroup.save();
    res.json(savedGroup);
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

async function getGroup(req, res) {
  try {
    const group = await Group.findOne({ course: req.params.course});
    res.json(group);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { createGroup, getAllGroups, getGroup };
