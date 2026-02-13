import type { CategoryDto } from '../types';
export const CategoryBadge = ({category}: {category: CategoryDto}) => (
  <span className="badge badge-secondary mr-1">{category.name}</span>
);
