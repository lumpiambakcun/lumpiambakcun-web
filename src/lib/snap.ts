type SnapCallbacks = {
  onSuccess?: () => void;
  onPending?: () => void;
  onError?: () => void;
  onClose?: () => void;
};

declare global {
  interface Window {
    snap?: { pay: (token: string, callbacks: SnapCallbacks) => void };
  }
}

export function payWithSnap(token: string, callbacks: SnapCallbacks) {
  if (!window.snap) return false;
  window.snap.pay(token, callbacks);
  return true;
}
