export function facet(key, facet) {
  console.log(facet)
  let output = ''
  output += `<div class="my-8">` 
  output +=  `<div class="text-xl font-bold">${facet.title}</div>`
  facet.buckets.map((bucket, index) => {
    let checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('name', facet.name)
    checkbox.id = `${bucket.key}-${index}`
    checkbox.classList.add('facet-item', 'mr-2')
    output += 
      `<div>
        ${checkbox.outerHTML}
        <label for="${bucket.key}-${index}">${bucket.key}</label>
      </div>
    `
    }
  )
  output += `</div>` 
  return output
}