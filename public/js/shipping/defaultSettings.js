export default () => {
    // head
  let char = document.createElement('meta')
  char.charset="UTF-8"
  document.head.appendChild(char)
  
  let vp = document.createElement('meta')
  vp.setAttribute('name', 'viewport')
  vp.setAttribute('content', 'width=device-width, initial-scale=1.0')
  document.head.appendChild(vp)
  let http = document.createElement('meta')
  http.setAttribute('http-equiv', 'X-UA-Compatible')
  http.setAttribute('content', 'ie=edge')
  document.head.appendChild(http)
  
  let desc = document.createElement('meta')
  desc.setAttribute('name', 'description')
  desc.setAttribute('content', 'Back to the basics')
  document.head.appendChild(desc)
  
  let keyb = document.createElement('meta')
  
  keyb.setAttribute('name', 'keyboards')
  keyb.setAttribute('content', 'HTML, CSS,JavaScript, NodeJs')
  
  document.head.appendChild(keyb)
  
  let author = document.createElement('meta')
  author.setAttribute('name', 'author')
  author.setAttribute('content', 'The Devout Programmer')
  
  document.head.appendChild(author)
  
  let header = document.createElement('script')
  header.src="../../../public/js/common/header/header.js"
  header.type="module"
  header.setAttribute('defer', '')
  document.head.appendChild(header)
  
  let nav = document.createElement('script')
  nav.src="../../../public/js/common/navbar/navbar.js"
  nav.type="module"
  nav.setAttribute('defer', '')
  document.head.appendChild(nav)
  
  
  let link = document.createElement('link')
  link.rel="stylesheet" 
  link.href="../../../../public/css/common/head.css"
  document.head.appendChild(link)
  
  let link1 = document.createElement('link')
  link1.rel="stylesheet" 
  link1.href="../../../../public/css/shipping/shipping.css"
  document.head.appendChild(link1)
  
  let title = document.createElement('title')
  title.innerHTML = `Shipping`
  
  document.head.appendChild(title)
  
  // body 
  
  let appNavbar = document.createElement('app-navbar')
  document.body.prepend(appNavbar)

  let appHeader = document.createElement('app-header')
  document.body.prepend(appHeader)
  
  let shipping = document.createElement('app-shipping')

  document.body.appendChild(shipping)
  
  let appFooter = document.createElement('app-footer')
  document.body.appendChild(appFooter)
  
  let footer = document.createElement('script')
  footer.src="../../../../public/js/common/footer/footer.js"
  footer.type="module"
  document.body.appendChild(footer)

//   let pizza = document.createElement('script')
//   pizza.src="../../../../public/js/menu/pizza/pizza.js"
//   pizza.type="module"
//   document.body.appendChild(pizza)
let app = document.createElement('script')
app.src="../../../public/js/app.js"
app.type="module"
document.body.appendChild(app)
  }