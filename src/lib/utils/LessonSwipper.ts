import 'swiper/css';
import Swiper from "swiper";
import {Mousewheel} from "swiper/modules";

export function createSwiper({before, after, initialSlide} : {before?: string, after?: string, initialSlide?: number}) {
  return new Swiper('.swiper', {
      modules: [Mousewheel],
      direction: "vertical",
      height: window.innerHeight - 73,
      autoHeight: true,
      initialSlide: initialSlide || 0,
      mousewheel: true,
      on: {
          reachEnd: (sw) => {
              if (after) document.location.href = after;
          },
          reachBeginning: (sw) => {
            if (before) document.location.href = before;
          }
      }

  });
}