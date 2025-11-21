// ========================
// MODELO DO PLANO DO USUÁRIO
// ========================
export interface UserPlan {
  id: string;
  name: string;            // Ex: "free", "premium", "gold"
  title: string;
  price: number;
  durationDays: number;
  allowedRoutes: string[];
  routePayment?: Record<string, boolean>;
}

// ========================
// MODELO DO USER
// ========================
export interface User {
  id: string;
  email: string;
  name?: string;
  photo?: string;
  isPaid: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;

  // 🟣 ADICIONADO — plano atual do usuário
  plan?: UserPlan | null;
}

// ========================
// UPDATE DO USER
// ========================
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

  // Mantido por compatibilidade
  photos?: any[];
  photo_position_file?: any;
  photo_position_index?: number;

  // Outros campos opcionais
  [key: string]: any;
}
