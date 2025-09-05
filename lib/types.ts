// User types
export interface User {
  userId: string;
  trustedContacts: TrustedContact[];
  preferredLanguage: string;
  isPremiumUser: boolean;
}

export interface TrustedContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
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
}

// Interaction log types
export interface InteractionLog {
  logId: string;
  userId: string;
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
    state?: string;
    city?: string;
  };
  recordingUrl?: string;
  alertSent: boolean;
}

// Component prop types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface CardProps {
  variant?: 'default' | 'highlighted';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface AlertBannerProps {
  variant: 'info' | 'warning' | 'success' | 'error';
  message: string;
  onClose?: () => void;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Legal scenario types
export interface LegalScenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  scripts: {
    whatToSay: string[];
    whatNotToSay: string[];
    keyRights: string[];
  };
}

// Emergency alert types
export interface EmergencyAlert {
  id: string;
  userId: string;
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
  };
  message: string;
  contacts: string[];
  status: 'sent' | 'delivered' | 'failed';
}
