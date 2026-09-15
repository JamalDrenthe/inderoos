import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  clickable?: boolean;
  src?: string;
  alt?: string;
}

const BrandLogo = ({
  className = '',
  imageClassName = 'h-14 w-auto object-contain',
  clickable = true,
  src = '/logos/Inderooslogogold3.png',
  alt = 'In De Roos',
}: BrandLogoProps) => {
  const image = <img src={src} alt={alt} className={imageClassName} />;

  if (!clickable) {
    return <div className={className}>{image}</div>;
  }

  return (
    <Link to="/" aria-label="In De Roos home" className={className}>
      {image}
    </Link>
  );
};

export default BrandLogo;
