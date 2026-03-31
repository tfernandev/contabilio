export interface AfipStatus {
  lastSync: Date;
  status: 'active' | 'pending' | 'error';
  taxId: string;
  constanciaUrl: string;
  nextDeadlines: {
    label: string;
    date: string;
    isUrgent: boolean;
  }[];
}

export const syncWithAFIP = async (taxId: string): Promise<AfipStatus> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  return {
    lastSync: new Date(),
    status: 'active',
    taxId,
    constanciaUrl: 'https://www.afip.gob.ar/generico/constancia.asp',
    nextDeadlines: [
      { label: 'Pago Monotributo Enero', date: '2025-01-20', isUrgent: true },
      { label: 'Recategorización Semestral', date: '2025-01-22', isUrgent: false },
      { label: 'DDJJ Ganancias 2024', date: '2025-06-12', isUrgent: false },
    ]
  };
};
