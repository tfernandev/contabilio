// Escalas Monotributo Vigentes (Estimado Marzo 2026)
export const MONOTRIBUTO_SCALES_2026 = [
    { category: 'A', limit: 10277988.13, monthly_fee: 35000, monthly_iibb_caba: 22485 },
    { category: 'B', limit: 15058447.71, monthly_fee: 42000, monthly_iibb_caba: 32940 },
    { category: 'C', limit: 21110000.00, monthly_fee: 55000, monthly_iibb_caba: 46185 },
    { category: 'D', limit: 26210000.00, monthly_fee: 78000, monthly_iibb_caba: 57340 },
    { category: 'E', limit: 30830000.00, monthly_fee: 105000, monthly_iibb_caba: 67445 },
    { category: 'F', limit: 38640000.00, monthly_fee: 135000, monthly_iibb_caba: 84525 },
    { category: 'G', limit: 46210000.00, monthly_fee: 175000, monthly_iibb_caba: 101080 },
    { category: 'H', limit: 70110000.00, monthly_fee: 285000, monthly_iibb_caba: 153365 },
    { category: 'I', limit: 78470000.00, monthly_fee: 385000, monthly_iibb_caba: 171665 },
    { category: 'J', limit: 89870000.00, monthly_fee: 450000, monthly_iibb_caba: 196585 },
    { category: 'K', limit: 108350000.00, monthly_fee: 520000, monthly_iibb_caba: 237015 },
];

// Deducciones Ganancias 2026 (Anuales Estimadas a Marzo)
// Basado en actualización semestral por IPC (aprox +50% vs 2025)
export const GANANCIAS_DEDUCTIONS_2026 = {
    mni: 4500000, 
    conyuge: 4200000,
    hijo: 2100000,
    special_deduction: 21600000 
};

// Escala progresiva Art 94 (Indices actualizados para 2026)
export const GANANCIAS_RANGES_2026 = [
    { limit: 2000000, rate: 0.05, fixed: 0 },
    { limit: 4000000, rate: 0.09, fixed: 100000 },
    { limit: 8000000, rate: 0.12, fixed: 280000 },
    { limit: 16000000, rate: 0.15, fixed: 760000 },
    { limit: 32000000, rate: 0.19, fixed: 1960000 },
    { limit: 64000000, rate: 0.23, fixed: 5000000 },
    { limit: 128000000, rate: 0.27, fixed: 12360000 },
    { limit: 256000000, rate: 0.31, fixed: 31720000 },
    { limit: Infinity, rate: 0.35, fixed: 71400000 }
];

export const DEDUCTION_CAPS_2026 = {
  RENT_MAX_ANNUAL: 6760000.00, 
  EDUCATION_MAX_ANNUAL: 2704000.00, 
  HOUSEHOLD_HELP_MAX_ANNUAL: 6760000.00, 
  MEDICAL_PERCENTAGE: 0.05, 
};
