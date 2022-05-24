const cakeArray = [
  {
    id: 1,
    image: "images/cake1.webp",
    price: 45,
    title: "Big Cake",
  },
  {
    id: 2,
    image: "images/cake2.webp",
    price: 45,
    title: "Strawberry Cake",
  },
  {
    id: 3,
    image: "images/cake3.webp",
    price: 15,
    title: "Red Pudding Cake",
  },
  {
    id: 4,
    image: "images/cake4.webp",
    price: 15,
    title: "Cup Cake",
  },
  {
    id: 5,
    image: "images/cake5.webp",
    price: 15,
    title: "Blue Cake",
  },
  {
    id: 6,
    image: "images/cake6.webp",
    price: 15,
    title: "Butter Cake",
  },
  {
    id: 7,
    image: "images/cake7.webp",
    price: 15,
    title: "Coffee Cake",
  },
  {
    id: 8,
    image: "images/cake8.webp",
    price: 15,
    title: "Nuts Cake",
  },
];
const cookieArray = [
  {
    id: 1,
    image: "images/cookie1.webp",
    price: 5,
    title: "Taka Cookie",
  },
  {
    id: 2,
    image: "images/cookie2.webp",
    price: 10,
    title: "butter nut Cookie",
  },
  {
    id: 3,
    image: "images/cookie3.webp",
    price: 5,
    title: "Banana Cookie",
  },
  {
    id: 4,
    image: "images/cookie4.webp",
    price: 10,
    title: "Choco Square Cookie",
  },
];
const breadArray = [
  {
    id: 1,
    image: "images/bread1.webp",
    price: 10,
    title: "White Bread",
  },
  {
    id: 2,
    image: "images/bread2.webp",
    price: 30,
    title: "Hot Dog",
  },
  {
    id: 3,
    image: "images/bread3.webp",
    price: 20,
    title: "Brown Bread",
  },
  {
    id: 4,
    image: "images/bread4.webp",
    price: 10,
    title: "Baguette",
  },
  {
    id: 5,
    image: "images/bread5.webp",
    price: 10,
    title: "Loaf",
  },
  {
    id: 6,
    image: "images/bread6.webp",
    price: 35,
    title: "Mutton Burger",
  },
  {
    id: 7,
    image: "images/bread7.webp",
    price: 10,
    title: "Croissant",
  },
  {
    id: 8,
    image: "images/bread8.webp",
    price: 10,
    title: "Sandwich",
  },
];
const donutArray = [
  {
    id: 1,
    image: "images/donut1.webp",
    price: 13,
    title: "Blueberry Donut",
  },
  {
    id: 2,
    image: "images/donut2.webp",
    price: 13,
    title: "Strawberry donut",
  },
  {
    id: 3,
    image: "images/donut3.webp",
    price: 13,
    title: "Jelly Donut",
  },
  {
    id: 4,
    image: "images/donut4.webp",
    price: 13,
    title: "Creamy donut",
  },
  {
    id: 5,
    image: "images/donut5.webp",
    price: 13,
    title: "Old-fashioned Donut",
  },
  {
    id: 6,
    image: "images/donut6.webp",
    price: 13,
    title: "Banana Donut",
  },
  {
    id: 7,
    image: "images/donut7.webp",
    price: 13,
    title: "Chocolate donut",
  },
];

const navigation = document.querySelector(".navigation");
const navLinks = document.querySelector(".nav_links");
const navLi = document.querySelectorAll(".nav_links ul li a");
const foodTypeBtn = document.querySelectorAll(".food_type li");
const foodVariety = document.querySelector(".food_variety");
const cakeBtn = document.querySelector(".food_type .cake");
const cookieBtn = document.querySelector(".food_type .cookies");
const breadBtn = document.querySelector(".food_type .bread");
const donutBtn = document.querySelector(".food_type .donuts");
const hamburger = document.querySelector(".hamburger");
const loading = document.querySelector(".loading");

//adding page loading
window.addEventListener("load", () => {
  setTimeout(() => {
    loading.style.display = "none";
  }, 500);
});

//toggling hamburger_menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("nav_close");
});

document.addEventListener("click", (event) => {
  if (event.target.id !== "hamburger" && event.target.id !== "nav_links") {
    hamburger.classList.remove("open");
    navLinks.classList.remove("nav_close");
    return;
  }
});

//code written make sure nav links is clicked or not on navigation bar
navLi.forEach((nav) => {
  nav.addEventListener("click", () => {
    navLi.forEach((nav) => {
      nav.classList.remove("change");
    });
    nav.classList.add("change");
  });
});

//hot selling food_recepie slider(used third party libery)
new Glider(document.querySelector(".glider"), {
  slidesToScroll: 1,
  slidesToShow: 3,
  draggable: true,
  dots: ".dots",
  arrows: {
    prev: ".glider-prev",
    next: ".glider-next",
  },
  responsive: [
    {
      // screens greater than >= 775px
      breakpoint: 775,
      settings: {
        slidesToShow: "4",
        // slidesToScroll: "1",
        duration: 0.25,
      },
    },
    {
      // screens greater than >= 600px
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        duration: 0.25,
      },
    },
    {
      // screens greater than >= 400px
      breakpoint: 400,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        itemWidth: 200,
        duration: 0.25,
      },
    },
    {
      // screens greater than >= 300
      breakpoint: 300,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        duration: 0.25,
      },
    },
  ],
});

//code written make sure button is clicked or not on food type nav
foodTypeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    foodTypeBtn.forEach((value) => {
      value.classList.remove("clicked");
    });
    btn.classList.add("clicked");
  });
});
//rendering foodcard
const renderingFoodCard = (input) => {
  for (let i = 0; i < input.length; i++) {
    foodVariety.innerHTML += `
    <div loading="lazy" class="col-lg-3 col-md-4 col-sm-4 col-xs-6 food_card">
    <div class="food_card_child">
    <div class="food_img">
        <img loading="lazy" src="${input[i].image}" />
    </div>
    <div class="card_text">
      <h5 class="price">$${input[i].price}</h5>
      <p class="title">${input[i].title}</p>
      <div class="star_icons">
      <img
        src="./svg-icons/star.svg"
      />
      <img
        src="./svg-icons/star.svg"
      />
      <img
        src="./svg-icons/star.svg"
      />
      <img
        src="./svg-icons/star.svg"
      />
      <img
        src="./svg-icons/star.svg"
      />
    </div>
    </div>
    
    </div>
  </div>
    `;
  }
  return;
};

const check = cakeBtn.classList.contains("clicked");
if (!check) {
  foodVariety.innerHTML = "";
} else {
  renderingFoodCard(cakeArray);
}
cakeBtn.addEventListener("click", () => {
  foodVariety.innerHTML = "";
  renderingFoodCard(cakeArray);
});
cookieBtn.addEventListener("click", () => {
  foodVariety.innerHTML = "";
  renderingFoodCard(cookieArray);
});
breadBtn.addEventListener("click", () => {
  foodVariety.innerHTML = "";
  renderingFoodCard(breadArray);
});
donutBtn.addEventListener("click", () => {
  foodVariety.innerHTML = "";
  renderingFoodCard(donutArray);
});
//adding boxshawdow to navigation bar when it was scroll
window.addEventListener("scroll", function () {
  if (this.scrollY > 20) {
    navigation.classList.add("boxShawdow");
  } else {
    navigation.classList.remove("boxShawdow");
  }
});
//testimonials card slider
new Glider(document.querySelector(".swipper"), {
  slidesToScroll: 1,
  slidesToShow: 3,
  draggable: true,
  arrows: {
    prev: "#glider-prev",
    next: "#glider-next",
  },
  responsive: [
    {
      // screens greater than >= 1000px
      breakpoint: 1000,
      settings: {
        slidesToShow: "3",
        // slidesToScroll: "1",
        duration: 0.25,
      },
    },
    {
      // screens greater than >= 700px
      breakpoint: 700,
      settings: {
        slidesToShow: "2",
        slidesToScroll: "2",
        duration: 0.25,
      },
    },
    {
      // screens greater than >= 300px
      breakpoint: 300,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        duration: 0.25,
      },
    },
  ],
});

// $(window).scroll(function () {
//   if ($(this).scrollTop() > 90) {
//     $(".navigation").addClass("boxShawdow");
//   } else {
//     $(".navigation").removeClass("boxShawdow");
//   }
// });
