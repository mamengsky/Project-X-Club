export interface DiscordEmbed {
  title: string;
  description: string;
  color: number;
  fields: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
  timestamp: string;
}

export interface DiscordWebhookPayload {
  content?: string;
  embeds: DiscordEmbed[];
  thread_id?: string;
}