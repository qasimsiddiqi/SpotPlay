import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";

function AppContentInner() {
  const router = createBrowserRouter(routes);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

function App() {
  return (
    <>
      <AppContentInner />
    </>
  );
}

export default App;
