import { DiscordEmbed } from './types';
import { sendDiscordWebhook } from './webhook';
import { formatNumber } from '../format';

export async function notifyMemberSafeChange(
  itemType: string,
  beforeQuantity: number,
  afterQuantity: number
): Promise<void> {
  try {
    const embed: DiscordEmbed = {
      title: '📦 Member Safe Inventory Update',
      description: `Inventory level has changed for ${itemType}`,
      color: 0x6B46C1, // Purple color
      fields: [
        {
          name: 'Item Type',
          value: itemType,
          inline: true
        },
        {
          name: 'Before',
          value: formatNumber(beforeQuantity),
          inline: true
        },
        {
          name: 'After',
          value: formatNumber(afterQuantity),
          inline: true
        },
        {
          name: 'Change',
          value: `${afterQuantity > beforeQuantity ? '+' : ''}${formatNumber(afterQuantity - beforeQuantity)}`,
          inline: true
        },
        {
          name: 'Timestamp',
          value: new Date().toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'medium'
          }),
          inline: false
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'X Club Management System',
        icon_url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=74'
      }
    };

    await sendDiscordWebhook({ embeds: [embed] });
  } catch (error) {
    console.error('Failed to send Member Safe Discord notification:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}