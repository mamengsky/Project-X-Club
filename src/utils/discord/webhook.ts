import { DiscordWebhookMessage } from './types';
import { discordConfig } from './config';
import { DiscordWebhookError } from './errors';
import { isDuplicate } from './rate-limiter';
import { webhookUrls } from './webhooks';

type WebhookType = keyof typeof discordConfig.usernames;

export async function sendDiscordWebhook(
  message: Partial<DiscordWebhookMessage>, 
  type: WebhookType = 'newMember'
): Promise<void> {
  try {
    if (isDuplicate(message)) {
      console.log('Prevented duplicate Discord message');
      return;
    }

    const webhookPayload: DiscordWebhookMessage = {
      username: discordConfig.usernames[type],
      ...message
    };

    // Use different webhook URL for office money notifications
    const webhookUrl = type === 'moneyManagement' 
      ? webhookUrls.officeMoney 
      : webhookUrls.default;

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new DiscordWebhookError(
        `Discord webhook failed (${response.status}): ${errorText}`,
        response.status
      );
    }
  } catch (error) {
    if (error instanceof DiscordWebhookError) {
      throw error;
    }
    throw new DiscordWebhookError(
      `Failed to send Discord webhook: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}