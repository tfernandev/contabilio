import { MONOTRIBUTO_SCALES_2026, GANANCIAS_DEDUCTIONS_2026, GANANCIAS_RANGES_2026 } from './taxData';

/**
 * Calcula la categoría del Monotributo y el componente de Ingresos Brutos (AGIP/SUT 2026)
 */
export function calculateMonotributoCategory(annualRevenue: number) {
    const scale = MONOTRIBUTO_SCALES_2026.find(s => annualRevenue <= s.limit);
    if (!scale) {
        return { 
            error: "Superaste el límite anual (Cat K). Salto automático al Régimen General (Responsable Inscripto).",
            isExclusion: true
        };
    }
    
    return {
        category: scale.category,
        monthly_fee: scale.monthly_fee,
        monthly_iibb_caba: scale.monthly_iibb_caba,
        total_monthly: scale.monthly_fee + scale.monthly_iibb_caba,
        limit: scale.limit,
        isClose: (scale.limit - annualRevenue) < (scale.limit * 0.1)
    };
}

/**
 * Estima el Impuesto a las Ganancias (4ta Categoría) para 2026
 */
export function calculateGananciasEstimate(
    monthlyGross: number, 
    hasConyuge: boolean, 
    children: number, 
    isEmployee: boolean,
    extraDeductions: { medical?: number; rent?: number; education?: number; household?: number } = {}
) {
    const annualGross = monthlyGross * 13; // Sueldo + SAC
    
    let totalDeductions = GANANCIAS_DEDUCTIONS_2026.mni;
    if (isEmployee) totalDeductions += GANANCIAS_DEDUCTIONS_2026.special_deduction;
    if (hasConyuge) totalDeductions += GANANCIAS_DEDUCTIONS_2026.conyuge;
    totalDeductions += (children * GANANCIAS_DEDUCTIONS_2026.hijo);
    
    // Topes de deducciones informadas (basadas en proyecciones)
    const mniLimit = GANANCIAS_DEDUCTIONS_2026.mni;
    const medicalMax = annualGross * 0.05;
    
    totalDeductions += Math.min(extraDeductions.medical || 0, medicalMax);
    totalDeductions += Math.min(extraDeductions.rent || 0, mniLimit * 0.4);
    totalDeductions += Math.min(extraDeductions.education || 0, mniLimit * 0.4);
    totalDeductions += Math.min(extraDeductions.household || 0, mniLimit * 0.4);

    const taxableIncome = Math.max(0, annualGross - totalDeductions);
    
    if (taxableIncome === 0) {
        return { annualTax: 0, monthlyTax: 0, taxableIncome: 0, totalDeductions };
    }

    // Ubicar rango en la escala Art 94
    const range = GANANCIAS_RANGES_2026.find((r) => {
        return taxableIncome <= r.limit;
    }) || GANANCIAS_RANGES_2026[GANANCIAS_RANGES_2026.length - 1];

    const rangeIdx = GANANCIAS_RANGES_2026.indexOf(range);
    const prevLimit = rangeIdx === 0 ? 0 : GANANCIAS_RANGES_2026[rangeIdx - 1].limit;
    
    const annualTax = range.fixed + (taxableIncome - prevLimit) * range.rate;

    return {
        annualTax,
        monthlyTax: annualTax / 13,
        taxableIncome,
        totalDeductions
    };
}
