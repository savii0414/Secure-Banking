import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "./context/SessionContext";

function App() {
  return (
    <div className="bg-slate-100 h-screen">
      <div className="flex justify-center items-center h-screen">
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
      </div>
    </div>
  );
}

export default App;
