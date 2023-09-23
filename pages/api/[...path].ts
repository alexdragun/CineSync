const BASE_URL = "https://api.themoviedb.org/3";

export default async function handler(req, res) {
  try {
    const modifiedUrl = req.url.replace(/^\/api\//, "/");

    const response = await fetch(
      `${BASE_URL}${modifiedUrl}?api_key=${process.env.API_KEY}`
    ).then((response) => response.json());

    const isValid = !response.hasOwnProperty("success") && !response.success;

    if (isValid) {
      res.status(200).json(response);
    } else {
      throw response;
    }
  } catch (error) {
    let formattedStatusCode;
    switch (error.status_code) {
      case 34:
        formattedStatusCode = 404;
        break;

      default:
        formattedStatusCode = error.status_code || 500;
        break;
    }
    res.status(formattedStatusCode).json({ error: error.status_message });
  }
}
