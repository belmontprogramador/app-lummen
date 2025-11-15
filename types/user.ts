export interface User {
  id: string;
  email: string;
  name?: string;    
  photo?: string;
  isPaid: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserUpdateData {
  // Atualização direta do USER
  email?: string;
  name?: string;
  password?: string;
  status?: string;
  isPaid?: boolean;
  paidUntil?: string;

  // Foto de perfil
  photo?: any;

  // ❗ Mantemos essas para compatibilidade futura, mas sem uso agora
  photos?: any[];
  photo_position_file?: any;
  photo_position_index?: number;

  // Outros campos opcionais
  [key: string]: any;
}
