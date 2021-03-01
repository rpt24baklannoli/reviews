import http from 'k6/http';

const reviewsData = [
  {
    customer_name: 'Jennifer Stewart',
    date_of_review: 'Oct 31 2020',
    rating: 5,
    review_content: '',
    image_url: 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/269.jpg',
    item_option: 'Hot Pink',
  },
  {
    customer_name: 'thebec69',
    date_of_review: 'Nov 11 2020',
    rating: 5,
    review_content: '',
    image_url: 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/280.jpg',
    item_option: 'Black',
  },
  {
    customer_name: 'Beverly Smith',
    date_of_review: 'Nov 10 2020',
    rating: 5,
    review_content: 'Really love this mask in black! I received a lot of compliments. It was delivered on time .',
    image_url: 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/269.jpg',
    item_option: 'Black',
  },
  {
    customer_name: 'dancinladyy',
    date_of_review: 'Nov 3 2020',
    rating: 3,
    review_content: 'NEEDS TO BE LONGER SO IT COMPLETELY COVERS CHIN',
    image_url: 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/233.jpg',
    item_option: 'Black',
  },
  {
    customer_name: 'Kazza',
    date_of_review: 'Nov 11 2020',
    rating: 5,
    review_content: 'Speedy delivery Item nice Recommend',
    image_url: 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/222.jpg',
    item_option: 'Christmas tree+bow',
  },
  {
    customer_name: 'Angela Naylor',
    date_of_review: 'Oct 21 2020',
    rating: 5,
    review_content: 'Absolutely beautiful will definitely be purchasing some more . Delivery time outstanding so quick thank you so much xx 💜',
    image_url: 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/666.jpg',
    item_option: 'Christmas tree+bow',
  },
  {
    customer_name: 'ruthiebaby1619',
    date_of_review: 'Nov 9 2020',
    rating: 5,
    review_content: "This mask is fabulous! Glitter design at both sides. Very comfortable. Can't wait till December to wear it!",
    image_url: 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/898.jpg',
    item_option: 'Christmas tree+bow',
  },
  {
    customer_name: 'Laura Hendricks',
    date_of_review: 'Oct 20 2020',
    rating: 5,
    review_content: 'Very comfortable and breathable without being right up against my mouth',
    image_url: 'https://fetsy-reviews-sdc.s3.us-east-2.amazonaws.com/images/555.jpg',
    item_option: '06. grey rose bows',
  },
];

export const options = {
  discardResponseBodies: true,
  scenarios: {
    one_request: {
      executor: 'constant-arrival-rate',
      exec: 'one_request',
      rate: 1,
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 1,
      maxVUs: 1,
    },
    ten_requests: {
      executor: 'constant-arrival-rate',
      exec: 'ten_requests',
      rate: 10,
      timeUnit: '1s',
      startTime: '60s',
      duration: '60s',
      preAllocatedVUs: 10,
      maxVUs: 10,
    },
    hundred_requests: {
      executor: 'constant-arrival-rate',
      exec: 'hundred_requests',
      rate: 100,
      timeUnit: '1s',
      startTime: '120s',
      duration: '60s',
      preAllocatedVUs: 100,
      maxVUs: 100,
    },
    thousand_requests: {
      executor: 'constant-arrival-rate',
      exec: 'thousand_requests',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      startTime: '180s',
      duration: '60s',
      preAllocatedVUs: 1000, // how large the initial pool of VUs would be
      maxVUs: 1000, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export function one_request () {
  let id = 9700000 + __VU;
  let url = `http://localhost:3002/api/items/${id}/reviews`;
  let payload = JSON.stringify(
    reviewsData[__VU % reviewsData.length]
  );
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post(url, payload, params);
}
export function ten_requests () {
  let id = 9700000 + __VU;
  let url = `http://localhost:3002/api/items/${id}/reviews`;
  let payload = JSON.stringify(
    reviewsData[__VU % reviewsData.length]
  );
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post(url, payload, params);
}
export function hundred_requests () {
  let id = 9700000 + __VU;
  let url = `http://localhost:3002/api/items/${id}/reviews`;
  let payload = JSON.stringify(
    reviewsData[__VU % reviewsData.length]
  );
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post(url, payload, params);
}

export function thousand_requests () {
  let id = 9700000 + __VU;
  let url = `http://localhost:3002/api/items/${id}/reviews`;
  let payload = JSON.stringify(
    reviewsData[__VU % reviewsData.length]
  );
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post(url, payload, params);
}
