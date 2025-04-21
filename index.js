export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const body = req.body;

  const params = new URLSearchParams();
  for (const key in body) {
    params.append(key, body[key]);
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyzhPf4xQMesBL0H4vxDJvygV7GFvkpSs0hIlucv2uWhb2umFz1wKQ9fp9UYnjjP3liVg/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const text = await response.text();
    return res.status(200).send(text);
  } catch (error) {
    return res.status(500).json({ message: "Failed to forward request", error: error.toString() });
  }
}
