// Merge props from base type
export default function mergeProps({ types, items }) {
  if(!types) return items;
  return items.map(item => Object.assign({}, types.find(b => b.id === item.type), item));
}