export interface iFormData {
  userId: string;
  deviceId: string;
}

export interface iQrPayload {
  userId: string;
  deviceId: string;
  timestamp: number;
}

export interface iCryptoResult {
  data: string | null;
  error: string | null;
}

export interface iModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  currentKey: string;
}

export interface iHeaderProps {
  timestamp: number;
  hasKey: boolean;
  onOpenModal: () => void;
}

export interface iFormPanelProps {
  userId: string;
  deviceId: string;
  timestamp: number;
  error: string | null;
  isLoading: boolean;
  onUserIdChange: (v: string) => void;
  onDeviceIdChange: (v: string) => void;
  onGenerate: () => void;
}

export interface iQrPanelProps {
  dataUrl: string | null;
  isLoading: boolean;
}
