import {useFetch} from '../hooks/fetch'
import { useNavigate } from 'react-router-dom'

function Home() {
  const { data, loading, error } = useFetch('http://localhost:5000/items/')
  const navigate = useNavigate()
  console.log(data)

  if (loading) return (
    <div className="min-h-screen bg-blue-500 px-4 py-10 flex items-center justify-center">
      <div className="text-white text-xl font-semibold">Loading your items...</div>
    </div>
  )
  
  if (error) return (
    <div className="min-h-screen bg-blue-500 px-4 py-10 flex items-center justify-center">
      <div className="text-white text-xl font-semibold">Error: {error.message}</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-blue-500 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Dashboard</p>
          <h1 className="mt-3 text-4xl font-bold text-white">Your Items</h1>
          <p className="mt-3 text-base text-blue-50">
            Manage and review all your products below
          </p>
        </div>

        {/* Items Table */}
        {data && data.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Created Date</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.map((item) => (
                  <tr 
                    key={item._id} 
                    onClick={() => navigate(`/item/${item._id}`)}
                    className="hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{item.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-600 text-sm max-w-xs truncate">{item.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        ${item.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-600 text-sm">
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-center" onClick={(e) => e.stopPropagation()}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                          Edit
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-slate-600 text-lg">No items found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home