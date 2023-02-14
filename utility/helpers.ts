import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';

/**
 * Creates separators with coma in thousands
 * @param {number} num - number to be formatted
 * @param {string?} separator - one of ',' | ','
 * @param returnDefault
 * @return {string}
 */
export const thousandsSeparators = (num: number | string, separator: string = ',', returnDefault?: any) => {
  if (num) {
    const numParts = num.toString().split('.');
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return numParts.join('.');
  }
  return returnDefault ?? '';
};

export const resolveUserTypeToTableData = <T>(data: T[], reshape?: (curObject: T, i: number) => T | object) => {
  if (data?.length) {
    return data.reduce((res: any[], _cur, i) => {
      if (reshape) {
        const overwrite = reshape(_cur, i);
        res.push({ sn: i + 1, ..._cur, ...overwrite });
      } else res.push({ sn: i + 1, ..._cur });
      return res;
    }, []);
  }
  return data;
};

export const calculateReadingTime = (lengthOfText: number) => {
  const wordsPerMinute = 200; // Average case.

  if (lengthOfText > 0) {
    return Math.ceil(lengthOfText / wordsPerMinute);
  }
  return 1;
};

export const downloadDivToImg = (divName: string, pdfName: string) => {
  const svgElements = document.body.querySelectorAll('svg');
  svgElements.forEach(function (item) {
    item.setAttribute('width', item.getBoundingClientRect().width.toString());
    item.setAttribute('height', item.getBoundingClientRect().height.toString());
    item.style.width = '';
    item.style.height = '';
  });
  const input = document.getElementById(divName);
  html2canvas(input!, {
    useCORS: true,
    logging: true,
    scale: 2,
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/jpeg');
    saveAs(imgData, pdfName);
  });
};

function saveAs(uri: any, filename: string) {
  const link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

export const truncateString = (text: string, numberOfcharacter: number) => {
  return text && text.length > numberOfcharacter ? `${text.substring(0, numberOfcharacter)}...` : text;
};

function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}

export default useMediaQuery;
