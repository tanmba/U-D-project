
export function Fetch( url ) {
  return new Promise(function ( resolve, reject ) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function ( event ) {
      resolve(xhr.responseText); // Si la requête réussit, on résout la promesse en indiquant le contenu du fichier
    };

    xhr.onerror = function ( err ) {
      reject( err) ; // Si la requête échoue, on rejette la promesse en envoyant les infos de l'erreur
    }

    xhr.open( 'GET', url, true );
    xhr.send( null );
    });
}
