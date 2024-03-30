import env from '../.env.json';

const k6_global_duration = '10s'; // execution Time
const k6_global_timeUnit = '1s'; // period of time to apply the rate value
const k6_global_rate = '150'; // number of iterations to execute each timeUnit period
const k6_vus = 150; // Maximum number of VUs to allow during the test run
const k6_graceful_stop = '50s';

const api_url = env.TEST_API_URL;
const get_api_url = env.TEST_GET_API;

export default {
  API_URL: api_url,
  GET_API_URL: get_api_url,
  K6_DURATION: k6_global_duration,
  K6_TIME_UNIT: k6_global_timeUnit,
  K6_VUS: k6_vus,
  K6_RATE: k6_global_rate,
  K6_GRACEFUL_STOP: k6_graceful_stop,
};
