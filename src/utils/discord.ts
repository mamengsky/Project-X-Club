import { ClubMember } from '../types/member';
import { DiscordEmbed } from './discord/types';
import { sendDiscordWebhook } from './discord/webhook';
import { formatNewMemberEmbed } from './discord/formatters';

export async function notifyNewMember(member: ClubMember): Promise<void> {
  try {
    const embed = formatNewMemberEmbed(member);
    await sendDiscordWebhook({ embeds: [embed] }, 'newMember');
  } catch (error) {
    console.error('Failed to send Discord notification:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}