import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "./supabaseClient";
import Auth from "./components/Auth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const PRIORITY_COLORS = {
  Low: "#22c55e",
  Medium: "#3b82f6",
  High: "#f59e0b",
  Urgent: "#ef4444",
};

function App() {
  const [session, setSession] = useState(undefined);
  const [requests, setRequests] = useState([]);
  const [role, setRole] = useState("user");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("opsflow-theme") === "dark"
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("IT");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("opsflow-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchProfile();
      fetchRequests();

      const channel = supabase
        .channel("requests-live")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "requests" },
          () => fetchRequests()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [session, role]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (data?.role) {
      setRole(data.role);
    } else {
      await supabase.from("profiles").upsert([
        {
          id: session.user.id,
          email: session.user.email,
          role: "user",
        },
      ]);
      setRole("user");
    }
  };

  const fetchRequests = async () => {
    let query = supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (role !== "admin") {
      query = query.eq("user_id", session.user.id);
    }

    const { data, error } = await query;

    if (error) {
      toast.error("Unable to load requests.");
      return;
    }

    setRequests(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !assignedTo || !dueDate) {
      toast.error("Please fill out all fields.");
      return;
    }

    const { error } = await supabase.from("requests").insert([
      {
        user_id: session.user.id,
        title,
        description,
        priority,
        category,
        assigned_to: assignedTo,
        due_date: dueDate,
        status: "Open",
      },
    ]);

    if (error) {
      toast.error("Error submitting request.");
      return;
    }

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setCategory("IT");
    setAssignedTo("");
    setDueDate("");

    toast.success("Request submitted successfully.");
    fetchRequests();
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from("requests")
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      toast.error("Unable to update status.");
      return;
    }

    toast.success("Status updated.");
    fetchRequests();
  };

  const deleteRequest = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this request?"
    );

    if (!confirmed) return;

    const { error } = await supabase.from("requests").delete().eq("id", id);

    if (error) {
      toast.error("Unable to delete request.");
      return;
    }

    toast.success("Request deleted.");
    fetchRequests();
  };

  const exportCSV = () => {
    if (requests.length === 0) {
      toast.error("No requests to export.");
      return;
    }

    const headers = [
      "Title",
      "Description",
      "Category",
      "Priority",
      "Status",
      "Assigned To",
      "Due Date",
      "Created At",
    ];

    const rows = requests.map((req) => [
      req.title,
      req.description,
      req.category,
      req.priority,
      req.status,
      req.assigned_to,
      req.due_date,
      req.created_at,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value || "").replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "opsflow-requests.csv";
    link.click();

    URL.revokeObjectURL(url);
    toast.success("CSV exported.");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setRequests([]);
    toast.success("Logged out successfully.");
  };

  const isOverdue = (req) => {
    if (!req.due_date || req.status === "Resolved") return false;

    const today = new Date();
    const due = new Date(req.due_date);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    return due < today;
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesSearch =
        req.title?.toLowerCase().includes(search.toLowerCase()) ||
        req.description?.toLowerCase().includes(search.toLowerCase()) ||
        req.category?.toLowerCase().includes(search.toLowerCase()) ||
        req.assigned_to?.toLowerCase().includes(search.toLowerCase());

      const matchesPriority =
        priorityFilter === "All" || req.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "All" || req.status === statusFilter;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [requests, search, priorityFilter, statusFilter]);

  const priorityOrder = {
    Urgent: 4,
    High: 3,
    Medium: 2,
    Low: 1,
  };

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (isOverdue(a) && !isOverdue(b)) return -1;
    if (!isOverdue(a) && isOverdue(b)) return 1;

    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const metrics = {
    total: requests.length,
    open: requests.filter((r) => r.status === "Open").length,
    resolved: requests.filter((r) => r.status === "Resolved").length,
    urgent: requests.filter((r) => r.priority === "Urgent").length,
    overdue: requests.filter((r) => isOverdue(r)).length,
  };

  const priorityData = ["Low", "Medium", "High", "Urgent"].map((level) => ({
    name: level,
    count: requests.filter((r) => r.priority === level).length,
  }));

  const statusData = ["Open", "In Progress", "Waiting", "Resolved"].map(
    (status) => ({
      name: status,
      value: requests.filter((r) => r.status === status).length,
    })
  );

  if (session === undefined) {
    return <div className="loading-screen">Loading OpsFlow...</div>;
  }

  if (!session) return <Auth />;

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-top">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <button className="export-btn" type="button" onClick={exportCSV}>
            Export CSV
          </button>

          <button className="logout-btn" type="button" onClick={logout}>
            Logout
          </button>
        </div>

        <h1>OpsFlow</h1>
        <p>Enterprise Workflow Management Dashboard</p>
        <p className="user-email">
          {session.user.email} · {role === "admin" ? "Admin" : "User"}
        </p>
      </header>

      <section className="metrics">
        <MetricCard title="Total Requests" value={metrics.total} />
        <MetricCard title="Open Requests" value={metrics.open} />
        <MetricCard title="Resolved Requests" value={metrics.resolved} />
        <MetricCard title="Urgent Requests" value={metrics.urgent} />
        <MetricCard title="Overdue" value={metrics.overdue} />
      </section>

      <section className="charts">
        <div className="chart-card">
          <h2>Requests by Priority</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={priorityData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count">
                {priorityData.map((entry) => (
                  <Cell key={entry.name} fill={PRIORITY_COLORS[entry.name]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} dataKey="value" outerRadius={85} label>
                {statusData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={
                      ["#3b82f6", "#f59e0b", "#6b7280", "#22c55e"][index]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="main-layout">
        <form className="request-form" onSubmit={handleSubmit}>
          <h2>Create New Request</h2>

          <input
            placeholder="Request Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Request Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </select>

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Banking</option>
            <option>IT</option>
            <option>HR</option>
            <option>Security</option>
            <option>Operations</option>
            <option>Facilities</option>
          </select>

          <input
            placeholder="Assigned To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button type="submit">Submit Request</button>
        </form>

        <div className="request-panel">
          <div className="panel-header">
            <h2>Workflow Requests</h2>

            <div className="filters">
              <input
                placeholder="Search requests..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option>All</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Waiting</option>
                <option>Resolved</option>
              </select>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Due</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {sortedRequests.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">
                    No workflow requests found.
                  </td>
                </tr>
              ) : (
                sortedRequests.map((req) => (
                  <tr
                    key={req.id}
                    className={isOverdue(req) ? "overdue-row" : ""}
                  >
                    <td>
                      <strong>{req.title}</strong>
                      <span>{req.description}</span>
                      {isOverdue(req) && (
                        <span className="overdue-label">Overdue</span>
                      )}
                    </td>

                    <td>
                      <span
                        className={`category-badge ${req.category?.toLowerCase()}`}
                      >
                        {req.category}
                      </span>
                    </td>

                    <td>
                      <span className={`badge ${req.priority.toLowerCase()}`}>
                        {req.priority}
                      </span>
                    </td>

                    <td>
                      <select
                        className={`status-select ${req.status
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                        value={req.status}
                        onChange={(e) => updateStatus(req.id, e.target.value)}
                      >
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Waiting</option>
                        <option>Resolved</option>
                      </select>
                    </td>

                    <td>{req.assigned_to}</td>
                    <td>{req.due_date || "N/A"}</td>
                    <td>{new Date(req.created_at).toLocaleDateString()}</td>

                    <td>
                      <button
                        className="delete-btn"
                        type="button"
                        onClick={() => deleteRequest(req.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="metric-card">
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
}

export default App;