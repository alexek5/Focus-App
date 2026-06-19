let latestEvent = null;

export async function handler(event) {

  if (event.httpMethod === "POST") {

    latestEvent = JSON.parse(event.body);

    return {
      statusCode: 200,
      body: "OK"
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(latestEvent)
  };
}