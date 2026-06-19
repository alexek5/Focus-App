export default function NotificationButton() {

  async function handleClick() {
    try {
      if (!("Notification" in window)) {
        alert("Notifications not supported");
        return;
      }

      const permission = await Notification.requestPermission();

      if (permission !== "granted") return;

      if ("serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.getRegistration();

        if (reg) {
          reg.showNotification("Hello from Focus App");
        } else {
          new Notification("Hello from Focus App");
        }
      } else {
        new Notification("Hello from Focus App");
      }

    } catch (err) {
      console.log("Notification error:", err);
    }
  }

  return (
    <button onClick={handleClick}>
      Send Notification
    </button>
  );
}