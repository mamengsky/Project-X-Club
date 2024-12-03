import { DiscordEmbed } from './types';
import { sendDiscordWebhook } from './webhook';
import { formatNumber } from '../format';
import { WithdrawFormData } from '../../types/withdraw';
import { getInventoryLevel } from '../inventory';

export async function notifyWithdrawal(
  withdrawal: WithdrawFormData,
  memberName: string,
  beforeQuantity: number
): Promise<void> {
  try {
    // Calculate after quantity based on the before quantity
    const afterQuantity = beforeQuantity - withdrawal.quantity;

    const embed: DiscordEmbed = {
      title: '📤 New Item Withdrawal',
      description: `A new withdrawal has been recorded in the system`,
      color: 0xEF4444, // Red color
      fields: [
        {
          name: 'Member',
          value: memberName,
          inline: true
        },
        {
          name: 'Item Type',
          value: withdrawal.item_type,
          inline: true
        },
        {
          name: 'Quantity',
          value: formatNumber(withdrawal.quantity),
          inline: true
        },
        {
          name: 'Inventory Levels',
          value: `Before: ${formatNumber(beforeQuantity)}\nAfter: ${formatNumber(afterQuantity)}`,
          inline: false
        },
        {
          name: 'Notes',
          value: withdrawal.notes || 'No notes provided',
          inline: false
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
    console.error('Failed to send withdrawal Discord notification:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}