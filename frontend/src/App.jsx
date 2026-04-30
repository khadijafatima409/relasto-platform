import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Listings from "./pages/Listings";
// import PropertyDetail from "./pages/PropertyDetail";
// import AgentList from "./pages/AgentList";
// import AgentProfile from "./pages/AgentProfile";
// import Contact from "./pages/Contact";
// import AddProperty from "./pages/AddProperty";
// import NotFound from "./pages/NotFound";
// import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/listings/:slug" element={<PropertyDetail />} />
      <Route path="/agents" element={<AgentList />} />
      <Route path="/agents/:id" element={<AgentProfile />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/add-property"
        element={
          <ProtectedRoute>
            <AddProperty />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
