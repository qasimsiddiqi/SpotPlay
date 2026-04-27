import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import store from "./redux/store";
import { Provider } from "react-redux";

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
      <Provider store={store}>
        <AppContentInner />
      </Provider>
    </>
  );
}

export default App;
