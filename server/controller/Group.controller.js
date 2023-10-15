const Group = require('../models/AssignmentGroup');
const User = require('../models/User.mongo');
const Task = require('../models/Task.Model');
const Meeting = require('../models/Meeting.model');

async function createGroup(req, res) {
  const assignmentGroupName = req.body.assignmentGroupName;
  const course = req.body.course;
  const members = req.body.members;
  const currentUser = req.user;

  console.log('Creating group for course: ' + course);

  const newGroup = new Group({
    assignmentGroupName: capitalizeFirstLetter(assignmentGroupName),
    course: course,
    members: members,
    createdBy: currentUser.id,
  });

  // Check if group already exists
  const groupExists = await Group.findOne({
    assignmentGroupName: assignmentGroupName,
  });
  if (groupExists) {
    return res
      .status(400)
      .json({ message: 'Group already exists, choose another name' });
  }

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
    // POPULATE THE MEMBERS ARRAY WITH THE USER OBJECTS but just keep the id and username
    const groups = await Group.find({ members: req.user.id }).populate(
      'members',
      ['username']
    );

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
  const usernameToInvite = req.body.username;

  console.log('Inviting user ' + usernameToInvite + ' to group ' + groupId);
  try {
    const group = await Group.findById(groupId);

    // check if group exists
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // check if user exists
    const userToInvite = await User.findOne({ username: usernameToInvite });

    if (!userToInvite) {
      return res.status(404).json({ message: 'User not found' });
    }

    // check if user is already in group
    if (group.members.includes(userToInvite.id)) {
      return res
        .status(400)
        .json({ message: 'User is already in this group!' });
    }

    // add user to group
    group.members.push(userToInvite.id);

    await group.save();

    return res.status(200).json({ message: 'User added to group' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function joinGroup(req, res) {
  const groupName = req.params.groupName;
  const userToJoin = req.user;

  try {
    const group = await Group.findOne({ assignmentGroupName: groupName });

    if (!group) {
      return res
        .status(404)
        .json({ message: 'Group doesnt exist, try again!' });
    }

    // check if user is already in group
    if (group.members.includes(userToJoin.id)) {
      return res
        .status(400)
        .json({ message: 'You are already in this group!' });
    }

    group.members.push(userToJoin.id);
    await group.save();

    return res.json(group);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteGroup(req, res) {
  try {
    const Id = req.params.Id;

    // delete all tasks and meetings associated with the group
    await Task.deleteMany({ GroupId: Id });
    await Meeting.deleteMany({ GroupId: Id });
    await Group.findByIdAndDelete(Id);

    return res.status(200).json({ message: 'Group deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function setResource(req, res) {
  console.log('hello');
  const groupId = req.params.groupId;
  const type = req.params.type;
  const link = req.body.link;
  console.log(type);
  console.log(link);

  const allowedTypes = ['discord', 'assignment file', 'reference material'];

  if (!allowedTypes.includes(type)) {
    return res.status(400).json({ message: 'Invalid resource type' });
  }
  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // if the type already exists, update the link
    const resourceIndex = group.resources.findIndex((r) => r.type === type);
    if (resourceIndex !== -1) {
      group.resources[resourceIndex].link = link;
    } else {
      group.resources.push({ type: type, link: link });
    }

    await group.save();

    // return the updated group
    return res.status(200).json(group);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getUsersFromGroup(req, res) {
  const groupId = req.params.groupId;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // only return id and username
    const users = await User.find({ _id: { $in: group.members } }).select(
      'username'
    );

    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getUserFromGroup(req, res) {
  const groupId = req.params.groupId;
  const userId = req.params.userId;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // only return id and username
    const user = await User.findById(userId).select('username');

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function removeUserFromGroup(req, res) {
  const groupId = req.params.groupId;
  const userId = req.params.userId;
  const { id } = req.user;

  if (userId === id) {
    return res.status(400).json({ message: 'Cannot remove yourself' });
  }

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // remove the user from the group
    group.members = group.members.filter((member) => member != userId);

    await group.save();

    return res.status(200).json({ message: 'User removed from group' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
async function deleteAllGroups(req, res) {
  // check if user is admin first then delete all groups
  const currentUser = req.user;

  console.log(currentUser.username);
  if (currentUser.username !== 'admin' && currentUser.username !== 'Admin') {
    return res.status(401).json({ message: 'Not admin gtfo' });
  }
  try {
    // Gotta delete everything since we have no cascading deletes
    await Task.deleteMany({});
    await Meeting.deleteMany({});
    await Group.deleteMany({});
    return res.status(200).json({ message: 'All groups deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createGroup,
  getAllGroups,
  getGroup,
  deleteGroup,
  getMyGroups,
  InviteMemberToGroup,
  setResource,
  joinGroup,
  getUsersFromGroup,
  removeUserFromGroup,
  getUserFromGroup,
  deleteAllGroups,
};
