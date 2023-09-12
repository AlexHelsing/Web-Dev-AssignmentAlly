const Group = require('../models/AssignmentGroup');

async function createGroup(req, res) {
  const course = req.body.course;
  const members = req.body.members;
  const currentUser = req.user;

  const newGroup = new Group({
    Course: course,
    Members: members,
  });

  try {
    // newGroup.Members.push(currentUser.id);
    const savedGroup = await newGroup.save();
    res.json(savedGroup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { createGroup };
