import { useNotifications } from "../hooks/useNotifications";

export default function NotificationButton() {
  const { permission, requestPermission, sendNotification } =
    useNotifications();

  async function handleClick() {
    if (permission !== "granted") {
      const result = await requestPermission();
      if (result !== "granted") return;
    }

    sendNotification("Welcome to your Focus App!");
  }

  return (
    <div>
      <button onClick={handleClick}>
        Test Notification
      </button>

      <p>Status: {permission}</p>
    </div>
  );
}