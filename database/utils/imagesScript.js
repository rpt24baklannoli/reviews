/* eslint-disable no-plusplus */
const faker = require('faker');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const url = [];
// 1000 fake images from fakter
for (let i = 0; i < 1000; i++) {
  url.push(faker.image.fashion());
}

// download 1000 user photos to local image folder
for (let i = 0; i < url.length; i++) {
  // path for image storage
  const imagePath = path.join(__dirname, '../images', `${i}.jpg`);
  axios({
    method: 'get',
    url: url[i],
    responseType: 'stream',
  })
    .then((response) => {
      response.data.pipe(fs.createWriteStream(imagePath));
    });
}
