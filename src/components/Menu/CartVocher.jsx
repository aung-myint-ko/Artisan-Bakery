import React from "react";
import { GrClose } from "react-icons/gr";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  CartDecreaseQuantity,
  CartIncreaseQuantity,
  RemoveFromCart,
} from "../../store/cartSlice";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function CartVocher(props) {
  let { orderLists, finalTotalPrice, totalQuantity } = useSelector(
    (state) => state.cartReducer
  );
  orderLists.map((order) => (finalTotalPrice += order.totalPrice));

  return (
    <>
      {orderLists.length === 0 || totalQuantity === 0 ? (
        //If orderlists array empty
        <EmptyCart />
      ) : (
        <>
          {/*Divide the page into 2 part */}
          <div className="flex flex-col lg:flex-row lg:h-[564px]">
            {/*First part that will show lists of order */}
            <div className=" lg:w-[60%] px-4 md:px-14 lg:pl-20 lg:pr-5 ">
              <h1 className=" text-3xl pt-5 md:pt-8 pb-4 tracking-wider font-semibold border-b border-gray-300 ">
                Your Cart
              </h1>
              {/*Mapping single Order in OrderLists Array*/}
              <div className="cart my-4 lg:my-5 h-[472px] lg:h-[434px] overflow-auto flex flex-col gap-y-4 ">
                {orderLists.map((order) => {
                  return <CartItem key={order.id} order={order} />;
                })}
              </div>
            </div>
            {/*Second part that will show Total Price */}
            <div className=" lg:w-[40%] py-8 md:py-12 lg:py-0 px-6 md:px-20 lg:pr-20 lg:pl-10 flex flex-col justify-center bg-[#6b320a]">
              <div className="text-3xl lg:text-4xl pb-6 lg:py-6 mb-5 md:mb-8 border-b lg:border-y border-gray-300 w-full flex justify-between items-center tracking-wider font-semibold text-white ">
                <h1>Total</h1>
                <h1>-</h1>
                <h1>{finalTotalPrice} Ks</h1>
              </div>
              <Link to={"/cart/order"} className="flex justify-center ">
                <button className=" mx-auto py-2 px-[25px] bg-[#974103]  rounded-full text-white border border-white text-lg hover:bg-[#b15412]">
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const CartItem = ({ order }) => {
  const { id, imageUrl, name, originalPrice, orderQuantity, totalPrice } =
    order;
  const dispatch = useDispatch();
  const handleRemove = () => {
    dispatch(
      RemoveFromCart({
        id: id,
        quantity: orderQuantity,
      })
    );
  };
  const handleDecrease = () => {
    dispatch(
      CartDecreaseQuantity({
        id: id,
        price: originalPrice,
        quantity: orderQuantity,
      })
    );
  };
  const handleIncrease = () => {
    dispatch(
      CartIncreaseQuantity({
        id: id,
        price: originalPrice,
      })
    );
  };
  return (
    <>
      <div className="grid grid-cols-6 md:grid-cols-10  bg-slate-100 py-3 md:py-4 rounded items-center ">
        {/*Order Image*/}
        <LazyLoadImage
          className="col-span-2 w-20 h-20 md:w-24 md:h-24 ml-[5%]  my-auto rounded-full "
          src={imageUrl}
          alt=""
        />
        {/*--------------------------------------------- */}
        {/* Mobile UI */}
        {/*Order Specific Details*/}
        <div className=" md:hidden mt-2 col-span-3 grid grid-cols-2 gap-x-4 items-center">
          <h1 className="md:hidden text-lg mb-3 col-span-2 font-semibold ">
            {name}
          </h1>
          {/* Quantity */}
          <div className=" flex gap-x-2 items-center">
            <AiOutlineMinusCircle
              onClick={handleDecrease}
              className="text-[24px] opacity-70 cursor-pointer"
            />
            <h1 className="w-3 flex justify-center items-center">
              {orderQuantity}
            </h1>
            <AiOutlinePlusCircle
              onClick={handleIncrease}
              className="text-[24px] opacity-70 cursor-pointer"
            />
          </div>
          {/* Total Price */}
          <p>{totalPrice} Ks</p>
        </div>
        {/* Order Name */}

        {/*Cross Icon to close */}
        <GrClose
          onClick={handleRemove}
          className=" md:hidden text-[22px] mx-auto opacity-70 cursor-pointer"
        />

        {/*--------------------------------------------- */}
        {/* Desktop UI */}
        {/*Order Specific Details*/}
        <div className=" hidden md:block col-span-7">
          {/* Order Name */}
          <h1 className="font-semibold text-2xl mb-3">{name}</h1>
          <div className="grid grid-cols-3 items-center">
            {/* Price */}
            <div>
              <h1 className="text-lg font-semibold mb-1">Price</h1>
              <p className=" mx-auto text-lg">{originalPrice} Ks</p>
            </div>
            {/* Quantity */}
            <div>
              <h1 className="text-lg font-semibold mb-1">Quantity</h1>
              <div className=" flex gap-x-4 items-center">
                <AiOutlineMinusCircle
                  onClick={handleDecrease}
                  className="text-[25px] opacity-70 cursor-pointer"
                />
                <h1 className="w-5 flex justify-center items-center">
                  {orderQuantity}
                </h1>
                <AiOutlinePlusCircle
                  onClick={handleIncrease}
                  className="text-[25px] opacity-70 cursor-pointer"
                />
              </div>
            </div>
            {/* Total Price */}
            <div>
              <h1 className="text-lg font-semibold mb-1">Total Price</h1>
              <p className=" mx-auto text-lg">{totalPrice} Ks</p>
            </div>
          </div>
        </div>
        {/*Cross Icon to close */}
        <GrClose
          onClick={handleRemove}
          className=" hidden md:block text-[22px] mx-auto opacity-70 cursor-pointer"
        />
      </div>
    </>
  );
};
const EmptyCart = () => {
  return (
    <>
      <div className=" px-4 md:px-14 h-[calc(100vh_-_73px)] lg:h-[564px] flex flex-col justify-center items-center">
        <LazyLoadImage
          className=" w-[200px]"
          src="/images/empty-shopping-bag.svg"
          alt=""
        />
        <h1 className="text-3xl md:text-4xl text-center font-semibold mb-4 tracking-wider">
          Your cart is empty
        </h1>
        <p className=" text-sm md:text-base text-center mb-4 md:max-w-lg tracking-wide opacity-90">
          Looks like you haven't made your ordering. As you add menu items,
          they'll appear here. You'll have a chance to review before placing
          your order.
        </p>
        <Link to={"/menu/all"}>
          <button className=" py-[10px] px-7 mx-auto bg-[#974103]  rounded-full text-white border border-white text-lg hover:bg-[#b15412]">
            Go to Menu
          </button>
        </Link>
      </div>
    </>
  );
};

export default CartVocher;
