var express = require('express');
var router = express.Router();
var _ = require('lodash');
let users = [{
user : "Arthur",
id: "0"
}];

/* GET users listing. */
router.get('/', (req, res) => {
  res.status(200).json({users});
});

/* GET one user. */
router.get('/:id', (req, res) => {
	const {id} = req.params;
	const user = _.find(users, ["id",id]);
	res.status(200).json({
		message : 'User found!',
		user
	});
});
/*PUT new user. */
router.put('/', (req, res) => {
const {user} = req.body;
const id = _.uniqueId();
user.push({user,id});
res.json({
	message : 'Just added ${id}',
	user : { user, id}
});
});

/* UPDATE user. */
router.post('/:id', (req, res) => {
const {id} = req.params;
const {user} = req.body;
const userToUpdate = _.find(users, ["id",id]);
userToUpdate.user = user;
res.json({
	message : 'Just updated ${id} with ${user}'
});
});
/* DELETE user. */
router.delete('/:id', (req, res) => {
const {id} = req.params;
_.remove(users, ["id", id]);
res.json({
	message : 'Just removed ${id}'
});
});
module.exports = router;