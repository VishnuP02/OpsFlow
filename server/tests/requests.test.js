const request = require("supertest");
const express = require("express");
const cors = require("cors");

// Mock the database pool before importing routes
jest.mock("../config/db", () => ({
  query: jest.fn(),
}));

const pool = require("../config/db");
const requestRoutes = require("../routes/requestRoutes");

// Build a minimal Express app for testing
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.send("OpsFlow API is running"));
app.use("/api/requests", requestRoutes);

beforeEach(() => {
  jest.clearAllMocks();
});

// ── Health check ──────────────────────────────────────────────
describe("GET /", () => {
  it("returns 200 and health message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("OpsFlow API is running");
  });
});

// ── GET /api/requests ─────────────────────────────────────────
describe("GET /api/requests", () => {
  it("returns all requests as JSON", async () => {
    const mockRows = [
      { id: 1, title: "Fix login bug", priority: "High", status: "Open" },
      { id: 2, title: "Update dashboard", priority: "Medium", status: "In Progress" },
    ];
    pool.query.mockResolvedValueOnce({ rows: mockRows });

    const res = await request(app).get("/api/requests");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockRows);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  it("returns 500 on database error", async () => {
    pool.query.mockRejectedValueOnce(new Error("DB connection failed"));

    const res = await request(app).get("/api/requests");
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Error fetching requests");
  });
});

// ── POST /api/requests ────────────────────────────────────────
describe("POST /api/requests", () => {
  it("creates a new request and returns 201", async () => {
    const newRequest = {
      title: "New Feature",
      description: "Add export functionality",
      priority: "Medium",
      status: "Open",
      assigned_to: "Alice",
    };
    const mockCreated = { id: 3, ...newRequest };
    pool.query.mockResolvedValueOnce({ rows: [mockCreated] });

    const res = await request(app).post("/api/requests").send(newRequest);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(mockCreated);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });

  it("returns 500 on database error", async () => {
    pool.query.mockRejectedValueOnce(new Error("Insert failed"));

    const res = await request(app)
      .post("/api/requests")
      .send({ title: "Test", description: "Test", priority: "Low", status: "Open", assigned_to: "Bob" });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Error creating request");
  });
});

// ── PATCH /api/requests/:id/status ───────────────────────────
describe("PATCH /api/requests/:id/status", () => {
  it("updates request status and returns updated row", async () => {
    const mockUpdated = { id: 1, status: "Resolved" };
    pool.query.mockResolvedValueOnce({ rows: [mockUpdated] });

    const res = await request(app)
      .patch("/api/requests/1/status")
      .send({ status: "Resolved" });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("Resolved");
  });

  it("returns 500 on database error", async () => {
    pool.query.mockRejectedValueOnce(new Error("Update failed"));

    const res = await request(app)
      .patch("/api/requests/1/status")
      .send({ status: "Resolved" });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Error updating request status");
  });
});

// ── DELETE /api/requests/:id ──────────────────────────────────
describe("DELETE /api/requests/:id", () => {
  it("deletes a request and returns success message", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).delete("/api/requests/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Request deleted successfully");
  });

  it("returns 500 on database error", async () => {
    pool.query.mockRejectedValueOnce(new Error("Delete failed"));

    const res = await request(app).delete("/api/requests/1");
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Error deleting request");
  });
});