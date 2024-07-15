const API_BASE_URL = "https://devapi.beyondchats.com/api";

export const fetchChats = async (page = 1) => {
  const response = await fetch(`${API_BASE_URL}/get_all_chats?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch chats");
  }
  return response.json();
};

export const fetchMessages = async (chatId) => {
  const response = await fetch(
    `${API_BASE_URL}/get_chat_messages?chat_id=${chatId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  return response.json();
};

export const fetchCalls = async () => {
  // Replace with the actual API endpoint for fetching call details
  const response = await fetch(`${API_BASE_URL}/get_calls`);
  if (!response.ok) {
    throw new Error("Failed to fetch calls");
  }
  return response.json();
};
// api.js

const BASE_URL = "https://devapi.beyondchats.com/api";

// Function to fetch chat messages by chat_id
export const fetchChatMessages = async (chatId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/get_chat_messages?chat_id=${chatId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch chat messages");
    }
    const data = await response.json();
    return data?.data?.data || []; // Assuming messages are nested in data.data.data
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw error;
  }
};
