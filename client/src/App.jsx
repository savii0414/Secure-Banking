import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "./context/SessionContext";

function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </SessionProvider>
  );
}

export default App;
