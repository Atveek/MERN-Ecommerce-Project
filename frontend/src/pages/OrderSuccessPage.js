import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { resetOrder } from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";

export default function OrderSuccessPage() {
  const param = useParams();
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetCartAsync(userInfo.id));
    dispatch(resetOrder());
  }, [dispatch, userInfo.id]);
  return (
    <>
      {!param.id && <Navigate to="/" replace={true}></Navigate>}

      <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
          <p class="text-base font-semibold text-indigo-600">
            Order Successfully Placed
          </p>
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order Number #{param?.id}
          </h1>
          <p class="mt-6 text-base leading-7 text-gray-600">
            You can check your order in My Account My Orders
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
