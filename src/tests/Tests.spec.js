import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 7,

  stages: [
    { duration: '1m', target: 92 },
    { duration: '1m30s', target: 92 },
    { duration: '1m', target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(90)<6800'],
    http_req_failed: ['rate<0.25'],
  },
};

export default function () {
  const response = http.get(
    'https://quickpizza.grafana.com/api/json'
  );

  check(response, {
    'Status 200': (r) => r.status === 200,
  });

  sleep(10);
}