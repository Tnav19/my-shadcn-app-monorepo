import axios from 'axios';

const API_KEY = 'ae0f9a0a4e373646e027290f3609cc89';
const BASE_URL = 'http://api.aviationstack.com/v1';

// Types
export interface Flight {
  id: string;
  flight_number: string;
  airline: Airline;
  departure: {
    airport: string;
    iata: string;
    scheduled: string;
    estimated: string;
    actual: string | null;
    terminal: string | null;
    gate: string | null;
  };
  arrival: {
    airport: string;
    iata: string;
    scheduled: string;
    estimated: string;
    actual: string | null;
    terminal: string | null;
    gate: string | null;
  };
  status: string;
  aircraft_type: string;
  duration: number;
  live: {
    latitude: number;
    longitude: number;
    altitude: number;
    speed: number;
    speed_horizontal: number;
    speed_vertical: number;
    heading: number;
    direction: number;
    is_ground: boolean;
    updated: string;
  } | null;
}

export interface Airport {
  id: string;
  name: string;
  iata: string;
  icao: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
}

export interface Airline {
  id: string;
  name: string;
  iata: string;
  icao: string;
  logo: string;
  country: string;
  founded: number;
  fleet_size: number;
  status: string;
}

export interface AircraftType {
  id: string;
  aircraft_name: string;
  iata_code: string;
  plane_type_id: string;
}

export interface Route {
  id: string;
  airline: {
    name: string;
    iata: string;
    icao: string;
  };
  departure: {
    airport: string;
    iata: string;
    city: string;
    country: string;
  };
  arrival: {
    airport: string;
    iata: string;
    city: string;
    country: string;
  };
  distance: number;
  duration: string;
  aircraft_type: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  population: number;
}

export interface Country {
  id: string;
  name: string;
  iso_code: string;
  population: number;
  capital: string;
  currency: string;
  languages: string[];
}

export interface FlightSchedule {
  id: string;
  flight_number: string;
  airline: Airline;
  departure: {
    airport: string;
    iata: string;
    scheduled: string;
    terminal: string | null;
    gate: string | null;
  };
  arrival: {
    airport: string;
    iata: string;
    scheduled: string;
    terminal: string | null;
    gate: string | null;
  };
  aircraft_type: string;
  status: string;
}

export interface FlightFutureSchedule extends FlightSchedule {
  frequency: string;
  valid_from: string;
  valid_until: string;
}

export interface ApiResponse<T> {
  data: T[];
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
}

export interface Airplane {
  id: string;
  registration_number: string;
  production_line: string;
  iata_type: string;
  model_name: string;
  model_code: string;
  icao_code_hex: string;
  iata_code_short: string;
  construction_number: string;
  test_registration_number: string | null;
  rollout_date: string | null;
  first_flight_date: string;
  delivery_date: string;
  registration_date: string;
  line_number: string;
  plane_series: string;
  airline_iata_code: string;
  airline_icao_code: string | null;
  plane_owner: string;
  engines_count: string;
  engines_type: string;
  plane_age: string;
  plane_status: string;
  plane_class: string | null;
}

export interface TimetableFlight {
  airline: {
    iataCode: string;
    icaoCode: string;
    name: string;
  };
  arrival: {
    actualRunway: string | null;
    actualTime: string | null;
    baggage: string | null;
    delay: string;
    estimatedRunway: string | null;
    estimatedTime: string;
    gate: string | null;
    iataCode: string;
    icaoCode: string;
    scheduledTime: string;
    terminal: string | null;
  };
  codeshared?: {
    airline: {
      iataCode: string;
      icaoCode: string;
      name: string;
    };
    flight: {
      iataNumber: string;
      icaoNumber: string;
      number: string;
    };
  };
  departure: {
    actualRunway: string | null;
    actualTime: string | null;
    baggage: string | null;
    delay: string;
    estimatedRunway: string | null;
    estimatedTime: string;
    gate: string | null;
    iataCode: string;
    icaoCode: string;
    scheduledTime: string;
    terminal: string | null;
  };
  flight: {
    iataNumber: string;
    icaoNumber: string;
    number: string;
  };
  status: string;
  type: 'arrival' | 'departure';
}

export interface FutureFlight {
  weekday: string;
  departure: {
    iataCode: string;
    icaoCode: string;
    terminal: string | null;
    gate: string | null;
    scheduledTime: string;
  };
  arrival: {
    iataCode: string;
    icaoCode: string;
    terminal: string | null;
    gate: string | null;
    scheduledTime: string;
  };
  aircraft: {
    modelCode: string;
    modelText: string;
  };
  airline: {
    name: string;
    iataCode: string;
    icaoCode: string;
  };
  flight: {
    number: string;
    iataNumber: string;
    icaoNumber: string;
  };
  codeshared?: {
    airline: {
      name: string;
      iataCode: string;
      icaoCode: string;
    };
    flight: {
      number: string;
      iataNumber: string;
      icaoNumber: string;
    };
  };
}

export interface FlightTracking {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string | null;
    gate: string | null;
    delay: number;
    scheduled: string;
    estimated: string;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
  };
  arrival: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string | null;
    gate: string | null;
    baggage: string | null;
    delay: number;
    scheduled: string;
    estimated: string;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
  };
  airline: {
    name: string;
    iata: string;
    icao: string;
  };
  flight: {
    number: string;
    iata: string;
    icao: string;
    codeshared: null | {
      airline_name: string;
      airline_iata: string;
      airline_icao: string;
      flight_number: string;
      flight_iata: string;
      flight_icao: string;
    };
  };
  aircraft: {
    registration: string;
    iata: string;
    icao: string;
    icao24: string;
    model: string;
    serial_number: string;
  };
  live: {
    updated: string;
    latitude: number;
    longitude: number;
    altitude: number;
    direction: number;
    speed_horizontal: number;
    speed_vertical: number;
    is_ground: boolean;
  } | null;
}

// Add rate limit handling
const handleApiError = (error: unknown) => {
  if (!(error instanceof Error)) {
    throw new Error('Network error. Please check your connection.');
  }

  const axiosError = error as { response?: { status: number; data?: { error?: { message: string } } } };
  const status = axiosError.response?.status;
  const message = axiosError.response?.data?.error?.message || 'An error occurred while fetching data.';

  if (status === 429) throw new Error('Rate limit exceeded. Please try again later.');
  if (status === 401) throw new Error('Invalid API key. Please check your configuration.');
  if (status === 403) throw new Error('Access forbidden. Please check your API key permissions.');
  
  throw new Error(message);
};

// API Service
export const aviationApi = {
  // Flights
  getFlights: async (params?: {
    flight_iata?: string;
    flight_icao?: string;
    airline_name?: string;
    airline_iata?: string;
    airline_icao?: string;
    flight_status?: string;
    min_delay?: number;
    max_delay?: number;
    departure_iata?: string;
    arrival_iata?: string;
    flight_date?: string;
    dep_iata?: string;
    arr_iata?: string;
    flight_number?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<FlightTracking>> => {
    try {
      const response = await axios.get(`${BASE_URL}/flights`, {
        params: {
          access_key: API_KEY,
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  getFlightByNumber: async (flightNumber: string): Promise<Flight> => {
    const response = await axios.get(`${BASE_URL}/flights`, {
      params: {
        access_key: API_KEY,
        flight_number: flightNumber,
      },
    });
    return response.data.data[0];
  },

  getActiveFlights: async (): Promise<Flight[]> => {
    const response = await axios.get(`${BASE_URL}/flights`, {
      params: {
        access_key: API_KEY,
        flight_status: 'active',
      },
    });
    return response.data.data;
  },

  // Airports
  getAirports: async (params?: {
    search?: string;
    country_code?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<Airport>> => {
    try {
      const response = await axios.get(`${BASE_URL}/airports`, {
        params: {
          access_key: API_KEY,
          ...params,
        },
      });
      return response.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Failed to fetch airports: ${err.message}`);
      }
      throw new Error('Failed to fetch airports');
    }
  },

  getAirportByIata: async (iata: string): Promise<Airport> => {
    const response = await axios.get(`${BASE_URL}/airports`, {
      params: {
        access_key: API_KEY,
        iata_code: iata,
      },
    });
    return response.data.data[0];
  },

  // Airlines
  getAirlines: async (params?: {
    search?: string;
    country_code?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<Airline>> => {
    const response = await axios.get(`${BASE_URL}/airlines`, {
      params: {
        access_key: API_KEY,
        ...params,
      },
    });
    return response.data;
  },

  getAirlineByIata: async (iata: string): Promise<Airline> => {
    const response = await axios.get(`${BASE_URL}/airlines`, {
      params: {
        access_key: API_KEY,
        iata_code: iata,
      },
    });
    return response.data.data[0];
  },

  // Aircraft Types
  getAircraftTypes: async () => {
    const response = await fetch(`${BASE_URL}/aircraft_types?access_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch aircraft types');
    }
    const data = await response.json();
    return {
      data: data.data.map((aircraft: { 
        id: string;
        aircraft_name: string;
        iata_code: string;
        plane_type_id: string;
      }) => ({
        id: aircraft.id,
        aircraft_name: aircraft.aircraft_name,
        iata_code: aircraft.iata_code,
        plane_type_id: aircraft.plane_type_id,
      }))
    };
  },

  // Routes
  getRoutes: async (params?: {
    airline_iata?: string;
    dep_iata?: string;
    arr_iata?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<Route>> => {
    const response = await axios.get(`${BASE_URL}/routes`, {
      params: {
        access_key: API_KEY,
        ...params,
      },
    });
    return response.data;
  },

  // Cities
  getCities: async (params?: {
    search?: string;
    country_code?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<City>> => {
    const response = await axios.get(`${BASE_URL}/cities`, {
      params: {
        access_key: API_KEY,
        ...params,
      },
    });
    return response.data;
  },

  // Countries
  getCountries: async (params?: {
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<Country>> => {
    const response = await axios.get(`${BASE_URL}/countries`, {
      params: {
        access_key: API_KEY,
        ...params,
      },
    });
    return response.data;
  },

  // Flight Schedules
  getFlightSchedules: async (params?: {
    airline_iata?: string;
    flight_number?: string;
    dep_iata?: string;
    arr_iata?: string;
    date?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<FlightSchedule>> => {
    const response = await axios.get(`${BASE_URL}/flight_schedules`, {
      params: {
        access_key: API_KEY,
        ...params,
      },
    });
    return response.data;
  },

  // Future Flight Schedules
  getFutureFlightSchedules: async (params?: {
    airline_iata?: string;
    flight_number?: string;
    dep_iata?: string;
    arr_iata?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<FlightFutureSchedule>> => {
    const response = await axios.get(`${BASE_URL}/flight_future_schedules`, {
      params: {
        access_key: API_KEY,
        ...params,
      },
    });
    return response.data;
  },

  // Airplanes
  getAirplanes: async (params?: {
    search?: string;
    airline_iata?: string;
    iata_type?: string;
    registration_number?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<Airplane>> => {
    const response = await axios.get(`${BASE_URL}/airplanes`, {
      params: {
        access_key: API_KEY,
        ...params,
      },
    });
    return response.data;
  },

  getAirplaneByRegistration: async (registrationNumber: string): Promise<Airplane> => {
    const response = await axios.get(`${BASE_URL}/airplanes`, {
      params: {
        access_key: API_KEY,
        registration_number: registrationNumber,
      },
    });
    return response.data.data[0];
  },

  // Timetable
  getTimetable: async (params: {
    iataCode: string;
    type: 'arrival' | 'departure';
    date?: string;
  }): Promise<ApiResponse<TimetableFlight>> => {
    const response = await axios.get(`${BASE_URL}/timetable`, {
      params: {
        access_key: API_KEY,
        ...params,
      },
    });
    return response.data;
  },

  // Future Flights
  getFutureFlights: async (params: {
    iataCode: string;
    type: 'arrival' | 'departure';
    date: string;
  }): Promise<ApiResponse<FutureFlight>> => {
    const response = await axios.get(`${BASE_URL}/flightsFuture`, {
      params: {
        access_key: API_KEY,
        ...params,
      },
    });
    return response.data;
  },
}; 