import Login from "./components/auth/login";
// import Layout from "./components/layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function LoginPage() {
  return (
    <div title="Login">
      <Login />
      <ToastContainer position="bottom-right" />
    </div>
  );
}
