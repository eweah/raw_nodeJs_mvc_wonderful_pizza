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
  
  let nav = document.createElement('script')
  nav.src="../../../public/js/common/navbar/navbar.js"
  nav.type="module"
  nav.setAttribute('async', '')
  nav.setAttribute('defer', '')
  document.head.appendChild(nav)
  
  let header = document.createElement('script')
  header.src="../../../public/js/common/header/header.js"
  header.type="module"
  header.setAttribute('async', '')
  header.setAttribute('defer', '')
  document.head.appendChild(header)
  
  
  
  
  let link = document.createElement('link')
  link.rel="stylesheet" 
  link.href="../../../../public/css/common/head.css"
  document.head.appendChild(link)
  
  let link1 = document.createElement('link')
  link1.rel="stylesheet" 
  link1.href="../../../../public/css/about/about.css"
  document.head.appendChild(link1)
  
  let title = document.createElement('title')
  title.innerHTML = `About`
  
  document.head.appendChild(title)
  
  // body 
 
  
  let appNavbar = document.createElement('app-navbar')
  document.body.prepend(appNavbar)
  
  let appHeader = document.createElement('app-header')
  document.body.prepend(appHeader)
  
  let prairie = document.createElement('app-about')
  prairie.setAttribute('name', 'PRAIRIE')
  document.body.appendChild(prairie)
  
  let texan = document.createElement('app-about')
  texan.setAttribute('name', 'TEXAN')
  document.body.appendChild(texan)
  
  let bronco = document.createElement('app-about')
  bronco.setAttribute('name', 'BRONCO')
  document.body.appendChild(bronco)
  
  let roma = document.createElement('app-about')
  roma.setAttribute('name', 'ROMA')
  document.body.appendChild(roma)
  
  
  let italian = document.createElement('app-about')
  italian.setAttribute('name', 'ITALIAN')
  document.body.appendChild(italian)
  
  
  let tasmanian = document.createElement('app-about')
  tasmanian.setAttribute('name', 'TASMANIAN')
  document.body.appendChild(tasmanian)
  
  
  let ivorian = document.createElement('app-about')
  ivorian.setAttribute('name', 'IVORIAN')
  document.body.appendChild(ivorian)
  
  
  let canadian = document.createElement('app-about')
  canadian.setAttribute('name', 'CANADIAN')
  document.body.appendChild(canadian)
  
  let ausie = document.createElement('app-about')
  ausie.setAttribute('name', 'AUSIE')
  document.body.appendChild(ausie)
  
  let happy = document.createElement('app-about')
  happy.setAttribute('name', 'HAPPY')
  document.body.appendChild(happy)
  
  
  let wonderful = document.createElement('app-about')
  wonderful.setAttribute('name', 'WONDERFUL')
  document.body.appendChild(wonderful)
  
  
  let chicken = document.createElement('app-about')
  chicken.setAttribute('name', 'CHICKEN')
  document.body.appendChild(chicken)
  
  let bbq = document.createElement('app-about')
  bbq.setAttribute('name', 'BBQ')
  document.body.appendChild(bbq)
  
  let beef = document.createElement('app-about')
  beef.setAttribute('name', 'BEEF')
  document.body.appendChild(beef)
  
  
  let cheese = document.createElement('app-about')
  cheese.setAttribute('name', 'CHEESE')
  document.body.appendChild(cheese)
  
  
  let buffalo = document.createElement('app-about')
  buffalo.setAttribute('name', 'BUFFALO')
  document.body.appendChild(buffalo)
  
  let roundup = document.createElement('app-about')
  roundup.setAttribute('name', 'ROUNDUP')
  document.body.appendChild(roundup)
  
  let bacon = document.createElement('app-about')
  bacon.setAttribute('name', 'BACON')
  document.body.appendChild(bacon)
  
  let wes = document.createElement('app-about')
  wes.setAttribute('name', 'WÊS')
  document.body.appendChild(wes)
  
  
  let szran = document.createElement('app-about')
  szran.setAttribute('name', 'SZRAN')
  document.body.appendChild(szran)
  
  let lago = document.createElement('app-about')
  lago.setAttribute('name', 'LAGO')
  document.body.appendChild(lago)
  
  let gnonsoa = document.createElement('app-about')
  gnonsoa.setAttribute('name', 'GNONSOA')
  document.body.appendChild(gnonsoa)
  
  let yummy = document.createElement('app-about')
  yummy.setAttribute('name', 'YUMMY')
  document.body.appendChild(yummy)
  
  
  let hawaiian = document.createElement('app-about')
  hawaiian.setAttribute('name', 'HAWAIIAN')
  document.body.appendChild(hawaiian)
  
  
  let appFooter = document.createElement('app-footer')
  document.body.appendChild(appFooter)
  
  let footer = document.createElement('script')
  footer.src="../../../../public/js/common/footer/footer.js"
  footer.type="module"
  footer.setAttribute('async', '')
  footer.setAttribute('defer', '')
  document.body.appendChild(footer)
  
    // let pizza = document.createElement('script')
    // pizza.src="../../../../public/js/pizza/pizza.js"
    // pizza.type="module"
    // document.body.appendChild(pizza)
  
  let app = document.createElement('script')
  app.src="../../../public/js/app.js"
  app.type="module"
  app.setAttribute('async', '')
  app.setAttribute('defer', '')
  document.body.appendChild(app)
  
  }