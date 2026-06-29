/**
 * OpsFlow gRPC Metrics Server
 * Exposes workflow statistics via gRPC for consumption by external analytics clients.
 * Runs alongside the REST API server on port 50051.
 */

const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const pool = require("../config/db");

const PROTO_PATH = path.join(__dirname, "../proto/metrics.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const opsflowProto = grpc.loadPackageDefinition(packageDefinition).opsflow;

// Fetch current metrics from PostgreSQL
async function fetchMetrics() {
  const result = await pool.query(`
    SELECT
      COUNT(*)                                             AS total_requests,
      COUNT(*) FILTER (WHERE status = 'Open')             AS open_requests,
      COUNT(*) FILTER (WHERE status = 'Resolved')         AS resolved_requests,
      COUNT(*) FILTER (WHERE priority = 'Urgent')         AS urgent_requests,
      COUNT(*) FILTER (
        WHERE due_date < CURRENT_DATE
        AND   status  != 'Resolved'
      )                                                    AS overdue_requests
    FROM requests
  `);

  const row = result.rows[0];
  return {
    total_requests:    parseInt(row.total_requests)    || 0,
    open_requests:     parseInt(row.open_requests)     || 0,
    resolved_requests: parseInt(row.resolved_requests) || 0,
    urgent_requests:   parseInt(row.urgent_requests)   || 0,
    overdue_requests:  parseInt(row.overdue_requests)  || 0,
    timestamp:         new Date().toISOString(),
  };
}

// Unary RPC — single snapshot of metrics
async function getMetrics(call, callback) {
  try {
    const metrics = await fetchMetrics();
    callback(null, metrics);
  } catch (err) {
    callback({ code: grpc.status.INTERNAL, message: err.message });
  }
}

// Server-streaming RPC — pushes metrics every 5 seconds
async function streamMetrics(call) {
  const interval = setInterval(async () => {
    try {
      const metrics = await fetchMetrics();
      call.write(metrics);
    } catch (err) {
      clearInterval(interval);
      call.destroy(err);
    }
  }, 5000);

  call.on("cancelled", () => clearInterval(interval));
  call.on("close",     () => clearInterval(interval));
}

function startGrpcServer() {
  const server = new grpc.Server();

  server.addService(opsflowProto.MetricsService.service, {
    getMetrics,
    streamMetrics,
  });

  const port = process.env.GRPC_PORT || "50051";
  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, boundPort) => {
      if (err) {
        console.error("gRPC server failed to start:", err);
        return;
      }
      console.log(`gRPC Metrics Server running on port ${boundPort}`);
    }
  );

  return server;
}

module.exports = { startGrpcServer };
