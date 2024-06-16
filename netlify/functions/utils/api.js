export async function fetchData(url) {
    const response = await fetch(url, {
        method: 'get',
        headers: new Headers({
        Authorization: 'Bearer ' + process.env.API_TOKEN,
        }),
    });
    const data = await response.json();
    return data
}