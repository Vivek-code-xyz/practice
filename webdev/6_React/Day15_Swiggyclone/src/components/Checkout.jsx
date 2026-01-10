import { useSelector } from "react-redux";

function CheckoutHeader() {
  return (
    <div className="w-full bg-white sticky top-0 z-50 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.25)]">
      <div className="w-[85%] mx-auto h-16 flex items-center justify-between">
        
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png"
            alt="Swiggy"
            className="h-9 bg-[#ff5200] px-3 py-1 rounded"
          />
          <span className="text-gray-700 font-semibold tracking-wide">
            SECURE CHECKOUT
          </span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-8 text-gray-700 font-semibold">
          <button className="flex items-center gap-2 hover:text-black">
            Help
          </button>
          <button className="flex items-center gap-2 hover:text-black">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  const items = useSelector(state => state.cart.items);

  const itemTotal = items.reduce((sum, item) => {
    const price =
      (item.defaultPrice ? item.defaultPrice : item.price) / 100;
    return sum + price * item.quantity;
  }, 0);

  const deliveryFee = itemTotal > 0 ? 24 : 0;
  const gst = Math.round(itemTotal * 0.18);
  const totalPay = Math.round(itemTotal + deliveryFee + gst);

  return (
    <>
    <CheckoutHeader/>
    <div className="w-full bg-[#f2f2f2] min-h-screen py-8">
      <div className="w-[85%] mx-auto flex gap-8">

        {/* LEFT SECTION */}
        <div className="w-[65%] space-y-6">

          {/* ACCOUNT */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-bold text-lg mb-2">Account</h2>
            <p className="text-gray-600 mb-4">
              To place your order now, log in to your existing account or sign up.
            </p>
            <div className="flex gap-4">
              <button className="border border-green-600 text-green-600 px-6 py-2 rounded font-semibold">
                LOG IN
              </button>
              <button className="bg-green-600 text-white px-6 py-2 rounded font-semibold">
                SIGN UP
              </button>
            </div>
          </div>

          {/* DELIVERY ADDRESS */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-bold text-lg mb-2">Delivery address</h2>
            <p className="text-gray-500">Add or select a delivery address</p>
          </div>

          {/* PAYMENT */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-bold text-lg mb-2">Payment</h2>
            <p className="text-gray-500">Select a payment method</p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-[35%]">

          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-bold text-lg mb-4">Your Order</h2>

            {/* ITEMS */}
            {items.map((data) => (
              <div key={data.id}>
                <div className="flex justify-between my-4">
                  <div className="w-[70%]">
                    <p className="font-semibold text-gray-900">{data.name}</p>
                    <p className="text-gray-600 text-sm">
                      ₹{Math.ceil(
                        (data.defaultPrice ? data.defaultPrice : data.price) / 100
                      )} × {data.quantity}
                    </p>
                  </div>

                  <div className="font-semibold text-gray-900">
                    ₹{Math.ceil(
                      ((data.defaultPrice ? data.defaultPrice : data.price) / 100) *
                        data.quantity
                    )}
                  </div>
                </div>
                <div className="h-px bg-gray-200 my-3"></div>
              </div>
            ))}

            {/* NO CONTACT */}
            <div className="border p-4 rounded my-4 text-sm text-gray-700">
              <label className="flex gap-2 items-start">
                <input type="checkbox" />
                Opt in for No-contact Delivery
              </label>
            </div>

            {/* BILL DETAILS */}
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span>₹{Math.round(itemTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span>GST & Other Charges</span>
                <span>₹{gst}</span>
              </div>
            </div>

            <div className="h-0.5 bg-black my-4"></div>

            <div className="flex justify-between font-bold text-lg">
              <span>TO PAY</span>
              <span>₹{totalPay}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
