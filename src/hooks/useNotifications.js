import { useState } from "react";

export function useNotifications() {
  const [permission, setPermission] =
    useState(Notification.permission);

  async function requestPermission() {
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }

  async function sendNotification(title) {
    const registration = await navigator.serviceWorker.ready;

    registration.showNotification(title);
  }

  return {
    permission,
    requestPermission,
    sendNotification,
  };
}