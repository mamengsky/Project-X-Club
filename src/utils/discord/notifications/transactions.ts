import { DiscordEmbed } from '../types';
import { sendDiscordWebhook } from '../webhook';
import { formatNumber } from '../../format';
import { Transaction } from '../../../types/office-money';

interface TransactionNotification extends Transaction {
  totalBalance: number;
}

export async function notifyNewTransaction(transaction: TransactionNotification): Promise<void> {
  try {
    const embed: DiscordEmbed = {
      title: transaction.type === 'sale' ? '💰 New Sale' : '🛍️ New Purchase',
      description: transaction.description,
      color: transaction.type === 'sale' ? 0x10B981 : 0xEF4444,
      fields: [
        {
          name: 'Amount',
          value: `IDR ${formatNumber(transaction.amount)}`,
          inline: true
        },
        {
          name: 'Type',
          value: transaction.type === 'sale' ? 'Sale' : 'Purchase',
          inline: true
        },
        {
          name: 'Current Balance',
          value: `IDR ${formatNumber(transaction.totalBalance)}`,
          inline: true
        },
        {
          name: 'Time',
          value: new Date(transaction.created_at).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
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

    await sendDiscordWebhook({ embeds: [embed] }, 'moneyManagement');
  } catch (error) {
    console.error('Failed to send transaction notification:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}