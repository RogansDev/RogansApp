import axios from "axios";

const useApiService = () => {
  const sendNotificationPush = async (
    token: string,
    title: string,
    body: string
  ) => {
    try {
      const response = await axios.post(
        // https://roganscare.com:5500
        "http://192.168.100.34:3000/api/send-notification",
        { token, title, body },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", JSON.stringify(response.data, null, 5));
      if (response.data.success) {
        console.log("Notification sent successfully");
      } else {
        console.log("Error sending notification:", response.data.message);
      }
      return response.data;
    } catch (error) {
      console.error("Error sending notification:", error);
      throw error;
    }
  };

  return { sendNotificationPush };
};

export default useApiService;
