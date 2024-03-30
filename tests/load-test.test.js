import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { group, sleep } from 'k6';
import http from 'k6/http';

import $ from '../config/config.js';
import { checkStatus } from './utils.js';

const api_url = $.API_URL;
const get_api_url = $.GET_API_URL;
const duration = $.K6_DURATION;
const timeUnit = $.K6_TIME_UNIT;
const rate = $.K6_RATE;
const vus = $.K6_VUS;
const pre_vus = 50;
const graceful_stop = $.K6_GRACEFUL_STOP;
const time = 0; // sleep time between each iteration

export const options = {
  // HINT: if you want to run specific case(e.g., post_customers, get_customer_id, ...),
  // you can remove mark of specific block, and then run test.
  // TODO: Threshold provided from K6 can be added to check results
  discardResponseBodies: false,
  setupTimeout: '10m',
  scenarios: {
    post_method: {
      executor: 'constant-arrival-rate',
      exec: 'PostMethod',
      rate: rate,
      timeUnit: timeUnit,
      duration: duration,
      preAllocatedVUs: pre_vus,
      maxVUs: vus,
    },
    get_method_1: {
      executor: 'constant-arrival-rate',
      exec: 'GetMethod_1',
      rate: rate,
      timeUnit: timeUnit,
      duration: duration,
      preAllocatedVUs: pre_vus,
      maxVUs: vus,
      gracefulStop: graceful_stop,
    },
    get_method_2: {
      executor: 'constant-arrival-rate',
      exec: 'GetMethod_2',
      rate: rate,
      timeUnit: timeUnit,
      duration: duration,
      preAllocatedVUs: pre_vus,
      maxVUs: vus,
      gracefulStop: graceful_stop,
    },
    put_method: {
      executor: 'constant-arrival-rate',
      exec: 'PutMethod',
      rate: rate,
      timeUnit: timeUnit,
      duration: duration,
      preAllocatedVUs: pre_vus,
      maxVUs: vus,
      gracefulStop: graceful_stop,
    },
    patch_method: {
      executor: 'constant-arrival-rate',
      exec: 'PatchMethod',
      rate: rate,
      timeUnit: timeUnit,
      duration: duration,
      preAllocatedVUs: pre_vus,
      maxVUs: vus,
      gracefulStop: graceful_stop,
    },
  },
};

export function handleSummary(data) {
  const ISOTime = new Date().toISOString().split('.')[0];
  const path = `./report/report_rps${rate}_${ISOTime}Z.html`;
  return {
    [path]: htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

export function PostMethod() {
  group('POST Method 2 Testing', () => {
    const customer_body = {
      name: 'Kevin Lee',
    };
    const res_post_customer = http.post(`${api_url}/post`, JSON.stringify(customer_body));
    checkStatus(res_post_customer);
    sleep(time);
  });
}

export function GetMethod_1() {
  group('GET Method 1 Testing', () => {
    const res_get = http.get(`${api_url}/get`);
    checkStatus(res_get);
    sleep(time);
  });
}

export function GetMethod_2() {
  group('GET Method 2 Testing', () => {
    const res_get = http.get(`${get_api_url}/public/crocodiles/`);
    checkStatus(res_get);
    sleep(time);
  });
}

export function PutMethod() {
  group('Put Method Testing', () => {
    const customer_body = {
      name: 'Kevin Lee',
    };
    const res_post_customer = http.post(`${api_url}/put`, JSON.stringify(customer_body));
    checkStatus(res_post_customer);
    sleep(time);
  });
}

export function PatchMethod() {
  group('PATCH Method Testing', () => {
    const customer_body = {
      name: 'Kevin Lee',
    };
    const res_post_customer = http.post(`${api_url}/patch`, JSON.stringify(customer_body));
    checkStatus(res_post_customer);
    sleep(time);
  });
}
