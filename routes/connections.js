const express = require("express");

const router = express.Router();

const {
  confirmConnnection,
  requestConnect,
  getConnections,
  getConnectionsReq,
  getMutualConnections,
} = require("../controllers/connectionControl");

const authenticate = require("../middleware/authenticate");

router.route("/connect").post(authenticate, requestConnect);

router.route("/connect/:id").get(authenticate, getConnectionsReq);

router.route("/connect/confirm").post(authenticate, confirmConnnection);

router.route("/connections/:id").get(authenticate, getConnections);

router.route("/connections/mutual/:id").get(authenticate, getMutualConnections);

module.exports = router;
