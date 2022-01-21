const axios = require("axios")


export default async function FetchStoreData(domain: string, api: string, config: object, query: object | string, variable?: object | string) {

    try {
        const response = await axios({
            method: 'post',
            baseURL: domain,
            url: api,
            headers: config,
            data: query, 
            variable
        });
        console.log(response.data)
         return response.data
    } catch (error) {
        console.error(error);
    }
}