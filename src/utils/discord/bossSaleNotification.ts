import { DiscordEmbed } from './types';
import { sendDiscordWebhook } from './webhook';
import { formatNumber } from '../format';
import { SaleFormData } from '../../types/sales';

export async function notifyBossSaleWithdraw(
  sale: SaleFormData,
  memberName: string,
  beforeQuantity: number,
  buyerName: string
): Promise<void> {
  try {
    const afterQuantity = beforeQuantity - sale.quantity;

    const embed: DiscordEmbed = {
      title: '💰 Boss Safe Sale Withdrawal',
      description: `Items withdrawn from boss safe due to sale`,
      color: 0xF59E0B, // Amber color
      fields: [
        {
          name: 'Member',
          value: memberName,
          inline: true
        },
        {
          name: 'Buyer',
          value: buyerName,
          inline: true
        },
        {
          name: 'Item Type',
          value: sale.item_type,
          inline: true
        },
        {
          name: 'Quantity',
          value: formatNumber(sale.quantity),
          inline: true
        },
        {
          name: 'Total Price',
          value: `IDR ${formatNumber(sale.total_price)}`,
          inline: true
        },
        {
          name: 'Inventory Levels',
          value: `Before: ${formatNumber(beforeQuantity)}\nAfter: ${formatNumber(afterQuantity)}`,
          inline: false
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

    await sendDiscordWebhook({ embeds: [embed] });
  } catch (error) {
    console.error('Failed to send boss sale Discord notification:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}