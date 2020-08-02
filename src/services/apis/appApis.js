export const fetchJobs = (data) => {
    const requestOptions = {method: 'GET', redirect: 'follow'};
    let queries = [];
    const baseUrl = 'https://jobs.github.com/positions.json';
    if(data.hasOwnProperty('description')){
        queries.push('description=' + data.description);
    }
    if(data.hasOwnProperty('isFullTime')){
        queries.push('full_time=' + data.isFullTime);
    }
    if(data.hasOwnProperty('location')){
        queries.push('location=' + data.location);
    }
    const url = baseUrl + '?' + queries.join("&");
    console.log(url)
    return fetch(url, requestOptions)
        .then(data=>data.json())
        .then((result) => {
            return result
        })
        .catch(error => {throw JSON.stringify(error)});
};