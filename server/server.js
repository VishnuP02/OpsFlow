const express = require("express");
const cors = require("cors");
require("dotenv").config();

const requestRoutes = require("./routes/requestRoutes");
const { startGrpcServer } = require("./grpc/metricsServer");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OpsFlow API is running");
});

app.use("/api/requests", requestRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`OpsFlow server running on port ${PORT} - server.js:22`);
  startGrpcServer();
});