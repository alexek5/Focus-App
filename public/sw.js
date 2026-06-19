self.addEventListener("push", (event) => {

  const data = event.data?.json() || {};

  self.registration.showNotification(data.title || "Focus App", {
    body: data.body || "New event"
  });

});