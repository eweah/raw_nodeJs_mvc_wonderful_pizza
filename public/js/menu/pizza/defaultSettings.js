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
  link1.href="../../../../public/css/menu/menu.css"
  document.head.appendChild(link1)
  
  let title = document.createElement('title')
  title.innerHTML = `Menu`
  
  document.head.appendChild(title)
  
  // body 
 

  let appNavbar = document.createElement('app-navbar')
  document.body.prepend(appNavbar)

  let appHeader = document.createElement('app-header')
  document.body.prepend(appHeader)
  
  let prairie = document.createElement('menu-pizza')
  prairie.setAttribute('name', 'PRAIRIE')
  document.body.appendChild(prairie)

  let texan = document.createElement('menu-pizza')
  texan.setAttribute('name', 'TEXAN')
  document.body.appendChild(texan)

  let bronco = document.createElement('menu-pizza')
  bronco.setAttribute('name', 'BRONCO')
  document.body.appendChild(bronco)

  let roma = document.createElement('menu-pizza')
  roma.setAttribute('name', 'ROMA')
  document.body.appendChild(roma)


  let italian = document.createElement('menu-pizza')
  italian.setAttribute('name', 'ITALIAN')
  document.body.appendChild(italian)


  let hawaiian = document.createElement('menu-pizza')
  hawaiian.setAttribute('name', 'HAWAIIAN')
  document.body.appendChild(hawaiian)


  let tasmanian = document.createElement('menu-pizza')
  tasmanian.setAttribute('name', 'TASMANIAN')
  document.body.appendChild(tasmanian)


  let ivorian = document.createElement('menu-pizza')
  ivorian.setAttribute('name', 'IVORIAN')
  document.body.appendChild(ivorian)


  let canadian = document.createElement('menu-pizza')
  canadian.setAttribute('name', 'CANADIAN')
  document.body.appendChild(canadian)

  let ausie = document.createElement('menu-pizza')
  ausie.setAttribute('name', 'AUSIE')
  document.body.appendChild(ausie)

  let happy = document.createElement('menu-pizza')
  happy.setAttribute('name', 'HAPPY')
  document.body.appendChild(happy)


  let wonderful = document.createElement('menu-pizza')
  wonderful.setAttribute('name', 'WONDERFUL')
  document.body.appendChild(wonderful)


  let chicken = document.createElement('menu-pizza')
  chicken.setAttribute('name', 'CHICKEN')
  document.body.appendChild(chicken)

  let bbq = document.createElement('menu-pizza')
  bbq.setAttribute('name', 'BBQ')
  document.body.appendChild(bbq)

  let beef = document.createElement('menu-pizza')
  beef.setAttribute('name', 'BEEF')
  document.body.appendChild(beef)


  let cheese = document.createElement('menu-pizza')
  cheese.setAttribute('name', 'CHEESE')
  document.body.appendChild(cheese)


  let buffalo = document.createElement('menu-pizza')
  buffalo.setAttribute('name', 'BUFFALO')
  document.body.appendChild(buffalo)

  let roundup = document.createElement('menu-pizza')
  roundup.setAttribute('name', 'ROUNDUP')
  document.body.appendChild(roundup)

  let bacon = document.createElement('menu-pizza')
  bacon.setAttribute('name', 'BACON')
  document.body.appendChild(bacon)

  let wes = document.createElement('menu-pizza')
  wes.setAttribute('name', 'WÊS')
  document.body.appendChild(wes)


  let szran = document.createElement('menu-pizza')
  szran.setAttribute('name', 'SZRAN')
  document.body.appendChild(szran)

  let lago = document.createElement('menu-pizza')
  lago.setAttribute('name', 'LAGO')
  document.body.appendChild(lago)

  let gnonsoa = document.createElement('menu-pizza')
  gnonsoa.setAttribute('name', 'GNONSOA')
  document.body.appendChild(gnonsoa)

  let yummy = document.createElement('menu-pizza')
  yummy.setAttribute('name', 'YUMMY')
  document.body.appendChild(yummy)
  
  }