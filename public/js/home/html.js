'use strict'
  /**
   * @name  anonymous (no name)
   * @function
   * 
   * @requires css 
   * 
   * @description holds the shadow DOM HTML string
   * 
   * @return {String} the shadow DOM HTML string
   * 
   */
import css from './css.js'
export default () => {
    return `
    <div class="container">
    <div class="mySlides">
      <div class="numbertext">1 / 24</div>
      <img src="../../../public/images/menu/schicken.jpg" style="width:100%">
    </div>
  
    <div class="mySlides">
      <div class="numbertext">2 / 24</div>
      <img src="../../../public/images/menu/sausie.jpg" style="width:100%">
    </div>
  
    <div class="mySlides">
      <div class="numbertext">3 / 24</div>
      <img src="../../../public/images/menu/stexan.jpg" style="width:100%">
    </div>
      
    <div class="mySlides">
      <div class="numbertext">4 / 24</div>
      <img src="../../../public/images/menu/sbronco.jpg" style="width:100%">
    </div>
  
    <div class="mySlides">
      <div class="numbertext">5 / 24</div>
      <img src="../../../public/images/menu/sroma.jpg" style="width:100%">
    </div>
      
    <div class="mySlides">
      <div class="numbertext">6 / 24</div>
      <img src="../../../public/images/menu/sitalian.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">7 / 24</div>
      <img src="../../../public/images/menu/shawaiian.jpg" style="width:100%">
    </div>
  
    <div class="mySlides">
      <div class="numbertext">8 / 24</div>
      <img src="../../../public/images/menu/stasmanian.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">9 / 24</div>
      <img src="../../../public/images/menu/sivorian.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">10 / 24</div>
      <img src="../../../public/images/menu/scanadian.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">11/ 24</div>
      <img src="../../../public/images/menu/shappy.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">12 / 24</div>
      <img src="../../../public/images/menu/swonderful.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">13 / 24</div>
      <img src="../../../public/images/menu/sbbq.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">14 / 24</div>
      <img src="../../../public/images/menu/sbeef.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">15/ 24</div>
      <img src="../../../public/images/menu/scheese.jpg" style="width:100%">
    </div>
  
    <div class="mySlides">
      <div class="numbertext">16 / 24</div>
      <img src="../../../public/images/menu/sbuffalo.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">17 / 24</div>
      <img src="../../../public/images/menu/sbacon.jpg" style="width:100%">
    </div>
  
  
    <div class="mySlides">
      <div class="numbertext">18 / 24</div>
      <img src="../../../public/images/menu/sroundup.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">19/ 24</div>
      <img src="../../../public/images/menu/swes.jpg" style="width:100%">
    </div>
  
    <div class="mySlides">
      <div class="numbertext">20 / 24</div>
      <img src="../../../public/images/menu/sszran.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">21 / 24</div>
      <img src="../../../public/images/menu/slago.jpg" style="width:100%">
    </div>

    <div class="mySlides">
      <div class="numbertext">22/ 24</div>
      <img src="../../../public/images/menu/sprairie.jpg" style="width:100%">
    </div>
  
    <div class="mySlides">
      <div class="numbertext">23 / 24</div>
      <img src="../../../public/images/menu/syummy.jpg" style="width:100%">
    </div>
    <div class="mySlides">
      <div class="numbertext">24 / 24</div>
      <img src="../../../public/images/menu/sgnonsoa.jpg" style="width:100%">
    </div>
    <a class="prev">❮</a>
    <a class="next">❯</a>
    <div class="caption-container">
      <p id="caption" class="caption-name"></p>
    </div>
    <div class="row">
      <div class="column">
        <img class="demo cursor" src="../../../public/images/menu/chicken.jpg" style="width:100%"  alt="Chicken">
      </div>
      <div class="column">
        <img class="demo cursor" src="../../../public/images/menu/ausie.jpg" style="width:100%"  alt="Ausie">
      </div>
      <div class="column">
        <img class="demo cursor" src="../../../public/images/menu/texan.jpg" style="width:100%"  alt="Texan">
      </div>
      <div class="column">
        <img class="demo cursor" src="../../../public/images/menu/bronco.jpg" style="width:100%"  alt="Bronco">
      </div>
      <div class="column">
        <img class="demo cursor" src="../../../public/images/menu/roma.jpg" style="width:100%"  alt="Roma">
      </div>    
      <div class="column">
        <img class="demo cursor" src="../../../public/images/menu/italian.jpg" style="width:100%"  alt="Italian">
      </div>
      <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/hawaiian.jpg" style="width:100%"  alt="Hawaiian">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/tasmanian.jpg" style="width:100%" alt="Tasmanian">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/ivorian.jpg" style="width:100%" alt="Ivorian">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/canadian.jpg" style="width:100%" alt="Canadian">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/happy.jpg" style="width:100%" alt="Happy">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/wonderful.jpg" style="width:100%"  alt="Wonderful">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/bbq.jpg" style="width:100%" alt="BBQ">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/beef.jpg" style="width:100%"  alt="Beff">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/cheese.jpg" style="width:100%"  alt="Cheese">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/buffalo.jpg" style="width:100%"  alt="Buffalo">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/bacon.jpg" style="width:100%"  alt="Bacon">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/roundup.jpg" style="width:100%"  alt="Roundup">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/wes.jpg" style="width:100%"  alt="Wês">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/szran.jpg" style="width:100%"  alt="Szran">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/lago.jpg" style="width:100%"  alt="Lago">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/prairie.jpg" style="width:100%"  alt="Prairie">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/yummy.jpg" style="width:100%"  alt="Yummy">
        </div>
        <div class="column">
          <img class="demo cursor" src="../../../public/images/menu/gnonsoa.jpg" style="width:100%"  alt="Gnonsoa">
        </div>
    </div>
  </div>
  ${css()}
  `
}