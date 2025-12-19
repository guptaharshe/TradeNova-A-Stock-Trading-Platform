import { useState } from "react";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Demo orders data
  const orders = [
    {
      id: "ORD001234",
      symbol: "TCS",
      name: "Tata Consultancy Services",
      type: "Buy",
      qty: 10,
      price: 3500,
      orderType: "Market",
      status: "completed",
      exchange: "NSE",
      time: "2024-12-19 10:35:22",
      fees: 15.50,
    },
    {
      id: "ORD001235",
      symbol: "RELIANCE",
      name: "Reliance Industries",
      type: "Buy",
      qty: 5,
      price: 2450,
      orderType: "Limit",
      status: "pending",
      exchange: "BSE",
      time: "2024-12-19 11:20:45",
      fees: 12.25,
    },
    {
      id: "ORD001236",
      symbol: "INFY",
      name: "Infosys Limited",
      type: "Sell",
      qty: 15,
      price: 1480,
      orderType: "Market",
      status: "completed",
      exchange: "NSE",
      time: "2024-12-18 14:15:30",
      fees: 11.10,
    },
    {
      id: "ORD001237",
      symbol: "HDFC",
      name: "HDFC Bank",
      type: "Buy",
      qty: 8,
      price: 1610,
      orderType: "Limit",
      status: "cancelled",
      exchange: "NSE",
      time: "2024-12-18 09:45:12",
      fees: 0,
    },
    {
      id: "ORD001238",
      symbol: "WIPRO",
      name: "Wipro Limited",
      type: "Sell",
      qty: 20,
      price: 428,
      orderType: "Market",
      status: "completed",
      exchange: "BSE",
      time: "2024-12-17 15:30:00",
      fees: 8.56,
    },
  ];

  const statusConfig = {
    completed: { label: "Completed", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30", dot: "bg-emerald-400" },
    pending: { label: "Pending", color: "bg-amber-500/10 text-amber-400 border-amber-500/30", dot: "bg-amber-400" },
    cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-400 border-red-500/30", dot: "bg-red-400" },
  };

  const handleCancelOrder = (orderId) => {
    console.log("Cancel order:", orderId);
    // In real app, call API to cancel
    setSelectedOrder(null);
  };

  const premiumCard = "relative overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#0A0F1C] border border-white/5 backdrop-blur-xl rounded-2xl transition-all duration-300";

  return (
    <div className="animate-page-enter px-4 md:px-6 lg:px-8 py-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <h1
        className="text-4xl md:text-5xl font-black tracking-tight mb-8"
        style={{
          background: 'linear-gradient(135deg, #22d3ee 0%, #67e8f9 50%, #a5f3fc 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Orders
      </h1>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className={`${premiumCard} p-12 text-center`}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            Place your first trade to see it here. Orders will appear once you buy or sell stocks.
          </p>
        </div>
      ) : (
        <>
          {/* Orders count */}
          <p className="text-sm text-gray-500 mb-4">{orders.length} orders</p>

          {/* Orders Table */}
          <div className={`${premiumCard} overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/[0.02]">
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                    <th className="px-5 py-4 font-semibold">Stock</th>
                    <th className="px-4 py-4 font-semibold">Type</th>
                    <th className="px-4 py-4 font-semibold text-right">Qty</th>
                    <th className="px-4 py-4 font-semibold text-right">Price</th>
                    <th className="px-4 py-4 font-semibold">Order Type</th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                    <th className="px-4 py-4 font-semibold">Time</th>
                    <th className="px-4 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((order) => {
                    const status = statusConfig[order.status];

                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-bold text-white">{order.symbol}</p>
                            <p className="text-xs text-gray-500">{order.name}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${order.type === "Buy"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-red-500/10 text-red-400"
                            }`}>
                            {order.type}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right text-white font-medium">{order.qty}</td>
                        <td className="px-4 py-4 text-right text-white font-medium">₹{order.price.toLocaleString()}</td>
                        <td className="px-4 py-4">
                          <span className="text-gray-400 text-sm">{order.orderType}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${status.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-gray-400 text-sm">{order.time.split(' ')[0]}</p>
                          <p className="text-gray-500 text-xs">{order.time.split(' ')[1]}</p>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                            }}
                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedOrder(null)}
          />

          {/* Modal */}
          <div className={`${premiumCard} p-6 w-full max-w-md relative z-10`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Order Info */}
            <div className="space-y-4">
              {/* Stock */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <p className="font-bold text-white text-lg">{selectedOrder.symbol}</p>
                  <p className="text-sm text-gray-500">{selectedOrder.name}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-lg text-sm font-bold ${selectedOrder.type === "Buy"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                  }`}>
                  {selectedOrder.type}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">Order ID</p>
                  <p className="text-white font-semibold text-sm">{selectedOrder.id}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">Exchange</p>
                  <p className="text-white font-semibold text-sm">{selectedOrder.exchange}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">Quantity</p>
                  <p className="text-white font-semibold text-sm">{selectedOrder.qty} shares</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">Price</p>
                  <p className="text-white font-semibold text-sm">₹{selectedOrder.price.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">Order Type</p>
                  <p className="text-white font-semibold text-sm">{selectedOrder.orderType}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">Brokerage</p>
                  <p className="text-white font-semibold text-sm">₹{selectedOrder.fees.toFixed(2)}</p>
                </div>
              </div>

              {/* Timestamp */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-xs text-gray-500 mb-1">Timestamp</p>
                <p className="text-white font-semibold text-sm">{selectedOrder.time}</p>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-gray-400">Status</p>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border ${statusConfig[selectedOrder.status].color}`}>
                  <span className={`w-2 h-2 rounded-full ${statusConfig[selectedOrder.status].dot}`} />
                  {statusConfig[selectedOrder.status].label}
                </span>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <p className="text-gray-300 font-medium">Total Value</p>
                <p className="text-xl font-bold text-white">
                  ₹{(selectedOrder.qty * selectedOrder.price).toLocaleString()}
                </p>
              </div>

              {/* Cancel Button - Only for pending orders */}
              {selectedOrder.status === "pending" && (
                <button
                  onClick={() => handleCancelOrder(selectedOrder.id)}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-200"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
