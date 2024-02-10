import axios from 'axios';
import { API_RAPID_SEO_HOST, API_RAPID_SEO_KEY, API_RAPID_SEO_URL } from 'src/constants/API';

export const getAnalyseUrlSeo = async (url: string) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('url', url);

  const options = {
    method: 'POST',
    url: API_RAPID_SEO_URL,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': API_RAPID_SEO_KEY,
      'X-RapidAPI-Host': API_RAPID_SEO_HOST,
    },
    data: encodedParams,
  };

  return await axios.request(options);
};
