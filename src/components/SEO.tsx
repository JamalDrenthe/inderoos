import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/useLanguage';

interface SEOProps {
  title: string;
  description: string;
  type?: 'website' | 'article';
  image?: string;
  path?: string;
}

const SEO = ({ 
  title, 
  description, 
  type = 'website', 
  image = '/logos/og-image.png',
  path = ''
}: SEOProps) => {
  const { language } = useLanguage();
  const baseUrl = 'https://inderoos.nl'; // Update dit naar de daadwerkelijke URL later
  const url = `${baseUrl}${path}`;
  const siteName = 'In De Roos';

  // Base title setup based on language
  const titleTemplate = language === 'nl' ? `%s | ${siteName}` :
                       language === 'en' ? `%s | ${siteName}` :
                       language === 'de' ? `%s | ${siteName}` :
                       `%s | ${siteName}`;

  const fullTitle = titleTemplate.replace('%s', title);

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <html lang={language} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={language === 'nl' ? 'nl_NL' : language === 'en' ? 'en_US' : language === 'de' ? 'de_DE' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
