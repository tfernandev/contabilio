import type { UserProfile } from '../types';

/**
 * ARCA (Agencia de Recaudación y Control Aduanero) - Service Integration
 * Version: 2026 (Post-AFIP Rebranding)
 * This service handles the bridge between the frontend and the 
 * future backend server that interacts with SOAP/REST ARCA Web Services.
 */

export interface ArcaIntegrationStatus {
    isConnected: boolean;
    lastSync?: string;
    taxid: string;
    alias?: string; // Cert alias
    environment: 'production' | 'sandbox';
}

export interface ArcaVoucher {
    id: string;
    date: string;
    type: 'Factura A' | 'Factura B' | 'Factura C';
    amount: number;
    pointsOfSale: number;
    number: number;
}

/**
 * SIMULATED ARCA ADAPTER
 * In a real production environment, this would call a Node.js/C# API
 * that signs requests with the taxpayer's .key and .crt files.
 */
const BASE_URL = 'http://localhost:5154/api/arca';

/**
 * ARCA (Agencia de Recaudación y Control Aduanero) - Service Integration
 * Version: 2026 (Post-AFIP Rebranding)
 * This service handles the bridge between the frontend and the 
 * .NET 10 Backend.
 */
export const ARCAService = {
    
    /**
     * Pulls the taxpayer's profile data from 'Padrón' via .NET API
     */
    getTaxpayerProfile: async (taxId: string): Promise<Partial<UserProfile>> => {
        const response = await fetch(`${BASE_URL}/profile/${taxId}`);
        if (!response.ok) throw new Error('Error al conectar con ARCA API');
        return await response.json();
    },

    /**
     * Fetches recent billing history (WSFE) via .NET API
     */
    getRecentVouchers: async (taxId: string): Promise<ArcaVoucher[]> => {
        const response = await fetch(`${BASE_URL}/vouchers/${taxId}`);
        if (!response.ok) throw new Error('Error al obtener comprobantes');
        return await response.json();
    },

    /**
     * Checks for fiscal alerts via .NET API
     */
    getOfficialAlerts: async (taxId: string) => {
        const response = await fetch(`${BASE_URL}/alerts/${taxId}`);
        if (!response.ok) throw new Error('Error al obtener alertas');
        return await response.json();
    }
};
