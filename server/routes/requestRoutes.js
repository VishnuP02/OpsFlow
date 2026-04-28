const express = require("express");
const {
  getRequests,
  createRequest,
  updateRequestStatus,
  deleteRequest,
} = require("../controllers/requestController");

const router = express.Router();

router.get("/", getRequests);
router.post("/", createRequest);
router.patch("/:id/status", updateRequestStatus);
router.delete("/:id", deleteRequest);

module.exports = router;