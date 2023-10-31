import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Authorized } from "./views/Authorized"
import { useEffect } from "react"

export const App = () => {
  useEffect(() => {
    function handleUnload() {
      localStorage.removeItem('dentside_user');
    }

    window.addEventListener("beforeunload", handleUnload);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          // Check if the user is authorized first
          <Authorized>
            {/* ApplicationViews is the CHILD component of Authorized */}
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  )
}