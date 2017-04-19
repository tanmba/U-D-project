import { Fetch } from './Fetch';


var whendataLoaded = Fetch( 'http://localhost/wordpress/wp-json/wp/v2/pages' );
whendataLoaded.then( function( content ) {
  console.log( content )

  var link    = document.getElementsByClassName( 'link' ),
      data    = JSON.parse( content ),
      body    = document.getElementById( 'app' );

  !function init(){
    addEvent();
    getLinkVal();
  }()

  function addEvent(){
    for (var i = 0 ,l = link.length ; i < l; i++) {
      link[ i ].addEventListener( 'click', () => getLinkVal() ,false)
    }
  }
  
  function getLinkVal( e ){
    e = e || event;
    console.log( e )
    e.preventDefault();
    var nextPage = e.target.attributes ? e.target.attributes[ 1 ].value : 'Accueil',
        thePageContent = data.filter( ( el ) => el.title.rendered === nextPage );

    pushContent( thePageContent );
  }

  function pushContent( pageContent ){
    body.innerHTML = pageContent[ 0 ].content.rendered ;
  }
})
