const router = require('express').Router();
const User = require('./db/User');

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

router.post('/api/exercise/new-user', async (req, res) => {
  const user = await User.find({ username: req.body.username });

  if (user.length > 0) {
    return res.send('username is already taken');
  }

  const newUser = new User({
    username: req.body.username
  });

  newUser.save((err, data) => {
    if (err) throw new Error(err);

    return res.send({ _id: data._id, username: data.username });
  });
});

router.get('/api/exercise/users', async (req, res) => {
  const users = await User.find({}).select({ _id: 1, username: 1 });
  return res.send(users);
});

router.post('/api/exercise/add', async (req, res) => {
  const record = {
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date
  };

  try {
    const user = await User.findById(req.body.userId);

    if (user === null) {
      return res.send('User id not found');
    }

    try {
      user.logs.push(record);
      const result = await user.save();

      data = {
        _id: result._id,
        username: result.username,
        date: result.logs[result.logs.length - 1].date.toDateString(),
        description: result.logs[result.logs.length - 1].description,
        duration: result.logs[result.logs.length - 1].duration
      };
      return res.send({ data });
    } catch (error) {
      return res.send(error.message);
    }
  } catch (error) {
    return res.send('Invalid user id');
  }
});

router.get('/api/exercise/log', async (req, res) => {
  const userId = req.query.userId;
  const to = req.query.to && new Date(req.query.to);
  const from = req.query.from && new Date(req.query.from);
  const limit = Number(req.query.limit);

  if (!userId) return res.send('No userId provided!');

  let user;

  try {
    user = await User.findById(userId);
  } catch (error) {
    return res.send('Invalid userId');
  }

  if (from && to) {
    user.logs = user.logs.filter((log) => {
      return log.date >= from && log.date <= to;
    });
  }

  if (limit) {
    user.logs = user.logs.slice(0, limit);
  }

  const response = {
    _id: user._id,
    username: user.username,
    count: user.logs.length,
    logs: user.logs
  };

  res.send(response);
});

module.exports = router;
