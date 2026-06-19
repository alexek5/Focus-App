import { useEffect } from "react";
import NotificationButton from "./components/NotificationButton";
import "./App.css";

const PUBLIC_KEY = "BJz0vOk7ZAOnLC5cICvq147QSGFN8-lgyMqgEJdWyaNA5JGjpfhLo4YRNfazsPhWh773i20xvovTUM0xYgocPhc";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

export default function App() {

  useEffect(() => {
    Notification.requestPermission();

    async function setupPush() {

      if (!("serviceWorker" in navigator)) return;

      const reg = await navigator.serviceWorker.ready;

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY)
      });

      await fetch("/.netlify/functions/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ subscription: sub })
      });

    }

    setupPush();
  }, []);

  return (
    <div className="app">
      <NotificationButton />
    </div>
  );
}