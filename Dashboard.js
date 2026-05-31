import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/jobs"
      );

      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addJob = async () => {
    try {
      await axios.post(
        "http://localhost:5000/jobs",
        {
          company,
          role,
          status,
        }
      );

      clearForm();
      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  };

  const updateJob = async () => {
    try {
      await axios.put(
        `http://localhost:5000/jobs/${editId}`,
        {
          company,
          role,
          status,
        }
      );

      clearForm();
      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/jobs/${id}`
      );

      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  };

  const editJob = (job) => {
    setEditId(job._id);
    setCompany(job.company);
    setRole(job.role);
    setStatus(job.status);
  };

  const clearForm = () => {
    setCompany("");
    setRole("");
    setStatus("");
    setEditId(null);
  };

  const filteredJobs = jobs.filter((job) => {
    const companyMatch = job.company
      .toLowerCase()
      .includes(search.toLowerCase());

    const statusMatch =
      filterStatus === "All" ||
      job.status === filterStatus;

    return companyMatch && statusMatch;
  });

  const totalJobs = jobs.length;
  const appliedCount = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviewCount = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offerCount = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  const rejectedCount = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  return (
    <div className="dashboard-container">
      <h1 className="title">
        Job Application Tracker
      </h1>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total</h3>
          <h2>{totalJobs}</h2>
        </div>

        <div className="stat-card">
          <h3>Applied</h3>
          <h2>{appliedCount}</h2>
        </div>

        <div className="stat-card">
          <h3>Interview</h3>
          <h2>{interviewCount}</h2>
        </div>

        <div className="stat-card">
          <h3>Offer</h3>
          <h2>{offerCount}</h2>
        </div>

        <div className="stat-card">
          <h3>Rejected</h3>
          <h2>{rejectedCount}</h2>
        </div>
      </div>

      <div className="form-container">
        <h2>
          {editId ? "Edit Job" : "Add Job"}
        </h2>

        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="">
            Select Status
          </option>
          <option value="Applied">
            Applied
          </option>
          <option value="Interview">
            Interview
          </option>
          <option value="Offer">
            Offer
          </option>
          <option value="Rejected">
            Rejected
          </option>
        </select>

        {editId ? (
          <button
            className="btn"
            onClick={updateJob}
          >
            Update Job
          </button>
        ) : (
          <button
            className="btn"
            onClick={addJob}
          >
            Add Job
          </button>
        )}
      </div>

      <div className="form-container">
        <input
          type="text"
          placeholder="Search Company"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value)
          }
        >
          <option value="All">
            All Status
          </option>
          <option value="Applied">
            Applied
          </option>
          <option value="Interview">
            Interview
          </option>
          <option value="Offer">
            Offer
          </option>
          <option value="Rejected">
            Rejected
          </option>
        </select>
      </div>

      <h2>Applications</h2>

      {filteredJobs.map((job) => (
        <div
          key={job._id}
          className="job-card"
        >
          <h3>{job.company}</h3>

          <p>{job.role}</p>

          <p>
            <strong>Status:</strong>{" "}
            {job.status}
          </p>

          <button
            className="edit-btn"
            onClick={() => editJob(job)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() =>
              deleteJob(job._id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;