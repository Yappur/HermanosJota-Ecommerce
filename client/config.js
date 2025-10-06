const API_BASE =
  import.meta.env.MODE === "production" ? "/api" : "http://localhost:5001/api";

export default API_BASE;
