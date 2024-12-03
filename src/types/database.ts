export type Database = {
  public: {
    Tables: {
      members: {
        Row: {
          id: string;
          name: string;
          position: string;
          phone: string;
          status: 'active' | 'inactive' | 'vip';
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Tables['members']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Tables['members']['Insert']>;
      };
    };
    Enums: {
      member_status: 'active' | 'inactive' | 'vip';
    };
  };
};