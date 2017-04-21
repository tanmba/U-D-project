import { Fetch } from './Fetch';
import { TweenLite, Elastic, CSSPlugin, TimelineLite } from "gsap";

var whendataLoaded = Fetch( 'http://localhost/wordpress/wp-json/wp/v2/pages' );
var TLL            = new TimelineLite();
whendataLoaded.then( function( content ) {

  var oldval  = 'Accueil',
      w       = getComputedStyle(document.documentElement).width.slice(0, -2),
      h       = getComputedStyle(document.documentElement).height.slice(0, -2),
      link    = document.getElementsByClassName( 'link' ),
      data    = JSON.parse( content ),
      body    = document.getElementsByClassName( 'container' ),
      app     = document.getElementById( 'app' );

  !function init(){
    addEvent();
    getLinkVal();
  }()

  function addEvent(){
    for (var i = 0 ,l = link.length ; i < l; i++) {
      link[ i ].addEventListener( 'click',(e) => getLinkVal(e),false)
    }
    document.addEventListener('mousemove',(e) => translate(e),false);
  }
  
  function getLinkVal(e){
    var nextPage,thePageContent;
    if ( typeof e === 'undefined') {
      thePageContent = data.filter( ( el ) => el.title.rendered === 'Accueil' );
      pushContent( thePageContent );
      TLL.from( body, .5, { top: 50 })
         .from( app, .5, { css:{ opacity: 0 } }, "-=.5");
      return;
    } 
    e = e || event;
    e.preventDefault();
    nextPage = e.target.attributes[ 1 ].value ,
    thePageContent = data.filter( ( el ) => el.title.rendered === nextPage );
    if( oldval == nextPage ) return false;
    pushContent( thePageContent );
    TLL.from( body, .5, { top: 50 })
       .from( app, .5, { css:{ opacity: 0 } }, "-=.5");
    oldval = nextPage;
  }

  function pushContent( pageContent ){
    app.innerHTML = pageContent[ 0 ].content.rendered ;
  }

  function translate(e) {
    var rx = (h / 2 - e.pageY) / 50,
        ry = (w / 2 - e.pageX) / 100;
    app.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + -ry + 'deg)';
  }
})


