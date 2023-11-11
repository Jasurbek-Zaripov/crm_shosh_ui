import { message } from "antd";
import { Outlet } from "react-router-dom";
import "./app.css";
import RouterComponent from "./router";

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  window.onunhandledrejection = (event) => {
    messageApi.open({
      type: "error",
      duration: 10,
      content: `${event.reason?.response?.data?.message || event.reason}`,
    });
  };

  window.onerror = function (message, source, lineNumber, colno, error) {
    console.warn(`UNHANDLED ERROR: ${error.stack}`);
  };

  return (
    <>
      {contextHolder}
      <RouterComponent />
      <Outlet />
    </>
  );
}

export default App;
