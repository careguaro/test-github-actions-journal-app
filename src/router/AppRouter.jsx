import { Navigate, Route, Routes } from "react-router-dom"
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { AuthRoutes } from "../auth"
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
  const status = useCheckAuth();

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>
      {
        (status === 'authenticated')
          ? <Route path="/*" element={<JournalRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
      }


      {/* Login y Registro */}
      <Route path="/*" element={<Navigate to="/auth/login"/>} />

      {/* JournalApp */}
      {/* <Route path="/*" element={<JournalRoutes />} /> */}
    </Routes>
  );
}
