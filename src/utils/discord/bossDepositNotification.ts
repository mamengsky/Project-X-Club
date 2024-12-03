import { DiscordEmbed } from './types';
import { sendDiscordWebhook } from './webhook';
import { formatNumber } from '../format';
import { BossItemType } from '../../constants/bossItems';

interface BossDepositData {
  member_id: string;
  item_type: BossItemType;
  quantity: number;
  notes?: string;
}

export async function notifyBossDeposit(
  deposit: BossDepositData,
  memberName: string,
  beforeQuantity: number
): Promise<void> {
  try {
    const afterQuantity = beforeQuantity + deposit.quantity;

    const embed: DiscordEmbed = {
      title: '🛡️ Boss Safe Deposit',
      description: `A new special item deposit has been recorded`,
      color: 0x10B981, // Green color
      fields: [
        {
          name: 'Member',
          value: memberName,
          inline: true
        },
        {
          name: 'Item Type',
          value: deposit.item_type,
          inline: true
        },
        {
          name: 'Quantity',
          value: formatNumber(deposit.quantity),
          inline: true
        },
        {
          name: 'Inventory Levels',
          value: `Before: ${formatNumber(beforeQuantity)}\nAfter: ${formatNumber(afterQuantity)}`,
          inline: false
        },
        {
          name: 'Notes',
          value: deposit.notes || 'No notes provided',
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
    console.error('Failed to send boss deposit Discord notification:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}