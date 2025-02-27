import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'

const HomeCards = () => {
  return (
       <section className="py-">
       <div className="container-xl lg:container m-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 rounded-lg">
           <Card>
           <h2 className="text-2xl font-bold">For Test</h2>
             <p className="mt-2 mb-4">
               Browsse test products
             </p>
             <Link
               to="/AllProducts"
               className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
             >
               Browse test
             </Link>
           </Card>
           <Card bg='bg-red-100'>
           <h2 className="text-2xl font-bold">For Test</h2>
             <p className="mt-2 mb-4">
             Browsse test products
             </p>
             <Link
               to="/add-job"
               className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
             >
               Add test
             </Link>
            </Card>
         </div>
       </div>
     </section>
  )
}

export default HomeCards;
