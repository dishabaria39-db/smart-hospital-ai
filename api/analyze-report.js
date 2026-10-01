export async function POST(request) {
  try {
    const body = await request.text();

    const response = await fetch(
      "https://smart-hospital-ai-kgqh.onrender.com/api/analyze-report",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );

    const responseText = await response.text();

    return new Response(responseText, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ||
          "application/json",
      },
    });
  } catch (error) {
    console.error("Render backend error:", error);

    return Response.json(
      {
        error: "Unable to connect to the AI backend.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json(
    {
      message: "Medical report API is running.",
    },
    { status: 200 }
  );
}