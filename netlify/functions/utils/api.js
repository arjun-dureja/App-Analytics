const fetchData = async (url) => {
  const response = await fetch(url, {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + process.env.API_TOKEN,
    },
  });
  const data = await response.json();
  return data;
};

module.exports = { fetchData };
