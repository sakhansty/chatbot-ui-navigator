
/**
 * Service to handle communication with n8n workflows
 */

export interface N8nChatResponse {
  message: string;
  success: boolean;
}

export const n8nService = {
  /**
   * Send message to n8n workflow and get response
   * @param message User message to send to n8n
   * @param chatId Current chat ID for context
   */
  async sendMessage(message: string, chatId: string): Promise<N8nChatResponse> {
    try {
      // Replace with your actual n8n webhook URL
      const n8nWebhookUrl = "https://your-n8n-instance.com/webhook/path";
      
      const response = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          chatId,
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        throw new Error(`n8n API error: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        message: data.message || "Sorry, I couldn't process your request.",
        success: true
      };
    } catch (error) {
      console.error("Error communicating with n8n:", error);
      return {
        message: "Sorry, I'm having trouble connecting to my backend services. Please try again later.",
        success: false
      };
    }
  }
};
