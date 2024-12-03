import { DiscordEmbed } from '../types';
import { sendDiscordWebhook } from '../webhook';
import { formatNumber } from '../../format';
import { ItemType } from '../../../types/deposit';

interface MemberSafeChange {
  itemType: ItemType;
  beforeQuantity: number;
  afterQuantity: number;
  reason?: string;
}

export async function notifyMemberSafeChange({
  itemType,
  beforeQuantity,
  afterQuantity,
  reason
}: MemberSafeChange): Promise<void> {
  try {
    const embed: DiscordEmbed = {
      title: '📦 Member Safe Inventory Update',
      description: `Inventory level has changed for ${itemType}`,
      color: 0x6B46C1,
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
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'X Club Management System',
        icon_url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=74'
      }
    };

    if (reason) {
      embed.fields.push({
        name: 'Reason',
        value: reason,
        inline: false
      });
    }

    await sendDiscordWebhook({ embeds: [embed] }, 'memberSafe');
  } catch (error) {
    console.error('Failed to send member safe notification:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}