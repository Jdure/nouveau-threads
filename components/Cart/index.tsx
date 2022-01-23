import Head from 'next/head'


/**
 * TODO: Steps to create Cart with storefront
 * 1. Create a cart and add a line item
 * 2. Retrieve a cart
 * 3. Increase an item's quantity
 * 4. Update customer information
 * 5. Retrieve checkout URL
 * 
 * 
 */

export default function Cart (){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="relative bg-white dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row sm:justify-around">
          <div className="w-96 h-screen">
            <div className="flex items-center justify-start mx-6 mt-10">
              <span className="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
                Cart
              </span>
            </div>
            <div className="flex items-center justify-start mx-6 mt-10">
            <ul className="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
              <li>Item 4</li>
              <li>Item 5</li>
            </ul>
            </div>
            <div className="flex items-center justify-center mx-6 mt-10">
            <button
                className="flex ml-auto text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}