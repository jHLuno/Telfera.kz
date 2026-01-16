/**
 * WhatsApp notification utility
 * Supports multiple WhatsApp API providers
 */

import { PRODUCT_LABELS } from "@/lib/constants";

interface WhatsAppConfig {
  apiUrl?: string;
  apiKey?: string;
  groupId?: string;
  enabled?: boolean;
}

/**
 * Get WhatsApp configuration from environment variables
 */
function getWhatsAppConfig(): WhatsAppConfig {
  return {
    apiUrl: process.env.WHATSAPP_API_URL,
    apiKey: process.env.WHATSAPP_API_KEY,
    groupId: process.env.WHATSAPP_GROUP_ID,
    enabled: process.env.WHATSAPP_ENABLED === "true",
  };
}

/**
 * Format lead information for WhatsApp message
 */
function formatLeadMessage(data: {
  name: string;
  phone: string;
  product: string;
}): string {
  const productLabel = PRODUCT_LABELS[data.product as keyof typeof PRODUCT_LABELS] || data.product;
  
  return `🆕 *Новая заявка с сайта*

👤 *Имя:* ${data.name}
📞 *Телефон:* ${data.phone}
📦 *Продукт:* ${productLabel}

⏰ Время: ${new Date().toLocaleString("ru-RU", {
    timeZone: "Asia/Almaty",
    dateStyle: "short",
    timeStyle: "short",
  })}
`;
}

/**
 * Send message via Green API (green-api.com)
 * 
 * API Key format: "idInstance:apiTokenInstance" or just "idInstance" (if apiTokenInstance is separate)
 * For Green API, the URL format is: /waInstance{idInstance}/sendMessage/{apiTokenInstance}
 */
async function sendViaGreenAPI(
  message: string,
  groupId: string,
  apiUrl: string,
  apiKey: string
): Promise<boolean> {
  try {
    // Parse API key - can be "idInstance:apiTokenInstance" or just "idInstance"
    const [idInstance, apiTokenInstance] = apiKey.includes(":")
      ? apiKey.split(":", 2)
      : [apiKey, process.env.WHATSAPP_API_TOKEN || apiKey];
    
    // Ensure groupId has @g.us suffix if not present
    const chatId = groupId.includes("@") ? groupId : `${groupId}@g.us`;
    
    const url = `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: chatId,
        message: message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Green API error:", errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message via Green API:", error);
    return false;
  }
}

/**
 * Send message via WhatsApp Business API (official)
 */
async function sendViaBusinessAPI(
  message: string,
  groupId: string,
  apiUrl: string,
  apiKey: string
): Promise<boolean> {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: groupId,
        type: "text",
        text: {
          body: message,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("WhatsApp Business API error:", errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message via Business API:", error);
    return false;
  }
}

/**
 * Send message via generic HTTP API
 */
async function sendViaGenericAPI(
  message: string,
  groupId: string,
  apiUrl: string,
  apiKey?: string
): Promise<boolean> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        chatId: groupId,
        message: message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Generic API error:", errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message via Generic API:", error);
    return false;
  }
}

/**
 * Send WhatsApp notification about a new lead
 * 
 * @param leadData - Lead information (name, phone, product)
 * @returns Promise<boolean> - true if message was sent successfully
 */
export async function sendWhatsAppNotification(leadData: {
  name: string;
  phone: string;
  product: string;
}): Promise<boolean> {
  const config = getWhatsAppConfig();

  // Check if WhatsApp notifications are enabled
  if (!config.enabled) {
    console.log("WhatsApp notifications are disabled");
    return false;
  }

  // Validate required configuration
  if (!config.apiUrl || !config.groupId) {
    console.warn("WhatsApp configuration is incomplete. Missing apiUrl or groupId");
    return false;
  }

  const message = formatLeadMessage(leadData);

  // Determine which API provider to use based on URL pattern
  const apiUrl = config.apiUrl.toLowerCase();
  
  if (apiUrl.includes("green-api") || apiUrl.includes("greenapi")) {
    if (!config.apiKey) {
      console.error("Green API requires apiKey");
      return false;
    }
    return await sendViaGreenAPI(message, config.groupId, config.apiUrl, config.apiKey);
  } else if (apiUrl.includes("graph.facebook.com") || apiUrl.includes("whatsapp")) {
    if (!config.apiKey) {
      console.error("WhatsApp Business API requires apiKey");
      return false;
    }
    return await sendViaBusinessAPI(message, config.groupId, config.apiUrl, config.apiKey);
  } else {
    // Generic API endpoint
    return await sendViaGenericAPI(message, config.groupId, config.apiUrl, config.apiKey);
  }
}
