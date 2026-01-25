/**
 * CarnivoreOS - Weather Service
 *
 * OpenWeatherMap API繧剃ｽｿ逕ｨ縺励※螟ｩ豌玲ュ蝣ｱ繧貞叙蠕・ * 繝薙ち繝溘ΦD蜷域・險育ｮ励↓豢ｻ逕ｨ
 */

import { logError } from './errorHandler';

export interface WeatherData {
  temperature: number; // 豌玲ｸｩ・遺с・・  condition: 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy' | 'snowy'; // 螟ｩ豌礼憾諷・  uvIndex: number; // UV謖・焚・・-11+・・  cloudCover: number; // 髮ｲ驥擾ｼ・-100%・・  humidity: number; // 貉ｿ蠎ｦ・・-100%・・  location?: string; // 菴咲ｽｮ諠・ｱ・磯・蟶ょ錐縺ｪ縺ｩ・・  timestamp: string; // 蜿門ｾ玲律譎・}

const WEATHER_CACHE_KEY = 'primal_logic_weather_cache';
const WEATHER_CACHE_DURATION = 60 * 60 * 1000; // 1譎る俣

/**
 * 菴咲ｽｮ諠・ｱ繧貞叙蠕暦ｼ・eolocation API・・ */
export async function getCurrentLocation(): Promise<{ lat: number; lon: number } | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      if (import.meta.env.DEV) {
        console.log('Geolocation API is not supported');
      }
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        logError(error, { component: 'weatherService', action: 'getCurrentLocation' });
        resolve(null);
      },
      {
        timeout: 10000,
        maximumAge: 5 * 60 * 1000, // 5蛻・俣繧ｭ繝｣繝・す繝･
      }
    );
  });
}

/**
 * 菴咲ｽｮ諠・ｱ縺九ｉ驛ｽ蟶ょ錐繧貞叙蠕暦ｼ・everse Geocoding・・ */
export async function getCityName(lat: number, lon: number): Promise<string | null> {
  try {
    // OpenWeatherMap Geocoding API繧剃ｽｿ逕ｨ
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    if (!apiKey) {
      if (import.meta.env.DEV) {
        console.log('OpenWeatherMap API key is not set');
      }
      return null;
    }

    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.length > 0) {
      return data[0].name || null;
    }

    return null;
  } catch (error) {
    logError(error, { component: 'weatherService', action: 'getCityName' });
    return null;
  }
}

/**
 * OpenWeatherMap API縺九ｉ螟ｩ豌玲ュ蝣ｱ繧貞叙蠕・ */
export async function getWeatherData(lat?: number, lon?: number): Promise<WeatherData | null> {
  try {
    // 繧ｭ繝｣繝・す繝･繧堤｢ｺ隱・    const cached = getCachedWeatherData();
    if (cached) {
      return cached;
    }

    // 菴咲ｽｮ諠・ｱ繧貞叙蠕暦ｼ域悴謖・ｮ壹・蝣ｴ蜷茨ｼ・    let location: { lat: number; lon: number } | null = null;
    if (lat && lon) {
      location = { lat, lon };
    } else {
      location = await getCurrentLocation();
    }

    if (!location) {
      if (import.meta.env.DEV) {
        console.log('Location not available');
      }
      return null;
    }

    // OpenWeatherMap API繧ｭ繝ｼ繧堤｢ｺ隱・    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    if (!apiKey) {
      if (import.meta.env.DEV) {
        console.log(
          'OpenWeatherMap API key is not set. Set VITE_OPENWEATHER_API_KEY in .env file.'
        );
      }
      return null;
    }

    // OpenWeatherMap API縺九ｉ螟ｩ豌玲ュ蝣ｱ繧貞叙蠕・    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric&lang=ja`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    // UV謖・焚繧貞叙蠕暦ｼ亥挨API・・    let uvIndex = 0;
    try {
      const uvResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`
      );
      if (uvResponse.ok) {
        const uvData = await uvResponse.json();
        uvIndex = uvData.value || 0;
      }
    } catch (error) {
      // UV謖・焚縺ｮ蜿門ｾ励↓螟ｱ謨励＠縺ｦ繧らｶ夊｡・      if (import.meta.env.DEV) {
        console.log('UV index fetch failed:', error);
      }
    }

    // 螟ｩ豌礼憾諷九ｒ蛻､螳・    const weatherId = data.weather[0]?.id || 800;
    let condition: WeatherData['condition'] = 'cloudy';
    if (weatherId >= 800 && weatherId < 803) {
      condition = 'sunny';
    } else if (weatherId === 803 || weatherId === 804) {
      condition = 'cloudy';
    } else if (weatherId >= 801 && weatherId < 803) {
      condition = 'partly-cloudy';
    } else if (weatherId >= 200 && weatherId < 600) {
      condition = 'rainy';
    } else if (weatherId >= 600 && weatherId < 700) {
      condition = 'snowy';
    }

    // 驛ｽ蟶ょ錐繧貞叙蠕・    const cityName = await getCityName(location.lat, location.lon);

    const weatherData: WeatherData = {
      temperature: data.main.temp || 0,
      condition,
      uvIndex: Math.round(uvIndex * 10) / 10, // 蟆乗焚轤ｹ隨ｬ1菴阪∪縺ｧ
      cloudCover: data.clouds?.all || 0,
      humidity: data.main.humidity || 0,
      location: cityName || undefined,
      timestamp: new Date().toISOString(),
    };

    // 繧ｭ繝｣繝・す繝･縺ｫ菫晏ｭ・    cacheWeatherData(weatherData);

    return weatherData;
  } catch (error) {
    logError(error, { component: 'weatherService', action: 'getWeatherData' });
    return null;
  }
}

/**
 * 螟ｩ豌玲ュ蝣ｱ繧偵く繝｣繝・す繝･縺九ｉ蜿門ｾ・ */
function getCachedWeatherData(): WeatherData | null {
  try {
    const cached = localStorage.getItem(WEATHER_CACHE_KEY);
    if (!cached) {
      return null;
    }

    const data = JSON.parse(cached) as WeatherData & { cachedAt: number };
    const now = Date.now();
    const cacheAge = now - data.cachedAt;

    if (cacheAge > WEATHER_CACHE_DURATION) {
      // 繧ｭ繝｣繝・す繝･縺悟商縺・ｴ蜷医・蜑企勁
      localStorage.removeItem(WEATHER_CACHE_KEY);
      return null;
    }

    // 繧ｭ繝｣繝・す繝･縺九ｉtimestamp繧貞炎髯､縺励※霑斐☆
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cachedAt, ...weatherData } = data;
    return weatherData;
  } catch (error) {
    logError(error, { component: 'weatherService', action: 'getCachedWeatherData' });
    return null;
  }
}

/**
 * 螟ｩ豌玲ュ蝣ｱ繧偵く繝｣繝・す繝･縺ｫ菫晏ｭ・ */
function cacheWeatherData(data: WeatherData): void {
  try {
    const cached = {
      ...data,
      cachedAt: Date.now(),
    };
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(cached));
  } catch (error) {
    logError(error, { component: 'weatherService', action: 'cacheWeatherData' });
  }
}

/**
 * 螟ｩ豌礼憾諷九°繧峨ン繧ｿ繝溘ΦD蜷域・縺ｫ蠖ｱ髻ｿ縺吶ｋ菫よ焚繧定ｨ育ｮ・ */
export function getWeatherVitaminDFactor(weather: WeatherData): number {
  // 螟ｩ豌礼憾諷九↓蝓ｺ縺･縺丈ｿよ焚
  let factor = 1.0;

  // 髮ｲ驥上↓繧医ｋ蠖ｱ髻ｿ・磯峇驥上′螟壹＞縺ｻ縺ｩ菫よ焚縺御ｽ弱＞・・  factor *= (100 - weather.cloudCover) / 100;

  // 螟ｩ豌礼憾諷九↓繧医ｋ蠖ｱ髻ｿ
  switch (weather.condition) {
    case 'sunny':
      factor *= 1.0;
      break;
    case 'partly-cloudy':
      factor *= 0.7;
      break;
    case 'cloudy':
      factor *= 0.3;
      break;
    case 'rainy':
    case 'snowy':
      factor *= 0.1;
      break;
  }

  // UV謖・焚縺ｫ繧医ｋ蠖ｱ髻ｿ・・V謖・焚縺碁ｫ倥＞縺ｻ縺ｩ菫よ焚縺碁ｫ倥＞・・  // UV謖・焚0-11+繧・.5-1.5縺ｮ遽・峇縺ｫ繝槭ャ繝斐Φ繧ｰ
  const uvFactor = 0.5 + (weather.uvIndex / 11) * 1.0;
  factor *= Math.min(uvFactor, 1.5);

  return Math.max(0, Math.min(1, factor)); // 0-1縺ｮ遽・峇縺ｫ蛻ｶ髯・}

