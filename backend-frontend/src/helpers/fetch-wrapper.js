import getConfig from 'next/config';

export const fetchWrapper = {
  get,
};

function get(url) {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}