import { sleep } from 'k6';
import http from 'k6/http';

export let options = {
  duration: '1m',
  vus: 50,
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
  },
};

const API_BASE_URL = 'http://localhost';

export default function () {
  let requests = {
    forever: {
      method: 'GET',
      url: `${API_BASE_URL}:8080/`,
    },
    'pm2/rolling': {
      method: 'GET',
      url: `${API_BASE_URL}:8090/`,
    },
  };

  let responses = http.batch(requests);

  check(responses['forever'], {
    'forever status was 200': (res) => res.status === 200,
  });

  check(responses['public/crocodiles/${Id}'], {
    'pm2/rolling status was 200': (res) => res.status === 200,
  });

  sleep(3);
}
