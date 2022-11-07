import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  AddToCart,
  DecreaseQuantity,
  IncreaseQuantity,
  ResetQuantity,
} from "../../store/cartSlice";
import { AddingRecipeInfo, CleanigRecipeInfo } from "../../store/recipeSlice";
import CheckingUser from "./CheckingUser";
import FeaturedRecipe from "./FeaturedRecipe";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  RecipiesDetialsLoadingStart,
  RecipiesDetialsLoadingStop,
} from "../../store/loadingSlice";
import PageLoading from "../../custom-hooks/PageLoading";

function RecipeCardDetails(props) {
  const { pathname } = useLocation();
  const { quantity, isError } = useSelector((state) => state.cartReducer);
  const { recipeInfo } = useSelector((state) => state.recipesReducer);
  const { recipiesDetialsLoading } = useSelector(
    (state) => state.loadingReducer
  );
  const { name, desc, imageUrl, price, variety } = recipeInfo;
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(RecipiesDetialsLoadingStart());
    dispatch(ResetQuantity());
    const fetchSpecificRecipe = async () => {
      const singleRecipe = await axios.get(`/recipes/show/${slug}`);
      singleRecipe.status === 201 && dispatch(RecipiesDetialsLoadingStop());
      dispatch(AddingRecipeInfo(singleRecipe.data));
    };
    fetchSpecificRecipe();
  }, [slug, dispatch]);

  const handleAddToCart = () => {
    dispatch(AddToCart({ recipeInfo, quantity }));
  };
  return (
    <>
      {recipiesDetialsLoading ? (
        <PageLoading />
      ) : (
        <div>
          <Link to={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}`}>
            <p className="px-4 md:px-14 lg:px-20 bg-slate-50 py-5 border-b border-gray-300 capitalize ">
              {pathname.split("/")[1]} / {pathname.split("/")[2]}
            </p>
          </Link>

          <div className="px-4 md:px-14 lg:px-20 py-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-10  bg-[#6b320a] ">
            <LazyLoadImage
              className=" w-72 h-72 md:w-96 md:h-96 lg:w-72 lg:h-72 border-slate-300 bg-slate-50 mx-auto rounded  duration-300"
              src={imageUrl}
              alt=""
            />
            <h1 className=" text-3xl md:text-4xl text-center tracking-wider font-semibold lg:max-w-[400px] text-white ">
              {name}
            </h1>
          </div>
          <div className="px-4 md:px-14 lg:px-28 py-12 lg:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-y-7 md:gap-y-10 lg:gap-20 border-b border-gray-300">
            <div>
              <h1 className=" text-2xl md:text-4xl tracking-wider font-semibold mb-5 ">
                Description
              </h1>
              <p className="mb-8 text-sm md:text-base opacity-90">{desc}</p>
              <div className="flex justify-between items-center">
                <h1 className=" text-2xl md:text-4xl tracking-wider font-semibold ">
                  Quantity
                </h1>
                <div className=" flex items-center gap-x-4">
                  <div
                    onClick={() => dispatch(DecreaseQuantity())}
                    className="p-2 rounded-sm border cursor-pointer hover:bg-slate-100 hover:shadow"
                  >
                    <AiOutlineMinus size={20} />
                  </div>
                  <p className="text-2xl w-10 flex justify-center items-center">
                    {quantity}
                  </p>
                  <div
                    onClick={() => dispatch(IncreaseQuantity())}
                    className="p-2 rounded-sm border cursor-pointer hover:bg-slate-100 hover:shadow"
                  >
                    <AiOutlinePlus size={20} />
                  </div>
                </div>
              </div>
            </div>
            <span className=" w-full h-[1px] bg-slate-300 lg:hidden"></span>
            <div className="flex justify-between items-center lg:block">
              <h1 className=" text-2xl md:text-4xl tracking-wider font-semibold max-w-[400px] lg:mb-8 ">
                Total Price
              </h1>
              <p className=" text-4xl lg:text-6xl lg:opacity-80">{price} Ks</p>
            </div>
          </div>
          <FeaturedRecipe variety={variety} />
          <button
            onClick={handleAddToCart}
            className=" fixed right-4 md:14 lg:right-20 bottom-10 border border-white outline-none px-5 py-3 bg-[#6b320a] hover:bg-[#91440e] hover:shadow-xl text-white rounded-full z-40 "
          >
            Add to Order
          </button>
          {isError && <CheckingUser />}
          <Toaster />
        </div>
      )}
    </>
  );
}

export default RecipeCardDetails;
