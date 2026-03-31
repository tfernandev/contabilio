export type FiscalRegime = 'monotributo' | 'responsable_inscripto' | 'consumidor_final';

export interface UserProfile {
  cuit: string;
  email: string;
  fullName: string;
  regime: FiscalRegime;
  annualRevenue: number;
  monthlyRevenue: number;
  hasConyuge: boolean;
  childrenCount: number;
  isEmployee: boolean;
  province: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isProfiling: boolean; // True if they need to complete their tax profile
  user: UserProfile | null;
}
