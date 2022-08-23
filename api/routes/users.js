const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Le compte vient d'étre mis à jour.");
    } catch (error) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Vous pouvez maite à jour que votre compte.");
  }
});
//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Le compte vient d'étre supprimer avec succés.");
    } catch (error) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Vous pouvez supprimer que votre compte.");
  }
});

// get user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get friends

router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
});

//follow user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("l'utilisateur viens d'étre suivis.");
      } else {
        res.status(403).json("Vous avez déja suivis cet utilisateur");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Vous pouvez pas suivre vos meme.");
  }
});

//unfollow user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("l'utilisateur viens d'étres enlever des suivis.");
      } else {
        res
          .status(403)
          .json("Vous avez déja arréter de suivre cet utilisateur");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Vous pouvez pas ne pas suivre vos meme.");
  }
});

module.exports = router;
