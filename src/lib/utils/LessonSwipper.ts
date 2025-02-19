import 'swiper/css';
import Swiper from "swiper";
import {Mousewheel} from "swiper/modules";

export function createSwiper({before, after, initialSlide, height} : {before?: string, after?: string, initialSlide?: number, height?: number}) {

    return new Swiper('.swiper', {
      modules: [Mousewheel],
      direction: "vertical",
      height: height || undefined,
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