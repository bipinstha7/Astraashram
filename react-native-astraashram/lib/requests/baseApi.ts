type methodData = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
interface iApiObject {
  body?: any;
  headers?: any;
  route: string;
  auth?: boolean;
  method?: methodData;
}

interface iFetchObject {
  body?: any;
  headers: any;
  method: methodData;
  credentials: 'include';
}

export default async function api(apiObject: iApiObject): Promise<any> {
  const customHeaders = apiObject.headers || {};

  const fetchObject: iFetchObject = {
    method: apiObject.method || 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...customHeaders,
    },
    credentials: 'include',
  };
  let body: any = {};

  if (
    fetchObject.headers['Content-Type'] &&
    (fetchObject.headers['Content-Type'] === 'text/xml' ||
      fetchObject.headers['Content-Type'] === 'application/xml')
  ) {
    body = apiObject.body || undefined;
  } else {
    body = apiObject.body ? JSON.stringify(apiObject.body) : undefined;
  }

  if (fetchObject.method === 'GET') {
    fetchObject.body = undefined;
  } else {
    fetchObject.body = body;
  }

  // if (apiObject.auth) {
  //   if (!fetchObject.headers.authorization) {
  //     const token = localStorage.getItem('AUTH_TOKEN');
  //     fetchObject.headers.authorization = `BEARER ${token}`;
  //   }
  // }

  const url = `${process.env.EXPO_PUBLIC_API_URL}${apiObject.route}`;
  return new Promise(async (resolve, reject) => {
    try {
      console.log({ url });
      const response = await fetch(url, fetchObject);

      let returnObj = {};
      let contentType = response.headers.get('content-type') || '';
      if (contentType) {
        contentType = contentType.toLowerCase();
      }

      if (response.ok) {
        if (contentType.includes('application/octet-stream')) {
          const blobData = await getResponseBody(contentType, response);
          returnObj = { url: URL.createObjectURL(blobData) };
        } else {
          returnObj = await getResponseBody(contentType, response);
        }

        return resolve(returnObj);
      }

      let errorDataFromServer = null;
      if (contentType.includes('application/octet-stream')) {
        const blobData = await getResponseBody(contentType, response);
        errorDataFromServer = { url: URL.createObjectURL(blobData) };
      } else {
        errorDataFromServer = await getResponseBody(contentType, response);
      }

      throw errorDataFromServer;
    } catch (err: any) {
      console.log({ fetchError: err });
      return reject(err);
    }
  });
}

const getResponseBody = (contentType = '', response: any) => {
  if (contentType.includes('text/plain')) {
    return response.text();
  }
  if (contentType.includes('application/json')) {
    return response.json();
  }
  if (contentType.includes('application/octet-stream')) {
    return response.blob();
  }
  return response.text();
};
