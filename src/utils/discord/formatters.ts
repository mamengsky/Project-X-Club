import { ClubMember } from '../../types/member';
import { DiscordEmbed } from './types';

export function formatNewMemberEmbed(member: ClubMember): DiscordEmbed {
  const embed: DiscordEmbed = {
    title: '👋 New Member Added',
    description: 'A new member has joined X Club!',
    color: 0x6B46C1, // Purple color
    fields: [
      {
        name: 'Name',
        value: member.name,
        inline: true,
      },
      {
        name: 'Position',
        value: member.position,
        inline: true,
      },
      {
        name: 'Status',
        value: member.status.toUpperCase(),
        inline: true,
      },
      {
        name: 'Phone',
        value: member.phone,
        inline: false,
      },
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: 'X Club Management System',
      icon_url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=74'
    }
  };

  return embed;
}