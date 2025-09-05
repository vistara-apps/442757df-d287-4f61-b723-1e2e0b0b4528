// User types
export interface User {
  userId: string;
  trustedContacts: TrustedContact[];
  preferredLanguage: string;
  isPremiumUser: boolean;
  location?: {
    state: string;
    city?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

export interface TrustedContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  relationship: string;
}

// Legal content types
export interface LegalContent {
  contentId: string;
  state: string;
  topic: string;
  title: string;
  script: string;
  summary: string;
  language: string;
  category: 'traffic_stop' | 'questioning' | 'search' | 'arrest' | 'general';
  lastUpdated: string;
}

// Interaction log types
export interface InteractionLog {
  logId: string;
  userId: string;
  timestamp: string;
  location: {
    state: string;
    city?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  recordingUrl?: string;
  alertSent: boolean;
  scenario: string;
  notes?: string;
}

// Rights card types
export interface RightsCard {
  id: string;
  title: string;
  content: string;
  state: string;
  category: string;
  shareableUrl?: string;
  createdAt: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Component prop types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'icon-only';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  variant?: 'default' | 'highlighted';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface AlertBannerProps {
  variant: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'fullscreen';
  className?: string;
}

// Legal scenario types
export type LegalScenario = 
  | 'traffic_stop'
  | 'questioning'
  | 'search_request'
  | 'arrest'
  | 'general_rights';

export interface ScenarioOption {
  id: LegalScenario;
  title: string;
  description: string;
  icon: string;
  urgency: 'low' | 'medium' | 'high';
}
