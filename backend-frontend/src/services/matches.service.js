import getConfig from 'next/config';
import { fetchWrapper } from 'src/helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/matches`;

export const matchesService = {
  getMatches,
};

function getMatches() {
  return fetchWrapper.get(baseUrl);
}