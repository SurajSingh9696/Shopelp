export function generateSku(category, name) {
  const cat = category.replace(/\s+/g, "").slice(0, 3).toUpperCase();
  const item = name.replace(/\s+/g, "").slice(0, 3).toUpperCase();
  const random = Math.floor(Math.random() * 900 + 100);
  return `${cat}-${item}-${random}`;
}
