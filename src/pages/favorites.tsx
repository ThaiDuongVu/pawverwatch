import NavBar from "@/components/navbar";
import DefaultHead from "@/components/default-head";
import { useEffect, useState } from "react";
import FavoriteCard from "@/components/favorite-card";
import { ReactElement } from "react";
import { removeStringFromArray } from "@/helper";
import Image from "next/image";
import Toast from "@/components/toast";

export const FAVORITES_KEY = "pawverwatch-favorites";

const Favorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  // Get favorites from cookies
  const fetchFavorites = async () => {
    const images = await localStorage.getItem(FAVORITES_KEY)?.split(";") ?? [];
    const temp: string[] = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image.length === 0 || image === "data:image/png") continue;
      temp.push(image);
    }
    setFavorites(temp);
  }
  useEffect(() => {
    if (favorites.length > 0) return;
    const getFavorites = async () => { await fetchFavorites(); }
    getFavorites();
  }, [favorites]);

  const removeFromFavorites = (favorite: string) => {
    const newFavorites = removeStringFromArray(favorite, favorites);
    let temp = "";
    newFavorites.forEach((image) => {
      temp += `${image};`;
    });
    localStorage.setItem(FAVORITES_KEY, temp);
    window.location.reload();
  }

  const favoriteItemsGrid = () => {
    if (favorites.length <= 0) {
      return (
        <div>
          <h4>Kinda empty in here</h4>
          <br />
          <Image
            src="/images/cat-nap.png"
            alt="cat nap"
            width={512}
            height={512}
            loading="lazy"
          />
        </div>
      );
    }
    let rows: ReactElement[] = [];
    for (let i = 0; i < favorites.length; i += 2) {
      const favorite1 = favorites[i];
      const favorite2 = favorites[i + 1];
      rows = [...rows,
      <div className="row" key={`favoriteRow${i}`}>
        <div className="col">
          {<FavoriteCard src={favorite1} onFavoriteRemoved={removeFromFavorites} />}
        </div>
        {favorite2
          ?
          <div className="col">
            {<FavoriteCard src={favorite2} onFavoriteRemoved={removeFromFavorites} />}
          </div>
          :
          <></>}
      </div>
      ]
    }
    return rows;
  }

  return (
    <div>
      <DefaultHead />
      <NavBar currentPage="favorites" />
      <br />

      <div className="container text-center">
        {favoriteItemsGrid()}
      </div>

      <Toast id="removedToast" header="Removed" message="Image removed from favorites" isError={true} />
    </div>
  );
}

export default Favorites;
