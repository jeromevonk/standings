import getConfig from 'next/config';
import { fetchWrapper } from 'src/helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/standings`;

export const standingsService = {
  getStandings,
};

function getStandings() {
  return fetchWrapper.get(baseUrl);
}