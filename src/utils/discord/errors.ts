export class DiscordWebhookError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = 'DiscordWebhookError';
  }
}