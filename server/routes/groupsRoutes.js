const express = require("express");
const router = express.Router();
const groupsController = require("../controllers/groupsController");

router.route("/").get(groupsController.getAllGroups).post(groupsController.createGroup);
router
  .route("/:id")
  .get(groupsController.getGroup)
  .put(groupsController.updateGroup)
  .delete(groupsController.deleteGroup);

module.exports = router;
