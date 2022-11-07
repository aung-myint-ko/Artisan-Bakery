import React from "react";
import {
  AddingAllVarietyRecipes,
  AddingBread,
  AddingBurger,
  AddingCakes,
  AddingCookie,
  AddingDonuts,
  AddingDrink,
} from "../../store/recipeSlice";

import { useDispatch } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { MenuLoadingStart, MenuLoadingStop } from "../../store/loadingSlice";

function MenuNavigation(props) {
  const dispatch = useDispatch();
  const handleAll = async () => {
    const cake = await axios.get("/recipes/show/find?variety=cake");
    const burger = await axios.get("/recipes/show/find?variety=burger");
    const bread = await axios.get("/recipes/show/find?variety=bread");
    const donut = await axios.get("/recipes/show/find?variety=donut");
    const cookie = await axios.get("/recipes/show/find?variety=cookie");
    const drink = await axios.get("/recipes/show/find?variety=drink");
    dispatch(
      AddingAllVarietyRecipes([
        cake.data,
        burger.data,
        bread.data,
        donut.data,
        cookie.data,
        drink.data,
      ])
    );
  };
  const handleCake = async () => {
    dispatch(MenuLoadingStart());
    const cakes = await axios.get("/recipes/show/find?variety=cake");
    dispatch(AddingCakes(cakes.data));
    cakes.status === 200 && dispatch(MenuLoadingStop());
  };
  const handleBurger = async () => {
    dispatch(MenuLoadingStart());
    const burger = await axios.get("/recipes/show/find?variety=burger");
    dispatch(AddingBurger(burger.data));
    burger.status === 200 && dispatch(MenuLoadingStop());
  };
  const handleBread = async () => {
    dispatch(MenuLoadingStart());
    const bread = await axios.get("/recipes/show/find?variety=bread");
    dispatch(AddingBread(bread.data));
    bread.status === 200 && dispatch(MenuLoadingStop());
  };
  const handleDonut = async () => {
    dispatch(MenuLoadingStart());
    const donut = await axios.get("/recipes/show/find?variety=donut");
    dispatch(AddingDonuts(donut.data));
    donut.status === 200 && dispatch(MenuLoadingStop());
  };
  const handleCookie = async () => {
    dispatch(MenuLoadingStart());
    const cookie = await axios.get("/recipes/show/find?variety=cookie");
    dispatch(AddingCookie(cookie.data));
    cookie.status === 200 && dispatch(MenuLoadingStop());
  };
  const handleDrink = async () => {
    dispatch(MenuLoadingStart());
    const drink = await axios.get("/recipes/show/find?variety=drink");
    dispatch(AddingDrink(drink.data));
    drink.status === 200 && dispatch(MenuLoadingStop());
  };
  return (
    <>
      <div className="menuNav z-30">
        <ul className="flex lg:flex-col px-5 md:px-14 lg:px-0 py-4 lg:pt-10 bg-white lg:bg-transparent lg:text-lg lg:font-semibold lg:min-w-[190px] overflow-auto gap-x-7 gap-y-5 tracking-wide border-b lg:border-none z-40">
          <NavLink
            to={`/menu/all`}
            className={({ isActive }) =>
              isActive ? "menu_active" : "menu_deactive "
            }
          >
            <li onClick={handleAll}>All</li>
          </NavLink>
          <NavLink
            to={`/menu/cake`}
            className={({ isActive }) =>
              isActive ? "menu_active" : "menu_deactive "
            }
          >
            <li onClick={handleCake}>Cake</li>
          </NavLink>
          <NavLink
            to={`/menu/burger`}
            className={({ isActive }) =>
              isActive ? "menu_active" : "menu_deactive "
            }
          >
            <li onClick={handleBurger}>Burger</li>
          </NavLink>
          <NavLink
            to={`/menu/bread`}
            className={({ isActive }) =>
              isActive ? "menu_active" : "menu_deactive "
            }
          >
            <li onClick={handleBread}>Bread</li>
          </NavLink>
          <NavLink
            to={`/menu/donut`}
            className={({ isActive }) =>
              isActive ? "menu_active" : "menu_deactive "
            }
          >
            <li onClick={handleDonut}>Donut</li>
          </NavLink>
          <NavLink
            to={`/menu/cookie`}
            className={({ isActive }) =>
              isActive ? "menu_active" : "menu_deactive "
            }
          >
            <li onClick={handleCookie}>Cookie</li>
          </NavLink>
          <NavLink
            to={`/menu/drink`}
            className={({ isActive }) =>
              isActive ? "menu_active" : "menu_deactive "
            }
          >
            <li onClick={handleDrink}>Drink</li>
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default MenuNavigation;
