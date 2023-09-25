const Group = require('../models/AssignmentGroup');
const User = require('../models/User.mongo');

async function createGroup(req, res) {
  const assignmentGroupName = req.body.assignmentGroupName;
  const course = req.body.course;
  const members = req.body.members;
  const currentUser = req.user;

  console.log('Creating group for course: ' + course);

  const newGroup = new Group({
    assignmentGroupName: assignmentGroupName,
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
  }
}

async function getGroup(req, res) {
  // will need to check if user is in group here later but i cba right now
  try {
    const group = await Group.findById(req.params.id);

    // convert the members array of ids to an array of usernames
    const members = await User.find({ _id: { $in: group.members } });
    const memberNames = members.map((member) => member.username);
    // create object of membername and memberid

    res.json({ ...group._doc, members: memberNames });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
async function InviteMemberToGroup(req, res) {
  const groupId = req.params.groupId;
  const usernameToInvite = req.params.username;

  console.log('Inviting user ' + usernameToInvite + ' to group ' + groupId);
  try {
    const group = await Group.findById(groupId);

    console.log('Group: ' + group);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const userToInvite = await User.findOne({
      username: usernameToInvite,
    }).then((user) => user._id);
    console.log('User to invite: ' + userToInvite);

    if (!userToInvite) {
      return res.status(404).json({ message: 'User not found' });
    }

    group.members.push(userToInvite);
    await group.save();

    return res.status(200).json({ message: 'User added to group' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
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
  InviteMemberToGroup,
};
