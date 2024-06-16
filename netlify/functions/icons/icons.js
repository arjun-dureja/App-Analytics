const { fetchData } = require("../utils/api");

const iconURL =
  'https://api.appfigures.com/v2/reports/sales/?group_by=products&client_key=1be40558c1de4197b1629674dab0fe62';

const handler = async (event) => {
  try {
    const data = await fetchData(iconURL)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
