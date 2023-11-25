import React, { useContext, useEffect } from "react";
import signin from "./Signin.module.css";
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import {
  clearLocalStorage,
  getItemLocalStorage,
  setItemLocalStorage,
} from "../../../../server/src/utils/ExportUtils";

function signinPage() {
  let ALL_IMG =
    "https://i0.wp.com/saveeartheducation.com/wp-content/uploads/2022/06/Untitled-design-2022-06-14T185213.555.png?resize=799%2C440&ssl=1";
  let FOOD_IMG =
    "https://media.cnn.com/api/v1/images/stellar/prod/160427133356-roasted-vegetables.jpg?q=w_3175,h_1786,x_0,y_0,c_fill";
  let healtAndFitness =
    "https://thumbs.dreamstime.com/b/sport-health-fitness-dumbbells-stethoscope-wooden-background-top-view-copyspace-98756042.jpg";
  let TRAVEL_IMG =
    "https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_1280.jpg";
  let MOVIE_IMG =
    "https://cdn.pixabay.com/photo/2012/08/27/22/59/movie-projector-55122_640.png";
  let EDUCATION_IMG =
    "https://thumbs.dreamstime.com/b/children-education-kid-read-book-school-boy-reading-books-dreaming-over-blackboard-background-92807607.jpg";
  let BookmarkImage = "https://cdn-icons-png.flaticon.com/512/494/494568.png";
  let hamburger =
    "https://icon-library.com/images/hamburger-menu-icon-svg/hamburger-menu-icon-svg-13.jpg";

  const navigate = useNavigate();
  const [addStoryPopup, setAddstoryPopuo] = useState(false);
  const [hamburgerPopUp, setHamburgerPopUp] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        let userLoggedIn = await axios.get(
          "http://localhost:7000/api/v1/users/tokenverify",
          {
            headers: {
              Authorization: `${getItemLocalStorage("token")}`,
            },
          }
        );
        if (userLoggedIn.data.status == "User verified") {
        } else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
      }
    })();
  }, [navigate]);

  const addStoryPopupHandler = () => {
    setAddstoryPopuo(true);
  };

  const bookmarkPopupHandler = () => {};

  const hamburgurHandler = () => {
    setHamburgerPopUp(true);
  };

  const logoutHandler = () => {
    navigate("/")
    clearLocalStorage()
  }

  return (
    <div
      className={addStoryPopup ? signin.blurBack : signin.parent}
      onClick={() => {}}
    >
      <div className={signin.navbar}>
        <div className={signin.title}>
          <h2>SwipTory</h2>
        </div>
        <div className={signin.nav_btns}>
          <div className={signin.btns}>
            <div
              className={signin.register_btn}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={bookmarkPopupHandler}>
                <img src={BookmarkImage} alt="" />
                Bookmarks
              </button>
            </div>

            <div
              className={signin.signin_btn}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={addStoryPopupHandler}>Add story</button>
            </div>
          </div>
          <div className={signin.hamburgur}>
            <img src={hamburger} alt="" onClick={hamburgurHandler} />
          </div>
        </div>
      </div>

      <div
        className={hamburgerPopUp ? signin.hamburgerpopupdiv : signin.displaynone}
      >
        <div className={signin.username}>{getItemLocalStorage("username")}</div>
        <div className={signin.logout_btn}>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>

      <div className={signin.page}>
        <div className={signin.images}>
          <div className={signin.all}>
            <img src={ALL_IMG} alt="" />
            <h2>ALL</h2>
          </div>
          <div className={signin.food}>
            <img src={FOOD_IMG} alt="" />
            <h2> FOOD</h2>
          </div>
          <div className={signin.health}>
            <img src={healtAndFitness} alt="" />
            <h2>
              HEALTH&<br></br>FITNESS
            </h2>
          </div>
          <div className={signin.travel}>
            <img src={TRAVEL_IMG} alt="" />
            <h2>TRAVEL</h2>
          </div>
          <div className={signin.movie}>
            <img src={MOVIE_IMG} alt="" />
            <h2>MOVIE</h2>
          </div>
          <div className={signin.education}>
            <img src={EDUCATION_IMG} alt="" />
            <h2>EDUCATION</h2>
          </div>
        </div>

        <div className={signin.storyContainer}>
          <div className={signin.foodstry}>
            <h2>Top Stories About food</h2>
            <h3>No stories Available</h3>
          </div>
          <div className={signin.healthstry}>
            <h2>Top Stories About Medical</h2>
            <h3>No stories Available</h3>
          </div>
          <div className={signin.travelstry}>
            <h2>Top Stories About Travel</h2>
            <h3>No stories Available</h3>
          </div>
          <div className={signin.moviestry}>
            <h2>Top Stories About Movies</h2>
            <h3>No stories Available</h3>
          </div>
          <div className={signin.educationstry}>
            <h2>Top Stories About Education</h2>
            <h3>No stories Available</h3>
          </div>
        </div>
      </div>
      <div className={addStoryPopup ? signin.addstory : signin.displaynone}>
        div.
      </div>
    </div>
  );
}

export default signinPage;
