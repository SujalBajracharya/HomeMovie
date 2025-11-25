import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  let { cart_items } = useSelector((store) => store.cartStore);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    Swal.fire({
      title: "Removed",
      text: "Item has been removed from the cart.",
      icon: "success",
      html: "<b>Item has been removed from the cart.</b>",
      position: "top-end",
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  };

  const handleClear = () => {
    Swal.fire({
      title: "Clear cart? ",
      text: "This will remove all items from the cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch({ type: "CLEAR_CART" });
        Swal.fire("Done", "Cart cleared", "success");
      }
    });
  };

  const formatTotal = () => {
    const total = cart_items.length * 200; // static price * quantity
    return `Rs ${total}`;
  };

  const handleCheckout = () => {
    // For now we just show a success message — integrate a real checkout later
    Swal.fire(
      "Checkout",
      `Checked out ${cart_items.length} item(s). Total: ${formatTotal()}`,
      "success"
    );
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart_items.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-700 mb-4">Your cart is empty. Try adding some movies to your cart.</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* list */}
          <div className="flex-1 bg-white rounded-lg shadow p-4">
            <div className="grid grid-cols-12 gap-4 font-semibold text-sm text-gray-600 border-b pb-2 mb-3">
              <div className="col-span-1 text-center">S.No</div>
              <div className="col-span-2">Poster</div>
              <div className="col-span-5">Movie</div>
              <div className="col-span-2 text-center">Rating</div>
              <div className="col-span-2 text-right">Price</div>
            </div>

            {cart_items.map((item, idx) => {
              let price = 200; // Assigning a fixed price for demonstration
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 items-center py-3 border-b last:border-b-0"
                >
                  <div className="col-span-1 text-center text-gray-600">
                    {idx + 1}
                  </div>

                  <div className="col-span-2">
                    <Link to={`/${item.id}`}>
                      <img
                        src={item.primaryImage}
                        alt={item.primaryTitle || item.title}
                        className="w-full h-28 object-cover rounded"
                      />
                    </Link>
                  </div>

                  <div className="col-span-5">
                    <Link
                      to={`/${item.id}`}
                      className="text-lg font-semibold text-gray-800 hover:text-primary transition"
                    >
                      {item.primaryTitle || item.title}
                    </Link>
                    <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {item.description || item.overview || ""}
                    </div>
                  </div>

                  <div className="col-span-2 text-center text-gray-700">
                    ⭐ {item.averageRating || "-"}
                  </div>

                  <div className="col-span-2 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <div className="text-lg font-semibold text-gray-600">
                        {price}
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* summary */}
          <aside className="w-full md:w-80 bg-white rounded-lg shadow p-6 flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-500">Order Summary</h3>

            <div className="text-sm text-gray-500">
              Items:{" "}
              <span className="font-semibold text-gray-800 float-right">
                {cart_items.length}
              </span>
            </div>

            <div className="text-sm text-gray-500">
              Subtotal:
              <span className="float-right font-bold text-gray-900">
                {formatTotal()}
              </span>
            </div>

            <div className="border-t pt-4 mt-2">
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-2"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={handleClear}
                className="w-full border border-red-400 text-red-600 py-2 rounded-md hover:bg-red-50 transition"
              >
                Clear Cart
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
