export const API_CONFIG = {
  BASE_URL: "http://localhost:5000",

  TIMEOUT: 10000,

  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },
};

export const API_ENDPOINTS = {
  HEROES: {
    LIST: "/hero",
    CREATE: "/hero",
    GET_BY_ID: (id) => `/hero/${id}`,
    UPDATE: (id) => `/hero/${id}`,
    DELETE: "/hero",
  },
  HERO_POWER: {
    CREATE: "/hero-powers",
    GET_BY_HERO: (heroId) => `/hero-powers/${heroId}`,
    DELETE: (heroId, powerId) => `/hero-powers/${heroId}/${powerId}`,
  },
};

export default {
  API_CONFIG,
  API_ENDPOINTS,
};
