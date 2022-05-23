import { IMAGE_URLS } from "../constants";

export const populateImage = (collection) => {
  collection.forEach((category, i) => {
    category &&
      category.restaurantList.forEach((_restaurant, j) => {
        collection[i].restaurantList[j].image_src =
          IMAGE_URLS[Math.floor(Math.random() * IMAGE_URLS.length)];
      });
  });
};
