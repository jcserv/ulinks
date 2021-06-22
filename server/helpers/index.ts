export function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export function generateRandomString(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
