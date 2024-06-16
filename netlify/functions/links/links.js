const { fetchData } = require("../utils/api");

const linkURL =
  'https://api.appfigures.com/v2/products/mine/?meta=true&client_key=1be40558c1de4197b1629674dab0fe62';

const handler = async () => {
  try {
    const data = await fetchData(linkURL)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
