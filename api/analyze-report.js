export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      message: "Medical report API is running.",
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const response = await fetch(
      "https://smart-hospital-ai-kgqh.onrender.com/api/analyze-report",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const responseText = await response.text();

    res.status(response.status);

    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") ||
        "application/json"
    );

    return res.send(responseText);
  } catch (error) {
    console.error("Render backend error:", error);

    return res.status(500).json({
      error: "Unable to connect to the AI backend.",
    });
  }
}