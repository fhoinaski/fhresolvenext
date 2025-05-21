// types/estimate.ts
export interface EstimateItem {
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
  }
  
  export interface MaterialItem {
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
  }
  
  export interface ServiceItem {
    description: string;
    value: number;
  }
  
  export interface HistoryEntry {
    date: string;
    action: string;
    by: string;
  }
  
  export type EstimateType = 'detailed' | 'materials' | 'simple';

export interface EstimateFormValues {
    estimateType: EstimateType;
    clientName: string;
    clientEmail?: string;
    clientPhone: string;
    address?: string;
    title: string;
    description?: string;
    items?: EstimateItem[];
    materials?: MaterialItem[];
    services?: ServiceItem[];
    subtotal: number;
    discount?: number;
    tax?: number;
    total: number;
    notes?: string;
    paymentTerms?: string;
    validUntil?: string;
}

export interface Estimate {
    _id: string;
    estimateType: EstimateType;
    clientName: string;
    clientEmail?: string;
    clientPhone: string;
    address?: string;
    title: string;
    description?: string;
    items?: EstimateItem[];
    materials?: MaterialItem[];
    services?: ServiceItem[];
    subtotal: number;
    discount?: number;
    tax?: number;
    total: number;
    notes?: string;
    paymentTerms?: string;
    validUntil?: string;
    status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
    token: string;
    createdAt: string;
    updatedAt: string;
    history?: HistoryEntry[];
    wasModified?: boolean;
  }