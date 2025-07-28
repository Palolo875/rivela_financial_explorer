
import React from 'react';

const AppImage = ({ 
  src, 
  alt = "", 
  className = "", 
  fallback = "/assets/images/no_image.png",
  ...props 
}) => {
  const [imageSrc, setImageSrc] = React.useState(src);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setImageSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (imageSrc !== fallback) {
      setImageSrc(fallback);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};

export default AppImage;
