import User from '../model/User'

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req: any, res: any, next: any) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/test', async function (req: any, res: any, next: any) {
  let count = await User.countDocuments({ userName: "name" });
      if (count === 0) {
        let user = new User({ userName: "name", password: "pass" });
        user.save();
      } else {
        res.send("User count: " + count);
        return;
      }
  count = await User.countDocuments({ userName: "name" });
  res.send("User count: " + count);
 });

module.exports = router;
