/**
 * Motor de Reglas Fiscales (Expert System) basado en feedback de Agentes de AFIP/AGIP
 * Versión 2026 - Argentina
 */

export interface FiscalHealthProfile {
    annualRevenue: number;
    annualExpenses: number; // Tarjetas, alquiler, compras
    domicileJurisdiction: 'CABA' | 'PBA' | 'OTRO';
    billingJurisdiction: 'CABA' | 'PBA' | 'OTRO';
    observedRetentionRate?: number; // SIRCREB
    expectedRetentionRate?: number;
}

export interface FiscalAlert {
    type: 'risk' | 'consistency' | 'cashflow' | 'info';
    level: 'safe' | 'warning' | 'error';
    title: string;
    message: string;
    scoreImpact: number;
}

export function calculateFiscalHealth(profile: FiscalHealthProfile) {
    const alerts: FiscalAlert[] = [];
    let score = 100;

    // 1. Descalce Económico (Riesgo Exclusión/Recat de Oficio)
    if (profile.annualRevenue > 0) {
        const expenseRatio = profile.annualExpenses / profile.annualRevenue;
        if (expenseRatio > 0.8) {
            const impact = Math.min(Math.round((expenseRatio - 0.8) * 100), 100);
            score -= impact;
            alerts.push({
                type: 'risk',
                level: expenseRatio > 1.0 ? 'error' : 'warning',
                title: expenseRatio > 1.0 ? 'Riesgo Crítico: Descalce Económico' : 'Alerta: Gastos Elevados',
                message: `Tus gastos (${(expenseRatio*100).toFixed(0)}% del ingreso) superan el umbral de razonabilidad de AFIP. Riesgo alto de fiscalización de oficio.`,
                scoreImpact: -impact
            });
        }
    } else if (profile.annualExpenses > 0) {
        score -= 100;
        alerts.push({
            type: 'risk',
            level: 'error',
            title: 'Riesgo Crítico: Gastos sin Ingresos',
            message: 'Registrás gastos detectados pero no declaraste ingresos. Esto dispara alertas de inconsistencia patrimonial inmediata.',
            scoreImpact: -100
        });
    }

    // 2. Consistencia de Domicilio vs Facturación (AGIP/SUT)
    if (profile.domicileJurisdiction !== profile.billingJurisdiction) {
        score -= 15;
        alerts.push({
            type: 'consistency',
            level: 'warning',
            title: 'Inconsistencia de Jurisdicción',
            message: `Vivís en ${profile.domicileJurisdiction} pero facturás principalmente en ${profile.billingJurisdiction}. Podrías estar omitiendo el alta en Ingresos Brutos de esa provincia o en Convenio Multilateral.`,
            scoreImpact: -15
        });
    }

    // 3. Monitor de Retenciones (SIRCREB/SIRTAC)
    if (profile.observedRetentionRate && profile.expectedRetentionRate) {
        if (profile.observedRetentionRate > profile.expectedRetentionRate) {
            score -= 10;
            alerts.push({
                type: 'cashflow',
                level: 'error',
                title: 'Exceso de Retenciones Bancarias',
                message: `Te están reteniendo un ${(profile.observedRetentionRate).toFixed(1)}% cuando tu alícuota esperada es ${(profile.expectedRetentionRate).toFixed(1)}%. Estás perdiendo liquidez innecesariamente.`,
                scoreImpact: -10
            });
        }
    }

    // 4. Salto al Vacío (Proximidad Cat K)
    const LIMIT_K = 108350000.00; // Proyección 2026 (Jan update)
    if (profile.annualRevenue > LIMIT_K * 0.9 && profile.annualRevenue <= LIMIT_K) {
        score -= 20;
        alerts.push({
            type: 'risk',
            level: 'error',
            title: 'Peligro: Exclusión Inminente',
            message: 'Estás a menos del 10% del límite máximo del Monotributo. Un salto al Régimen General multiplicaría tus impuestos.',
            scoreImpact: -20
        });
    }

    return {
        score: Math.max(0, score),
        alerts,
        status: score > 80 ? 'Excelente' : score > 50 ? 'Regular' : 'En Riesgo'
    };
}
