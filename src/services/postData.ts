export const postDatatoApi = async <T>(
  endpoint: string,
  payload: T,
): Promise<void> => {
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

    await response.json();
  } catch (error) {
    // eslint-disable-next-line
    console.error("Error posting soft delete:", error);
    throw error; // Re-throw the error for further handling
  }
};
