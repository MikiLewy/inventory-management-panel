/**
 * Resolves a category ID from a category name by matching against translations.
 * Returns null if no category name is provided or no match is found.
 */
export function resolveCategoryId(
  categoryName: string | undefined,
  categoriesList: { id: number; translations: unknown }[],
): number | null {
  if (!categoryName) return null;

  const normalizedName = categoryName.toLowerCase().trim();
  const found = categoriesList.find(cat => {
    const translations = cat.translations as Record<string, string>;
    if (!translations) return false;
    return Object.values(translations).some(t => t.toLowerCase().trim() === normalizedName);
  });

  return found?.id ?? null;
}

/**
 * Resolves a warehouse ID from a warehouse name.
 * Returns null if no warehouse name is provided or no match is found.
 */
export function resolveWarehouseId(
  warehouseName: string | undefined,
  warehousesList: { id: number; name: string }[],
): number | null {
  if (!warehouseName) return null;

  const normalizedName = warehouseName.toLowerCase().trim();
  const found = warehousesList.find(w => w.name.toLowerCase().trim() === normalizedName);

  return found?.id ?? null;
}
