
const requiredEnvVars = {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_API_KEY: import.meta.env.VITE_API_KEY,
};

const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
}


export const apiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  key: import.meta.env.VITE_API_KEY || '',
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

export const featuresConfig = {
  // Converter settings
  converters: {
    maxAttempts: 10,
    defaultAttempts: 1,
    enableRealTypeConversion: true,
  },
  
  // Validation settings
  validation: {
    enableAutoDetect: true,
    supportedPddlTypes: ['domain', 'problem', 'plan'],
  },
  
  // UI settings
  ui: {
    autoRefreshInterval: 5000, // 5 seconds for polling
    defaultPageSize: 20,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },
};

export const config = {
  api: apiConfig,
  features: featuresConfig,
  
  // Helper methods
  getApiUrl: (endpoint = '') => {
    const baseUrl = apiConfig.baseURL.replace(/\/$/, '');
    const cleanEndpoint = endpoint.replace(/^\//, '');
    return cleanEndpoint ? `${baseUrl}/${cleanEndpoint}` : baseUrl;
  },
};