async function getCosmeticById(cosmeticId) {
  const url = `https://fortnite-api.com/v2/cosmetics/br/${cosmeticId}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === 200) {
      const cosmetic = data.data;
      const responseData = {
        success: true,
        data: cosmetic,
      };
      return responseData;
    } else {
      throw new Error("Mislukt om cosmetische data op te halen.");
    }
  } catch (error) {
    const responseData = {
      success: false,
      error: "Error bij het ophalen van cosmetische data",
    };
    throw responseData;
  }
}

async function fetchPickaxes() {
  const url = "https://fortnite-api.com/v2/cosmetics/br/search/all?type=pickaxe&addedSince=1683129904";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 200) {
      const pickaxes = data.data;
      const responseData = {
        success: true,
        data: pickaxes,
      };
      return responseData;
    } else {
      throw new Error("Mislukt om pickaxen op te halen!");
    }
  } catch (error) {
    const responseData = {
      success: false,
      error: "Error bij het ophalen van pickaxen.",
    };
    throw responseData;
  }
}
