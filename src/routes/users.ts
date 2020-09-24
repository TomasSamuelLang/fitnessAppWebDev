import User from '../model/User'
import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/test', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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

export default router;
