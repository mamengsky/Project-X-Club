import { DiscordEmbed } from '../../types';
import { sendDiscordWebhook } from '../../webhook';
import { formatNumber } from '../../../format';
import { SaleFormData } from '../../../../types/sales';

export async function notifySaleTransaction(
  sale: SaleFormData,
  memberName: string,
  totalBalance: number
): Promise<void> {
  try {
    const embed: DiscordEmbed = {
      title: '💰 New Sale Transaction',
      description: `A new sale has been recorded by ${memberName}`,
      color: 0x10B981, // Green color
      fields: [
        {
          name: 'Buyer',
          value: sale.buyer_name,
          inline: true
        },
        {
          name: 'Item',
          value: `${sale.quantity}x ${sale.item_type}`,
          inline: true
        },
        {
          name: 'Unit Price',
          value: `IDR ${formatNumber(sale.unit_price)}`,
          inline: true
        },
        {
          name: 'Total Amount',
          value: `IDR ${formatNumber(sale.total_price)}`,
          inline: true
        },
        {
          name: 'Current Balance',
          value: `IDR ${formatNumber(totalBalance)}`,
          inline: true
        },
        {
          name: 'Notes',
          value: sale.notes || 'No notes provided',
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
    console.error('Failed to send sale transaction notification:', error);
  }
}