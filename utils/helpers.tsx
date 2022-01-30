const axios = require("axios")


export default async function FetchStoreData(domain: string, api: string, config: object, query: object | string, variable?: object ) {
    const graphqlQuery = {
        'query': query, 
        'variables': variable
    }
    try {
        const response = await axios({
            method: 'post',
            baseURL: domain,
            url: api,
            headers: config,
            data: graphqlQuery
        });
        console.log(response.data)
         return response.data
    } catch (error) {
        console.error(error);
    }
}

