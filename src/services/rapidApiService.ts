import axios from 'axios';
import {
  API_RAPID_GENERATE_TEXT_HOST,
  API_RAPID_GENERATE_TEXT_KEY,
  API_RAPID_GENERATE_TEXT_URL,
} from 'src/constants/API';

export const rapidApiService = async (textRequest: any) => {
  const options = {
    method: 'POST',
    url: API_RAPID_GENERATE_TEXT_URL,
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': API_RAPID_GENERATE_TEXT_KEY,
      'X-RapidAPI-Host': API_RAPID_GENERATE_TEXT_HOST,
    },
    data: {
      messages: [
        {
          role: 'user',
          content: textRequest,
        },
      ],
      system_prompt: '',
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
      web_access: false,
    },
  };

  return await axios.request(options);
};
