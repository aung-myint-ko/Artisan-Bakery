import React from "react";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

//Main history component
function UserHistory(props) {
  const { currentUser } = useSelector((state) => state.cartReducer);
  return (
    <div className="px-4 md:px-14 lg:px-20 py-10 ">
      <h1 className=" text-3xl md:text-3xl pb-5 mb-5 border-b border-slate-300 tracking-wider font-semibold">
        My History
      </h1>

      {currentUser.history.length === 0 ? <EmptyHistory /> : <MappingHistory />}
    </div>
  );
}

//Messgae for empty history
const EmptyHistory = () => {
  return (
    <div className=" w-full h-[calc(100vh_-_202px)] flex justify-center items-center ">
      <h1 className=" text-2xl ">No Records Found</h1>
    </div>
  );
};

//Mapping all history card
const MappingHistory = () => {
  const { currentUser } = useSelector((state) => state.cartReducer);

  return (
    <div className="cart flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 w-full h-[600px] lg:h-[405px] overflow-auto gap-6 mt-5">
      {currentUser.history.map((data, index) => (
        <HistoryCard key={index} historyInfo={data} number={index} />
      ))}
    </div>
  );
};

//History card component
const HistoryCard = ({ historyInfo, number }) => {
  const { date, hour, quantity, amount, foods } = historyInfo;
  return (
    <div className=" shadow-md  border h-fit">
      <div className="pt-4 px-4 bg-slate-50 ">
        <h1 className=" text-xl font-semibold mb-[2px] tracking-wider">
          Order No. {number + 1}
        </h1>
        <h1 className=" flex font-extralight text-sm uppercase tracking-wide text-black/70">
          {date}, {hour}
        </h1>
        <span className=" flex flex-col gap-y-2 py-3">
          {foods.map((food) => (
            <div
              key={food.id}
              className=" flex items-center gap-x-4 pb-2 border-b border-gray-300"
            >
              <LazyLoadImage
                className=" w-10 h-10 rounded-full"
                src={food.imageUrl}
                alt=""
              />
              <span className="w-full grid grid-cols-3 gap-y-1 text-sm">
                <h1 className=" col-span-3 font-semibold ">{food.name}</h1>
                <h1 className="col-span-2">Price : {food.originalPrice} Ks</h1>
                <h1>Qty : {food.orderQuantity}</h1>
              </span>
            </div>
          ))}
        </span>
      </div>
      <div className="py-2 px-4 bg-[#834113] text-white rounded-b tracking-wider ">
        <h1>Amount - {amount} Ks</h1>
        <h1>Total Qty - {quantity}</h1>
      </div>
    </div>
  );
};

export default UserHistory;
