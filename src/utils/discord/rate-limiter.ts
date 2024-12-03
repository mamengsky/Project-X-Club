const recentMessages = new Map<string, number>();
const DUPLICATE_PREVENTION_WINDOW = 5000; // 5 seconds

export function isDuplicate(message: Record<string, any>): boolean {
  const key = JSON.stringify({
    content: message.content,
    embeds: message.embeds
  });
  
  const now = Date.now();
  const lastSent = recentMessages.get(key);
  
  if (lastSent && now - lastSent < DUPLICATE_PREVENTION_WINDOW) {
    return true;
  }
  
  recentMessages.set(key, now);
  
  // Cleanup old entries
  for (const [storedKey, timestamp] of recentMessages.entries()) {
    if (now - timestamp > DUPLICATE_PREVENTION_WINDOW) {
      recentMessages.delete(storedKey);
    }
  }
  
  return false;
}