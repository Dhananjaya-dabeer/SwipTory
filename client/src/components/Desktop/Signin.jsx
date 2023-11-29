import React, { useContext, useEffect } from "react";
import signin from "./Signin.module.css";
import "./Signin.css";
import { useState } from "react";
import axios from "axios";
import uniqueid from 'uniqid'
import { useNavigate } from "react-router-dom";
import {
  clearLocalStorage,
  getItemLocalStorage,
  setItemLocalStorage,
} from "../../../../server/src/utils/ExportUtils";
import Addstorycard from "./Storycard/Addstorycard";

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

    const mapSlideDetailsObject = ( isActive=false, heading = '', description='', image='', category='') => {
      return {
        heading,
        description,
        image,
        category,
        isActive,
        id : uniqueid()
      }
    }

  const navigate = useNavigate();
  const [addStoryPopup, setAddstoryPopuo] = useState(false);
  const [hamburgerPopUp, setHamburgerPopUp] = useState(false);
  const [slideDetails, setSlideDetails] = useState([]);


  useEffect(() => {
    if(!slideDetails.length){
      const initialState = []
      for(let ind = 0 ; ind < 3 ; ind++){
        initialState.push(
          mapSlideDetailsObject(ind === 0)
        )
      }
      setSlideDetails(initialState)
    }
  }, [])

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
    setAddstoryPopuo(!addStoryPopup);
  };

  const bookmarkPopupHandler = () => {};

  const hamburgurHandler = () => {
    setHamburgerPopUp(!hamburgerPopUp);
  };

  const logoutHandler = () => {
    navigate("/");
    clearLocalStorage();
  };

  const addSlideHandler = () => {

    if(slideDetails.length < 6){
      setSlideDetails((prevState) => [...prevState, mapSlideDetailsObject()])
    } else {
      alert("Maximum 6 slides are allowed");
    }
  };

  const removeSlideHandler = (id) => {

    setSlideDetails(
      [...slideDetails].filter(slide => slide.id !== id)
    )

  };

  const handleNext = () => {
   const targetIndex = slideDetails.findIndex(slide => slide.isActive);
   setSlideDetails(
    [...slideDetails].map((slide, index) => {
        if(index === targetIndex){
          slide.isActive = false
        }

        if(index === targetIndex + 1){
          slide.isActive = true
        }

        return slide
    })
   )
  };

  const handlePrevious = () => {
    const targetIndex = slideDetails.findIndex(slide => slide.isActive);
   setSlideDetails(
    [...slideDetails].map((slide, index) => {
        if(index === targetIndex){
          slide.isActive = false
        }

        if(index === targetIndex - 1){
          slide.isActive = true
        }

        return slide
    })
   )
  };

  const PostHandler = async() => {
    const filteredSlideDetails = slideDetails.map(({isActive,id, ...rest}) => rest )
    console.log(filteredSlideDetails)
   let postResponse = await axios.post("http://localhost:7000/api/v2/posts/", filteredSlideDetails )
   try {
    console.log(postResponse.data.status)
   } catch (error) {
    
   }
  }

  return (
    <div
      className={addStoryPopup ? signin.blurBack : signin.parent}
      onClick={() => {
        setAddstoryPopuo(false);
      }}
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
        className={
          hamburgerPopUp ? signin.hamburgerpopupdiv : signin.displaynone
        }
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
      <div
        className={addStoryPopup ? signin.addstory : signin.displaynone}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={signin.story_btn_flex}>
          {slideDetails.map((slide, index) => (
            <div
              key={slide.id}
              className={`${signin}.slide ${
                index < 3 ? "allslidebtns" : "cross-mark"
              }`}
            >
              { (
                <div className={`extraslideshandle ${slide.isActive ? "active" : ""} ` }>
                  {index >= 3 && (
                    <span
                      className="close-button"
                      onClick={() => removeSlideHandler(slide.id)}
                    >
                      &#10060;
                    </span>
                  )}
                  <div
                    className="slide_button"
                    onClick={() => {
                      setSlideDetails(
                        [...slideDetails].map(detail => {
                          if(detail.id === slide.id){
                            detail.isActive = true;
                          }else{
                            detail.isActive = false;
                          }
                          return detail
                        })
                      )

                    }}
                  >
                    <p>{`Slide${index + 1}`}</p>
                  </div>
                </div>
              ) }
            </div>
          ))}
          <div className={signin.addslide}>
            <div className={signin.add_slide_button} onClick={addSlideHandler}>
              <p>Add +</p>
            </div>
          </div>
        </div>
        <div>
          {
            slideDetails.map(detail => {
              return detail.isActive && <Addstorycard slideDetails={slideDetails} setSlideDetails={setSlideDetails} detail={detail} />
            })
          }
        </div>
        <div className={signin.prev_next_post_btn}>
          <div>
          <div className={signin.prev_btn}>
            <button  disabled={slideDetails.findIndex(slide => slide.isActive) === 0 } className={slideDetails.findIndex(slide => slide.isActive) === 0 ? "disable_btn" : ""} onClick={handlePrevious}>Previous</button>
          </div>
          <div className={signin.next_btn}>
            <button disabled={slideDetails.findIndex(slide => slide.isActive) === slideDetails.length - 1} className={slideDetails.findIndex(slide => slide.isActive) === slideDetails.length - 1 ? "disable_btn" : ""}onClick={handleNext} >Next</button>
          </div>
          </div>
          <div className={signin.post_btn}>
            <button onClick={PostHandler} >Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default signinPage;
