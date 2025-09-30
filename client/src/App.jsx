import { useState, useEffect } from "react";
import NavBar from "./components/Navbar";
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <Index />
    </>
  );
}

export default App;
