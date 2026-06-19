import webpush from "web-push";

const PUBLIC_KEY = "BJz0vOk7ZAOnLC5cICvq147QSGFN8-lgyMqgEJdWyaNA5JGjpfhLo4YRNfazsPhWh773i20xvovTUM0xYgocPhc";
const PRIVATE_KEY = "CTRKUB8TrBSYH1pnRVg_Y9rThRkDK-sJUwM8wqFQBFk";

webpush.setVapidDetails(
  "mailto:test@test.com",
  PUBLIC_KEY,
  PRIVATE_KEY
);

// bara DU → en subscription
let subscription = null;

export async function handler(event) {

  const body = JSON.parse(event.body || "{}");

  // 1. Spara subscription från din PWA
  if (body.subscription) {
    subscription = body.subscription;

    return {
      statusCode: 200,
      body: "subscription saved"
    };
  }

  // 2. Shortcut trigger
  const eventType = body.event;

  let message = "Unknown event";

  if (eventType === "app") {
    message = "Instagram öppnades 📱";
  }

  if (eventType === "youtubeOpened") {
    message = "YouTube öppnades 🎥";
  }

  // 3. Skicka push till DIG
  if (subscription) {

    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Focus App",
        body: message
      })
    );
  }

  return {
    statusCode: 200,
    body: "ok"
  };
}