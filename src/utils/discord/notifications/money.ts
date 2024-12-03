import { DiscordEmbed } from '../types';
import { sendDiscordWebhook } from '../webhook';
import { formatNumber } from '../../format';
import { Transaction } from '../../../types/office-money';

interface MoneyManagementData {
  totalSales: number;
  totalPurchases: number;
  totalBalance: number;
  recentTransactions: Transaction[];
}

export async function notifyMoneyManagement(data: MoneyManagementData): Promise<void> {
  try {
    const embed: DiscordEmbed = {
      title: '💰 New Transaction Alert',
      description: 'A new transaction has been recorded',
      color: 0x10B981, // Green color
      fields: [
        {
          name: 'Latest Transaction',
          value: data.recentTransactions[0]?.description || 'No transactions available',
          inline: false
        },
        {
          name: 'Amount',
          value: `IDR ${formatNumber(data.recentTransactions[0]?.amount || 0)}`,
          inline: true
        },
        {
          name: 'Current Balance',
          value: `IDR ${formatNumber(data.totalBalance)}`,
          inline: true
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
    console.error('Failed to send money management notification:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}