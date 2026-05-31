function JobCard(props) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#f1f5f9",
      }}
    >
      <h2>{props.company}</h2>

      <p>Role: {props.role}</p>

      <p>Status: {props.status}</p>
    </div>
  );
}

export default JobCard;