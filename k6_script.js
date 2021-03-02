import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
};
export default function () {
  http.get('/api/items/{{ id }}/reviews');
  sleep(1);
}