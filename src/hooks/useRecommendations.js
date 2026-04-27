import { useMemo } from 'react';
import { menuItems } from '../data/mockData';

export function useRecommendations(recentOrderIds = []) {
  return useMemo(() => {
    // Get categories from recent orders
    const recentItems = menuItems.filter(i => recentOrderIds.includes(i.id));
    const recentCategories = [...new Set(recentItems.map(i => i.categoryId))];

    // Score each item
    const scored = menuItems.map(item => {
      let score = item.rating * 10;
      if (item.isBestseller) score += 20;
      if (item.isNew) score += 10;
      if (recentCategories.includes(item.categoryId) && !recentOrderIds.includes(item.id)) score += 15;
      return { ...item, score };
    });

    return scored.sort((a, b) => b.score - a.score).slice(0, 6);
  }, [recentOrderIds]);
}
