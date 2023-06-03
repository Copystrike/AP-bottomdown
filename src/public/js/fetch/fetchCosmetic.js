async function getCosmeticById(cosmeticId) {
  const url = `https://fortnite-api.com/v2/cosmetics/br/${cosmeticId}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === 200) {
      const cosmetic = data.data;
      const responseData = {
        success: true,
        data: cosmetic
      };
      return responseData;
    } else {
      throw new Error('Failed to retrieve cosmetic data');
    }
  } catch (error) {
    const responseData = {
      success: false,
      error: 'An error occurred while fetching the cosmetic data'
    };
    throw responseData;
  }
}


async function fetchPickaxes() {
  const url = 'https://fortnite-api.com/v2/cosmetics/br/search/all?type=pickaxe&addedSince=1683129904';

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 200) {
      const pickaxes = data.data;
      const responseData = {
        success: true,
        data: pickaxes
      };
      return responseData;
    } else {
      throw new Error('Failed to retrieve pickaxes');
    }
  } catch (error) {
    const responseData = {
      success: false,
      error: 'An error occurred while fetching the pickaxes'
    };
    throw responseData;
  }
}