import { RouterProvider } from 'react-router-dom';
import "./App.css";
import router from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="bg-slate-100 h-screen">
      <div className="flex justify-center items-center h-screen">
        <RouterProvider router={router}/>
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
      </div>
    </div>
  );
}

export default App;