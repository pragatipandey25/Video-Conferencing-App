const DEV_FALLBACK_CLERK_PUBLISHABLE_KEY = 'pk_test_Y2xlcmsuZXhhbXBsZS5jb20k';

const PLACEHOLDER_PATTERNS = ['xxxxxxxx', 'your_clerk_publishable_key'];

const canDecodePublishableKey = (key: string) => {
  const encodedPart = key.split('_').slice(2).join('_');

  if (!encodedPart) return false;

  try {
    atob(encodedPart.replace(/-/g, '+').replace(/_/g, '/'));
    return true;
  } catch {
    return false;
  }
};

export const isValidClerkPublishableKey = (key: string) => {
  const looksLikeClerkKey = /^pk_(test|live)_[A-Za-z0-9_\-]+$/.test(key);
  const isFallbackKey = key === DEV_FALLBACK_CLERK_PUBLISHABLE_KEY;
  const hasPlaceholderValue = PLACEHOLDER_PATTERNS.some((value) =>
    key.toLowerCase().includes(value)
  );

  return (
    looksLikeClerkKey &&
    !isFallbackKey &&
    !hasPlaceholderValue &&
    canDecodePublishableKey(key)
  );
};

export const getClerkPublishableKey = () =>
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '';

export const isClerkDevBypassActive = () =>
  process.env.NODE_ENV === 'development' &&
  !isValidClerkPublishableKey(getClerkPublishableKey());

export const getSafeClerkPublishableKey = () =>
  isClerkDevBypassActive()
    ? DEV_FALLBACK_CLERK_PUBLISHABLE_KEY
    : getClerkPublishableKey();
