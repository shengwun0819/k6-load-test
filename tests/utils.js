import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';
import { check } from 'k6';

import { faker } from './faker';

const getRandom = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

const dateRange = () => {
  const createdAt = faker.date.past(2).toISOString();
  const lastActive = faker.date.between(createdAt, faker.date.recent()).toISOString();
  return [createdAt, lastActive];
};

const randomNumRange = (start, end) => {
  const random_range = [];
  const num_1 = randomIntBetween(start, end);
  const num_2 = randomIntBetween(start, end);
  if (num_2 > num_1) {
    random_range.push(num_1);
    random_range.push(num_2);
  }
  if (num_1 === num_2) {
    random_range.push(0);
    random_range.push(num_2);
  } else {
    random_range.push(num_2);
    random_range.push(num_1);
  }
  return random_range;
};

const checkStatus = (response) => {
  check(response, {
    'status is 200': (r) => r.status === 200,
  });
  if (response.status !== 200) {
    // To log Status/Status-Text from Response.
    console.log(response.url, response.status, response.status_text);
    console.log(JSON.stringify(response.headers, null, 4));
    console.log(JSON.stringify(response.body, null, 4));
    console.log(JSON.stringify(response.error, null, 4));
    console.log(JSON.stringify(response.error_code, null, 4));
    console.log(JSON.stringify(response.request, null, 4));
  }
};

export { checkStatus, dateRange, getRandom, randomNumRange };
