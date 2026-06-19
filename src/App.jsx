import { useEffect } from "react";
import NotificationButton from "./components/NotificationButton";
import "./App.css";

export default function App() {

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  return (
    <div className="app">
      <NotificationButton />
    </div>
  );
}