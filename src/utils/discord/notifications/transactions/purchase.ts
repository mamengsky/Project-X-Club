import { DiscordEmbed } from '../../types';
import { sendDiscordWebhook } from '../../webhook';
import { formatNumber } from '../../../format';
import { PurchaseFormData } from '../../../../types/purchase';

export async function notifyPurchaseTransaction(
  purchase: PurchaseFormData,
  memberName: string,
  totalBalance: number
): Promise<void> {
  try {
    const embed: DiscordEmbed = {
      title: '🛍️ New Purchase Transaction',
      description: `A new purchase has been recorded by ${memberName}`,
      color: 0xEF4444, // Red color
      fields: [
        {
          name: 'Item',
          value: `${purchase.quantity}x ${purchase.item_type}`,
          inline: true
        },
        {
          name: 'Total Amount',
          value: `IDR ${formatNumber(purchase.total_price)}`,
          inline: true
        },
        {
          name: 'Current Balance',
          value: `IDR ${formatNumber(totalBalance)}`,
          inline: true
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

    await sendDiscordWebhook({ embeds: [embed] }, 'moneyManagement');
  } catch (error) {
    console.error('Failed to send purchase transaction notification:', error);
  }
}