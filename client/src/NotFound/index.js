// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', minHeight :'500px'}}>
        <div  style={{ textAlign: 'center', paddingTop: '120px' ,  verticalAlign: 'middle' }} >
        <h2>404 - Page non trouvée</h2>
      <p>La page que vous recherchez n'existe pas.</p>
      <Link className='btn-blue btn-site bg-red btn-lg btn-big btn-round' to="/">Retour à l'accueil</Link>
        </div>

    </div>
  );
}

export default NotFound;