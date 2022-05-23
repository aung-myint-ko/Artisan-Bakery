// const leftFadeOutForHome = {
//   origin: "left",
//   distance: "10px",
//   easing: "ease-out",
//   duration: "1000",
//   //   delay: "800",
// };
// const rightFadeOutForHome = {
//   origin: "right",
//   distance: "10px",
//   easing: "ease-out",
//   duration: "1000",
//   //   delay: "800",
// };
// const leftFadeOut = {
//   origin: "left",
//   distance: "10px",
//   easing: "ease-out",
//   duration: "1000",
//   opacity: "0",
//   interval: "300",
// };
// const rightFadeOut = {
//   origin: "right",
//   distance: "10px",
//   easing: "ease-out",
//   duration: "1000",
//   opacity: "0",
// };
const bottomFadeOut = {
  origin: "bottom",
  distance: "30px",
  easing: "ease-out",
  duration: "1000",
  opacity: "0",
};
const bottomFadeOutForCard = {
  origin: "bottom",
  distance: "30px",
  easing: "ease-out",
  duration: "1000",
  interval: "300",
};

ScrollReveal().reveal(".home_text", bottomFadeOut);
ScrollReveal().reveal(".home_img", bottomFadeOut);
ScrollReveal().reveal(".recepie ", bottomFadeOutForCard);
ScrollReveal().reveal(".about_text", bottomFadeOut);
ScrollReveal().reveal(".about_img", bottomFadeOut);
ScrollReveal().reveal(".card_slider ", bottomFadeOut);
ScrollReveal().reveal(".explore_recepie ", bottomFadeOut);
ScrollReveal().reveal(".menu ", bottomFadeOut);
ScrollReveal().reveal(".food_type ", bottomFadeOut);
ScrollReveal().reveal(".tesimonals_title ", bottomFadeOut);
ScrollReveal().reveal(".swipper", bottomFadeOut);
ScrollReveal().reveal(".booking_title ", bottomFadeOut);
ScrollReveal().reveal(".food_variety ", bottomFadeOutForCard);
ScrollReveal().reveal(".booking_form ", bottomFadeOut);
ScrollReveal().reveal(".footer_details div", bottomFadeOut);
ScrollReveal().reveal(".btn_center", bottomFadeOut);
