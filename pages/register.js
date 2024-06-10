import Layout from "./components/layout/Layout";
import Register from "./components/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  return (
    < div title="Register">
      <Register />
      <ToastContainer position="bottom-right" />
    </div>
  );
}
