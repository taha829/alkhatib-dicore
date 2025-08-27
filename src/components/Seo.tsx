import { useEffect } from 'react';

type SeoProps = {
  title?: string;
  description?: string;
};

const Seo = ({ title, description }: SeoProps) => {
  useEffect(() => {
    if (title) {
      document.title = title;
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);
    }

    if (description) {
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', description);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
};

export default Seo;
