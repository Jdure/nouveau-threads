import { QueryClient, useQuery } from 'react-query'
import createCartID from './cart-create'


/**TODO: Add drawer transition 
 * 2.Fetch cart items from storefront API 
 * 3. map fetched data
 * ***/

interface CartDrawerProps{
  isLoading: boolean, 
  errorMsg: string | any,
  id: string | undefined
}

// export const getCartID = () => useQuery('create-cart', createCartID, {staleTime: Infinity, refetchOnMount: false} )
 
export default function CartSideDrawer ({isLoading, errorMsg, id} : CartDrawerProps){
  
  // if (errorMsg) return <div>'An error has occurred: ' + {errorMsg}</div>


  console.log(id)

    return (
        <div className="relative h-full w-full ">
        { errorMsg ? <div className="absolute top-0 right-0">'An error has occurred: ' + {errorMsg}</div> : <div className="absolute top-0 right-0"> 
        <div className='container bg-stone-100 rounded h-96 w-96 shadow'>
        { isLoading ?  <h1 className='flex flex-col pl-4 text-2xl font-bold'>'Loading cart...'</h1> : <h1 className='flex flex-col pl-4 text-2xl font-bold'>Cart</h1>}
        <nav className="mt-10 px-6 ">
              <a className="hover:text-white hover:bg-emerald-300 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg" href="#">
                <span className="mx-4 text-2xl font-normal">
                  Element
                </span>
                <span className="flex-grow text-right">
                </span>
              </a>
            </nav></div></div> }
      </div>
        
    )
}