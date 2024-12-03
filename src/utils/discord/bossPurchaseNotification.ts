import { DiscordEmbed } from './types';
import { sendDiscordWebhook } from './webhook';
import { formatNumber } from '../format';
import { PurchaseFormData } from '../../types/purchase';

export async function notifyBossPurchaseDeposit(
  purchase: PurchaseFormData,
  memberName: string,
  beforeQuantity: number
): Promise<void> {
  try {
    const afterQuantity = beforeQuantity + purchase.quantity;

    const embed: DiscordEmbed = {
      title: '🛡️ Boss Safe Purchase Deposit',
      description: `Items added to boss safe from purchase`,
      color: 0x3B82F6, // Blue color
      fields: [
        {
          name: 'Member',
          value: memberName,
          inline: true
        },
        {
          name: 'Item Type',
          value: purchase.item_type,
          inline: true
        },
        {
          name: 'Quantity',
          value: formatNumber(purchase.quantity),
          inline: true
        },
        {
          name: 'Total Price',
          value: `IDR ${formatNumber(purchase.total_price)}`,
          inline: true
        },
        {
          name: 'Inventory Levels',
          value: `Before: ${formatNumber(beforeQuantity)}\nAfter: ${formatNumber(afterQuantity)}`,
          inline: false
        },
        {
          name: 'Notes',
          value: purchase.notes || 'No notes provided',
          inline: false
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'X Club Management System',
        icon_url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=74'
      }
    };

    await sendDiscordWebhook({ embeds: [embed] }, 'bossSafe');
  } catch (error) {
    console.error('Failed to send boss purchase Discord notification:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}