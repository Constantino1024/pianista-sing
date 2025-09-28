
export const apiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  key: import.meta.env.VITE_API_KEY || '',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

export const featuresConfig = {
  converters: {
    maxAttempts: 10,
    defaultAttempts: 1,
    enableRealTypeConversion: true,
  },
  validation: {
    enableAutoDetect: true,
    supportedPddlTypes: ['domain', 'problem', 'plan'],
  },
  ui: {
    autoRefreshInterval: 2000,
    defaultPageSize: 20,
    maxFileSize: 10 * 1024 * 1024,
  },
};

export const config = {
  api: apiConfig,
  features: featuresConfig,
  getApiUrl: (endpoint = '') => {
    const baseUrl = apiConfig.baseURL.replace(/\/$/, '');
    const cleanEndpoint = endpoint.replace(/^\//, '');
    return cleanEndpoint ? `${baseUrl}/${cleanEndpoint}` : baseUrl;
  },
};