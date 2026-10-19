import { TECHNIQUES, DOMAIN_CATEGORIES, getTechniqueText, searchTechniques } from '../packages/catalog/src/index';

const rows = [];
for (const locale of ['ko', 'en'] as const) {
  for (const [domain, categories] of Object.entries(DOMAIN_CATEGORIES)) {
    for (const category of categories.map(item => item.id)) {
      const items = TECHNIQUES.filter(item => item.domain === domain && (category === 'all' || item.category === category));
      const keywords = items.map(item => ({ id: item.id, keyword: getTechniqueText(item, locale).vibeKeywords[0] ?? getTechniqueText(item, locale).title }));
      const unique = new Set(keywords.map(item => item.keyword.trim().toLowerCase()));
      const missing = keywords.filter(item => !searchTechniques({ query: item.keyword, domain: domain as typeof TECHNIQUES[number]['domain'], ...(category === 'all' ? {} : { category: category as typeof TECHNIQUES[number]['category'] }) }).some(result => result.item.id === item.id));
      rows.push({ locale, domain, category, count: items.length, duplicates: items.length - unique.size, missing });
    }
  }
}
console.log(JSON.stringify(rows, null, 2));
