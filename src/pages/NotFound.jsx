
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Icon name="alert-circle" className="w-24 h-24 text-gray-400 mx-auto mb-8" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page non trouvée
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Icon name="home" className="w-5 h-5 mr-2" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
