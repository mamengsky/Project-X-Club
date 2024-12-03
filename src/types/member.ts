export interface ClubMember {
  id: string;
  name: string;
  position: string;
  phone: string;
  status: 'active' | 'inactive' | 'vip';
  avatar_url?: string;
  created_at: string;
}

export interface MemberSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  member: ClubMember | null;
}