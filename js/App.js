import { Fetch } from './Fetch';
import { TweenLite, Elastic, CSSPlugin, TimelineLite } from "gsap";

var whendataLoaded = Fetch( 'http://localhost/wordpress/wp-json/wp/v2/pages' );
var TLL            = new TimelineLite();
whendataLoaded.then( function( content ) {

  var oldvalue,
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
      link[ i ].addEventListener( 'click',function(e){ getLinkVal() } ,false)
    }
  }
  
  function getLinkVal( e ){
    e = e || event;
    e.preventDefault();
    var nextPage = e.target.attributes ? e.target.attributes[ 1 ].value : 'Accueil',
        thePageContent = data.filter( ( el ) => el.title.rendered === nextPage );
    if( oldvalue == nextPage ) return false;
    pushContent( thePageContent );
    TLL.from( body, .5, { top: 50 })
       .from( app, .5, { css:{ opacity: 0 } }, "-=.5");
    oldvalue = nextPage;
  }

  function pushContent( pageContent ){
    app.innerHTML = pageContent[ 0 ].content.rendered ;
  }
})

document.addEventListener('mousemove', function (e) {
    let main = document.querySelector('#app'),
        w = getComputedStyle(document.documentElement).width.slice(0, -2),
        h = getComputedStyle(document.documentElement).height.slice(0, -2),
        rx = (h / 2 - e.pageY) / 50,
        ry = (w / 2 - e.pageX) / 100;
    main.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + -ry + 'deg)';
});

