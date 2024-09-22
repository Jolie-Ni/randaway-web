export const fetchDataFromApi = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postSoftDeleteToApi = async <T>(
  endpoint: string,
  payload: object,
): Promise<T> => {
  try {
    const response = await fetch(endpoint, {
      method: "POST", // POST request for soft delete
      headers: {
        "Content-Type": "application/json", // Adjust headers if needed
      },
      body: JSON.stringify(payload), // Send payload for soft delete (e.g., { id: 123 })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting soft delete:", error);
    throw error; // Re-throw the error for further handling
  }
};
