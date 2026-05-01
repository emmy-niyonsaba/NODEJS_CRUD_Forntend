import { useFetch } from "../hooks/fetch.js"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function Details() {
  const { id } = useParams()
  const { data, loading, error } = useFetch(`http://localhost:5000/items/${id}`)
  const navigate = useNavigate()
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  })
  const [updating, setUpdating] = useState(false)
  const [updateMessage, setUpdateMessage] = useState('')

  // Update form when data loads
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        description: data.description || '',
        price: data.price || ''
      })
    }
  }, [data])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setUpdating(true)
    setUpdateMessage('')

    try {
      const response = await fetch(`http://localhost:5000/items/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price)
        })
      })

      if (response.ok) {
        setUpdateMessage('Item updated successfully!')
        setTimeout(() => {
          setIsEditModalOpen(false)
          navigate('/home')
        }, 1500)
      } else {
        setUpdateMessage('Failed to update item. Please try again.')
      }
    } catch (err) {
      setUpdateMessage('Error updating item: ' + err.message)
    } finally {
      setUpdating(false)
    }
  }

  const openEditModal = () => {
    setUpdateMessage('')
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setUpdateMessage('')
  }

  if (loading) return (
    <div className="min-h-screen bg-blue-500 px-4 py-10 flex items-center justify-center">
      <div className="text-white text-xl font-semibold">Loading item details...</div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-blue-500 px-4 py-10 flex items-center justify-center">
      <div className="text-white text-xl font-semibold">Error: {error.message}</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-blue-500 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/home')}
          className="mb-6 text-white font-semibold hover:text-blue-100 transition-colors flex items-center gap-2"
        >
          ← Back to Items
        </button>

        {/* Read-only Details Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-blue-500 text-white px-8 py-6">
            <h1 className="text-3xl font-bold">Item Details</h1>
            <p className="text-blue-100 mt-2">ID: {id}</p>
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-6">
            {/* Item Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Item Name
              </label>
              <p className="text-xl font-semibold text-slate-900">{data?.name}</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Description
              </label>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{data?.description}</p>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Price
              </label>
              <p className="text-3xl font-bold text-blue-600">${data?.price?.toFixed(2)}</p>
            </div>

            {/* Additional Info (Read-only) */}
            {data && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div>
                  <p className="text-xs font-semibold text-slate-600">Created:</p>
                  <p className="text-sm text-slate-700">
                    {new Date(data.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                {data.updatedAt && (
                  <div>
                    <p className="text-xs font-semibold text-slate-600">Last Updated:</p>
                    <p className="text-sm text-slate-700">
                      {new Date(data.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={openEditModal}
                className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Update
              </button>
              <button
                onClick={() => navigate('/home')}
                className="flex-1 bg-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-400 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 py-10 z-50">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full">
            {/* Modal Header */}
            <div className="bg-blue-500 text-white px-8 py-6">
              <h2 className="text-2xl font-bold">Update Item</h2>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleUpdate} className="p-8 space-y-6">
              {/* Item Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                  Item Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter item name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter item description"
                  rows="4"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 resize-none"
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-slate-700 mb-2">
                  Price ($)
                </label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter item price"
                  step="0.01"
                  min="0"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Status Message */}
              {updateMessage && (
                <div className={`p-4 rounded-lg font-semibold ${
                  updateMessage.includes('successfully') 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {updateMessage}
                </div>
              )}

              {/* Modal Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {updating ? 'Updating...' : 'Update'}
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={updating}
                  className="flex-1 bg-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-400 transition-colors disabled:bg-slate-200 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Details
