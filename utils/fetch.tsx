const axios = require("axios")

export default async function FetchStoreData (domain: string, api: string, config: object, query: object | string ) {
    axios({
        method: 'post',
        baseURL: domain,
        url: api,
        headers: config,
        data: query
    }).then(async (result: { data: any; }) =>  {
        console.log(result.data)
        return await result.data
    }).catch(async (error: { response: any; }) => {
        console.log(error.response)
    })
}