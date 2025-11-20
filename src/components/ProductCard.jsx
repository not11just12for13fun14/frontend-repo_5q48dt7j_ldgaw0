export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white hover:shadow-xl transition overflow-hidden">
      {product.image_url ? (
        <img src={product.image_url} alt={product.title} className="w-full h-44 object-cover" />
      ) : (
        <div className="w-full h-44 bg-gradient-to-br from-slate-100 to-slate-200" />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 truncate">{product.title}</h3>
        <p className="text-xs text-slate-500 mb-2 truncate">{product.category} • by {product.seller_name}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          <button onClick={() => onAdd(product)} className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded-md hover:bg-slate-800">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
