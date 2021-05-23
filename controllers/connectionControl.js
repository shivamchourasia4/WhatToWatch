const connections = require("../models/connections");
const user = require("../models/user");

//method post
/*
request body
{
    "id": "608517dfc72db72168e31c5a",
    "c_id": "60851856c72db72168e31c5f"
}*/
exports.requestConnect = async (req, res, next) => {
  try {
    const reqbody = req.body;

    const ConnectEntity = new connections({
      connectId: reqbody.id,
    });

    try {
      const addConnect = await user.findByIdAndUpdate(reqbody.c_id, {
        $push: { connections: ConnectEntity },
      });

      if (addConnect.nModified === 0) {
        return res.status(400).json({
          success: false,
          data: addConnect,
          msg: "Not A Valid Connection Id",
        });
      }

      return res.status(201).json({
        success: true,
        msg: "Connect Request Sent!",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        msg: "Not A Valid Id",
      });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

//care to be taken with id ans c_id
exports.confirmConnnection = async (req, res, body) => {
  try {
    try {
      const reqbody = req.body;

      const ConnectSide = new connections({
        connectId: reqbody.id,
        confirmed: true,
      });

      const update = await user.updateOne(
        { _id: reqbody.id, "connections.connectId": reqbody.c_id },
        {
          $set: { "connections.$.confirmed": true },
        }
      );

      const sideConnect = await user.findByIdAndUpdate(reqbody.c_id, {
        $push: { connections: ConnectSide },
      });

      if (update.nModified === 0 || sideConnect.nModified === 0) {
        return res.status(400).json({
          success: false,
          data: update,
          msg: "Not A Valid Connection Id",
        });
      }

      return res.status(201).json({
        success: true,
        data: update,
        msg: "Request Confirmed!",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        msg: "Not A Valid Id",
      });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

//Get Connections.

exports.getConnections = async (req, res, next) => {
  const connections = await user.findById(req.params.id).then((user) => {
    res.json(user.connections.filter((conf) => conf.confirmed === true));
  });
};

//get Connection Requests.
exports.getConnectionsReq = async (req, res, next) => {
  const connections = await user.findById(req.params.id).then((user) => {
    res.json(user.connections.filter((conf) => conf.confirmed === false));
  });
};
