async function getCosmeticById(cosmeticId: string): Promise<DataResponse<Cosmetic>> {
    const url = `https://fortnite-api.com/v2/cosmetics/br/${cosmeticId}`;
    
    try {
      const response = await axios.get(url);
      const data = response.data;
      
      if (data.status === 200) {
        const cosmetic: Cosmetic = data.data;
        const responseData: DataResponse<Cosmetic> = {
          success: true,
          data: cosmetic
        };
        return responseData;
      } else {
        throw new Error('Failed to retrieve cosmetic data');
      }
    } catch (error) {
      const responseData: DataResponse<Cosmetic> = {
        success: false,
        error: 'An error occurred while fetching the cosmetic data'
      };
      throw responseData;
    }
  }