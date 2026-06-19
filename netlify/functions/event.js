let latestEvent = null;

export async function handler(event) {

  // POST = spara event
  if (event.httpMethod === "POST") {
    latestEvent = JSON.parse(event.body);

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true
      })
    };
  }

  // GET = hämta senaste event
  return {
    statusCode: 200,
    body: JSON.stringify(latestEvent)
  };
}