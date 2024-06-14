const iconURL =
  'https://api.appfigures.com/v2/reports/sales/?group_by=products&client_key=1be40558c1de4197b1629674dab0fe62';
const token = 'pat_VTTL34Ues7cT6h2437DO4lE0kxmIhQbo';

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    const response = await fetch(iconUrl, {
      method: 'get',
      headers: new Headers({
        Authorization: 'Bearer ' + token,
      }),
    });
    const data = await response.json();
    
    return {
      statusCode: 200,
      body: data,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
