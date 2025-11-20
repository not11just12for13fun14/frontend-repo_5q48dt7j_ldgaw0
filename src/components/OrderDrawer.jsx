import { useMemo } from 'react'

export default function OrderDrawer({ cart, onCheckout }) {
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart])

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sticky top-24">
      <h3 className="font-semibold text-slate-800 mb-2">Your cart</h3>
      {cart.length === 0 ? (
        <p className="text-sm text-slate-500">No items yet.</p>
      ) : (
        <div className="space-y-3">
          {cart.map((p) => (
            <div key={p._id} className="flex items-center justify-between text-sm">
              <div className="truncate pr-2">
                <p className="font-medium truncate">{p.title}</p>
                <p className="text-slate-500">x{p.qty}</p>
              </div>
              <p className="font-semibold">${(p.price * p.qty).toFixed(2)}</p>
            </div>
          ))}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <p className="text-slate-600">Total</p>
            <p className="text-lg font-bold">${total.toFixed(2)}</p>
          </div>
          <button onClick={onCheckout} className="w-full bg-slate-900 text-white rounded-md py-2 hover:bg-slate-800">Checkout</button>
        </div>
      )}
    </div>
  )
}
