export function entry(item) {
  return `<a class="block my-4 border border-red-500 p-2" href="${item.relpermalink}">${item.title} | ${item.type}</a>`
}