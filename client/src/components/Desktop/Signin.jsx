import React, { useContext, useEffect } from "react";
import signin from "./Signin.module.css";
import "./Signin.css";
import { useState } from "react";
import axios from "axios";
import uniqueid from "uniqid";
import { useNavigate } from "react-router-dom";
import {
  clearLocalStorage,
  getItemLocalStorage,
} from "../../../../server/src/utils/ExportUtils";
import Addstorycard from "./Storycard/Addstorycard";
import Stories from "react-insta-stories";
import heart from "../../assets/heart.png"
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

  const mapSlideDetailsObject = (
    isActive = false,
    heading = "",
    description = "",
    image = "",
    category = ""
  ) => {
    return {
      heading,
      description,
      image,
      category,
      isActive,
      id: uniqueid(),
      postCreatedBy: getItemLocalStorage("id"),
    };
  };

  const navigate = useNavigate();
  const [addStoryPopup, setAddstoryPopuo] = useState(false);
  const [hamburgerPopUp, setHamburgerPopUp] = useState(false);
  const [slideDetails, setSlideDetails] = useState([]);
  const [foodArray, setFoodArray] = useState([]);
  const [foodImgArray, setFoodImgArray] = useState([]);
  const [travelArray, setTravelArray] = useState([]);
  const [educationArray, setEducatonArray] = useState([]);
  const [healthAndfitnessArray, setHealthAndfitnessArray] = useState([]);
  const [movieArray, setMovieArray] = useState([]);
  const [selectedImageDetails, setSelectedImageDetails] = useState(null);
  const [mainArrary, setMainArray] = useState([]);

  const arrayIndex = [];

  useEffect(() => {
    if (!slideDetails.length) {
      const initialState = [];
      for (let ind = 0; ind < 3; ind++) {
        initialState.push(mapSlideDetailsObject(ind === 0));
      }
      setSlideDetails(initialState);
    }
  }, [slideDetails]);

  useEffect(() => {
    (async () => {
      try {
        let postDetails = await axios.get(
          "http://localhost:7000/api/v2/posts/postdetails"
        );

        setMainArray(postDetails.data.posts);
        postDetails.data.posts.forEach((item) => {
          if (item.category === "food") {
            setFoodArray((prev) => {
              if (!prev.some((existingItem) => existingItem._id === item._id)) {
                return [...prev, item];
              }
              return prev;
            });
          }

          if (item.category === "health and fitness") {
            setHealthAndfitnessArray((prev) => {
              if (!prev.some((existingItem) => existingItem._id === item._id)) {
                return [...prev, item];
              }
              return prev;
            });
          }

          if (item.category === "travel") {
            setTravelArray((prev) => {
              if (!prev.some((existingItem) => existingItem._id === item._id)) {
                return [...prev, item];
              }
              return prev;
            });
          }

          if (item.category === "movies") {
            setMovieArray((prev) => {
              if (!prev.some((existingItem) => existingItem._id === item._id)) {
                return [...prev, item];
              }
              return prev;
            });
          }

          if (item.category === "education") {
            setEducatonArray((prev) => {
              if (!prev.some((existingItem) => existingItem._id === item._id)) {
                return [...prev, item];
              }
              return prev;
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [slideDetails]);

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
    if (slideDetails.length < 6) {
      setSlideDetails((prevState) => [...prevState, mapSlideDetailsObject()]);
    } else {
      alert("Maximum 6 slides are allowed");
    }
  };

  const removeSlideHandler = (id) => {
    setSlideDetails([...slideDetails].filter((slide) => slide.id !== id));
  };

  const handleNext = () => {
    const targetIndex = slideDetails.findIndex((slide) => slide.isActive);
    setSlideDetails(
      [...slideDetails].map((slide, index) => {
        if (index === targetIndex) {
          slide.isActive = false;
        }

        if (index === targetIndex + 1) {
          slide.isActive = true;
        }

        return slide;
      })
    );
  };

  const handlePrevious = () => {
    const targetIndex = slideDetails.findIndex((slide) => slide.isActive);
    setSlideDetails(
      [...slideDetails].map((slide, index) => {
        if (index === targetIndex) {
          slide.isActive = false;
        }

        if (index === targetIndex - 1) {
          slide.isActive = true;
        }

        return slide;
      })
    );
  };

  const PostHandler = async () => {
    const filteredSlideDetails = slideDetails.map(
      ({ isActive, id, ...rest }) => rest
    );
    // const hasEmptyValue = filteredSlideDetails.every(obj =>
    //   Object.values(obj).every(value => value !== ''))
    //   if(!hasEmptyValue) alert("All Fields are Mandetory")
    let postResponse = await axios.post(
      "http://localhost:7000/api/v2/posts/",
      filteredSlideDetails
    );
    try {
      alert(postResponse.data.status);
    } catch (error) {
      console.log(error);
    }
    (async () => {
      try {
        let postDetails = await axios.get(
          "http://localhost:7000/api/v2/posts/postdetails"
        );

        postDetails.data.posts.forEach((item) => {
          if (item.category === "food") {
            setFoodArray((prev) => {
              if (!prev.some((existingItem) => existingItem._id === item._id)) {
                return [...prev, item];
              }
              return prev;
            });
          }

          if (item.category === "health and fitness") {
            setHealthAndfitnessArray((prev) => {
              if (!prev.some((existingItem) => existingItem._id === item._id)) {
                return [...prev, item];
              }
              return prev;
            });
          }

          if (item.category === "travel") {
            setTravelArray((prev) => {
              if (!prev.some((existingItem) => existingItem._id === item._id)) {
                return [...prev, item];
              }
              return prev;
            });
          }

          if (item.category === "movies") {
            setMovieArray((prev) => {
              if (!prev.some((existingItem) => existingItem._id === item._id)) {
                return [...prev, item];
              }
              return prev;
            });
          }

          if (item.category === "education") {
            setEducatonArray((prev) => {
              if (!prev.some((existingItem) => existingItem._id === item._id)) {
                return [...prev, item];
              }
              return prev;
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    })();
  };

  for (let i = 0; i < mainArrary.length; i++) {
    if (i % 3 === 0) {
      arrayIndex.push(i);
    }
  }
  const generateStories = (dataArray, startIndex) => {
    const stories = dataArray.map((item) => {
      const { image, heading, description } = item;

      return {
        url: image,
        header: {
          heading: heading,
          subheading: description,
        },
      };
    });

    const visibleStories = stories.slice(startIndex, startIndex + 3);
    return visibleStories;
  };

  const [storyIndex, setStoryIndex] = useState(0);
  const [visibleFoodArray, setVisibleFoodArray] = useState(
    generateStories(foodArray, 0)
  );
  const [visibleHealthArray, setVisibleHealthArray] = useState(
    generateStories(healthAndfitnessArray, 0)
  );
  const [visibleTravelArray, setVisibleTravelArray] = useState(
    generateStories(travelArray, 0)
  );
  const [visibleMoviesArray, setVisibleMoviesArray] = useState(
    generateStories(movieArray, 0)
  );
  const [visibleEducationArray, setVisibleEducationArray] = useState(
    generateStories(educationArray, 0)
  );
  const [filteredArray, setFilteredArray] = useState([]); // backend Filtered Array
  // const [visibleMainArray, setVisibleMainArray] = useState(generateStories(mainArrary,0))
  useEffect(() => {
    setVisibleFoodArray(generateStories(foodArray, storyIndex));
  }, [foodArray, storyIndex]);
  useEffect(() => {
    setVisibleHealthArray(generateStories(healthAndfitnessArray, storyIndex));
  }, [healthAndfitnessArray, storyIndex]);
  useEffect(() => {
    setVisibleTravelArray(generateStories(travelArray, storyIndex));
  }, [travelArray, storyIndex]);
  useEffect(() => {
    setVisibleMoviesArray(generateStories(movieArray, storyIndex));
  }, [movieArray, storyIndex]);
  useEffect(() => {
    setVisibleEducationArray(generateStories(educationArray, storyIndex));
  }, [healthAndfitnessArray, storyIndex]);
  // useEffect(() => {
  //  setVisibleMainArray(generateStories(mainArrary,storyIndex))
  // },[mainArrary,storyIndex])

  let foodCategory = {
    category: "Food",
  };

  let healthAndFitness = {
    category: "HealthAndFitness",
  };
  let travelCategory = {
    category: "travel",
  };
  let movieCategory = {
    category: "movies",
  };
  let educationCategory = {
    category: "education",
  };

  const HandleFoodFilter = async () => {
    let filter = await axios.post(
      "http://localhost:7000/api/v2/posts/postdetails",
      foodCategory
    );
    try {
      let food = filter.data.posts;
      setFilteredArray(food);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleHealthAndFitnessFilter = async () => {
    let filter = await axios.post(
      "http://localhost:7000/api/v2/posts/postdetails",
      healthAndFitness
    );
    try {
      let health = filter.data.posts;
      setFilteredArray(health);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTravelFilter = async () => {
    let filter = await axios.post(
      "http://localhost:7000/api/v2/posts/postdetails",
      travelCategory
    );
    try {
      let travel = filter.data.posts;
      setFilteredArray(travel);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMovieFilter = async () => {
    let filter = await axios.post(
      "http://localhost:7000/api/v2/posts/postdetails",
      movieCategory
    );
    try {
      let movie = filter.data.posts;
      setFilteredArray(movie);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEducationFilter = async () => {
    let filter = await axios.post(
      "http://localhost:7000/api/v2/posts/postdetails",
      educationCategory
    );
    try {
      let education = filter.data.posts;
      setFilteredArray(education);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(selectedImageDetails);
  return (
    <div
      className={
        addStoryPopup || selectedImageDetails ? signin.blurBack : signin.parent
      }
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
          <div className={signin.all} onClick={(e) => setFilteredArray([])}>
            <img src={ALL_IMG} alt="" />
            <h2>ALL</h2>
          </div>
          <div className={signin.food} onClick={HandleFoodFilter}>
            <img src={FOOD_IMG} alt="" />
            <h2> FOOD</h2>
          </div>
          <div className={signin.health} onClick={HandleHealthAndFitnessFilter}>
            <img src={healtAndFitness} alt="" />
            <h2>
              HEALTH&<br></br>FITNESS
            </h2>
          </div>
          <div className={signin.travel} onClick={handleTravelFilter}>
            <img src={TRAVEL_IMG} alt="" />
            <h2>TRAVEL</h2>
          </div>
          <div className={signin.movie} onClick={handleMovieFilter}>
            <img src={MOVIE_IMG} alt="" />
            <h2>MOVIE</h2>
          </div>
          <div className={signin.education} onClick={handleEducationFilter}>
            <img src={EDUCATION_IMG} alt="" />
            <h2>EDUCATION</h2>
          </div>
        </div>
        {filteredArray[0]
          ? filteredArray[0].category == "food" && (
              <div className={signin.foodstry}>
                <h2>Top Stories About food</h2>
                <div>
                  {foodArray.length ? (
                    foodArray.map((food, index) => {
                      return (
                        arrayIndex.includes(index) && (
                          <div
                            className={signin.foodstryimgdiv}
                            key={food._id}
                            onClick={() => {
                              setSelectedImageDetails(food);
                              setStoryIndex(index);
                            }}
                          >
                            {" "}
                            <img src={food.image} alt="" />{" "}
                          </div>
                        )
                      );
                    })
                  ) : (
                    <h3>No stories Available</h3>
                  )}
                </div>
              </div>
            )
          : ""}
        {filteredArray[0]
          ? filteredArray[0].category == "health and fitness" && (
              <div className={signin.healthstry}>
                <h2>Top Stories About Medical</h2>
                <div>
                  {healthAndfitnessArray.length ? (
                    healthAndfitnessArray.map((health, index) => {
                      return (
                        arrayIndex.includes(index) && (
                          <div
                            className={signin.foodstryimgdiv}
                            key={health._id}
                            onClick={() => {
                              setSelectedImageDetails(health);
                              setStoryIndex(index);
                            }}
                          >
                            {" "}
                            <img src={health.image} alt="" />{" "}
                          </div>
                        )
                      );
                    })
                  ) : (
                    <h3>No stories Available</h3>
                  )}
                </div>
              </div>
            )
          : ""}
        {filteredArray[0]
          ? filteredArray[0].category == "travel" && (
              <div className={signin.travelstry}>
                <h2>Top Stories About Travel</h2>
                <div>
                  {travelArray.length ? (
                    travelArray.map((travel, index) => {
                      return (
                        arrayIndex.includes(index) && (
                          <div
                            className={signin.foodstryimgdiv}
                            key={travel._id}
                            onClick={() => {
                              setSelectedImageDetails(travel);
                              setStoryIndex(index);
                            }}
                          >
                            {" "}
                            <img src={travel.image} alt="" />{" "}
                          </div>
                        )
                      );
                    })
                  ) : (
                    <h3>No stories Available</h3>
                  )}
                </div>
              </div>
            )
          : ""}
        {filteredArray[0]
          ? filteredArray[0].category == "movies" && (
              <div className={signin.moviestry}>
                <h2>Top Stories About Movies</h2>
                <div>
                  {movieArray.length ? (
                    movieArray.map((movie, index) => {
                      return (
                        arrayIndex.includes(index) && (
                          <div
                            className={signin.foodstryimgdiv}
                            key={movie._id}
                            onClick={() => {
                              setSelectedImageDetails(movie);
                              setStoryIndex(index);
                            }}
                          >
                            {" "}
                            <img src={movie.image} alt="" />{" "}
                          </div>
                        )
                      );
                    })
                  ) : (
                    <h3>No stories Available</h3>
                  )}
                </div>
              </div>
            )
          : ""}
        {filteredArray[0]
          ? filteredArray[0].category == "education" && (
              <div className={signin.educationstry}>
                <h2>Top Stories About Education</h2>
                <div>
                  {educationArray.length ? (
                    educationArray.map((education, index) => {
                      return (
                        arrayIndex.includes(index) && (
                          <div
                            className={signin.foodstryimgdiv}
                            key={education._id}
                            onClick={() => {
                              setSelectedImageDetails(education);
                              setStoryIndex(index);
                            }}
                          >
                            {" "}
                            <img src={education.image} alt="" />{" "}
                          </div>
                        )
                      );
                    })
                  ) : (
                    <h3>No stories Available</h3>
                  )}
                </div>
              </div>
            )
          : ""}
        {!filteredArray.length ? (
          <div className={signin.storyContainer}>
            <div className={signin.foodstry}>
              <h2>Your Stories</h2>
              <div>
                {mainArrary.length ? (
                  mainArrary.map((AllStories, index) => {
                    return (
                      arrayIndex.includes(index) &&
                      AllStories.postCreatedBy == getItemLocalStorage("id") && (
                        <div
                          className={signin.foodstryimgdiv}
                          key={AllStories._id}
                          onClick={() => {
                            setSelectedImageDetails(AllStories);
                            setStoryIndex(index);
                          }}
                        >
                          {" "}
                          <img src={AllStories.image} alt=""  />{" "}
                          
                        </div>
                      )
                    );
                  })
                ) : (
                  <h3>No stories Available</h3>
                )}
              </div>
            </div>
            <div className={signin.foodstry}>
              <h2>Top Stories About food</h2>
              <div>
                {foodArray.length ? (
                  foodArray.map((food, index) => {
                    return (
                      arrayIndex.includes(index) && (
                        <div
                          className={signin.foodstryimgdiv}
                          key={food._id}
                          onClick={() => {
                            setSelectedImageDetails(food);
                            setStoryIndex(index);
                          }}
                        >
                          {" "}
                          <img src={food.image} alt="" />{" "}

                        </div>
                      )
                    );
                  })
                ) : (
                  <h3>No stories Available</h3>
                )}
              </div>
            </div>
            <div className={signin.healthstry}>
              <h2>Top Stories About Medical</h2>
              <div>
                {healthAndfitnessArray.length ? (
                  healthAndfitnessArray.map((health, index) => {
                    return (
                      arrayIndex.includes(index) && (
                        <div
                          className={signin.foodstryimgdiv}
                          key={health._id}
                          onClick={() => {
                            setSelectedImageDetails(health);
                            setStoryIndex(index);
                          }}
                        >
                          {" "}
                          <img src={health.image} alt="" />{" "}
                        </div>
                      )
                    );
                  })
                ) : (
                  <h3>No stories Available</h3>
                )}
              </div>
            </div>
            <div className={signin.travelstry}>
              <h2>Top Stories About Travel</h2>
              <div>
                {travelArray.length ? (
                  travelArray.map((travel, index) => {
                    return (
                      arrayIndex.includes(index) && (
                        <div
                          className={signin.foodstryimgdiv}
                          key={travel._id}
                          onClick={() => {
                            setSelectedImageDetails(travel);
                            setStoryIndex(index);
                          }}
                        >
                          {" "}
                          <img src={travel.image} alt="" />{" "}
                        </div>
                      )
                    );
                  })
                ) : (
                  <h3>No stories Available</h3>
                )}
              </div>
            </div>
            <div className={signin.moviestry}>
              <h2>Top Stories About Movies</h2>
              <div>
                {movieArray.length ? (
                  movieArray.map((movie, index) => {
                    return (
                      arrayIndex.includes(index) && (
                        <div
                          className={signin.foodstryimgdiv}
                          key={movie._id}
                          onClick={() => {
                            setSelectedImageDetails(movie);
                            setStoryIndex(index);
                          }}
                        >
                          {" "}
                          <img src={movie.image} alt="" />{" "}
                        </div>
                      )
                    );
                  })
                ) : (
                  <h3>No stories Available</h3>
                )}
              </div>
            </div>
            <div className={signin.educationstry}>
              <h2>Top Stories About Education</h2>
              <div>
                {educationArray.length ? (
                  educationArray.map((education, index) => {
                    return (
                      arrayIndex.includes(index) && (
                        <div
                          className={signin.foodstryimgdiv}
                          key={education._id}
                          onClick={() => {
                            setSelectedImageDetails(education);
                            setStoryIndex(index);
                          }}
                        >
                          {" "}
                          <img src={education.image} alt="" />{" "}
                        </div>
                      )
                    );
                  })
                ) : (
                  <h3>No stories Available</h3>
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
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
              {
                <div
                  className={`extraslideshandle ${
                    slide.isActive ? "active" : ""
                  } `}
                >
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
                        [...slideDetails].map((detail) => {
                          if (detail.id === slide.id) {
                            detail.isActive = true;
                          } else {
                            detail.isActive = false;
                          }
                          return detail;
                        })
                      );
                    }}
                  >
                    <p>{`Slide${index + 1}`}</p>
                  </div>
                </div>
              }
            </div>
          ))}
          <div className={signin.addslide}>
            <div className={signin.add_slide_button} onClick={addSlideHandler}>
              <p>Add +</p>
            </div>
          </div>
        </div>
        <div>
          {slideDetails.map((detail, index) => {
            return (
              detail.isActive && (
                <Addstorycard
                  slideDetails={slideDetails}
                  setSlideDetails={setSlideDetails}
                  detail={detail}
                  key={index}
                />
              )
            );
          })}
        </div>
        <div className={signin.prev_next_post_btn}>
          <div>
            <div className={signin.prev_btn}>
              <button
                disabled={
                  slideDetails.findIndex((slide) => slide.isActive) === 0
                }
                className={
                  slideDetails.findIndex((slide) => slide.isActive) === 0
                    ? "disable_btn"
                    : ""
                }
                onClick={handlePrevious}
              >
                Previous
              </button>
            </div>
            <div className={signin.next_btn}>
              <button
                disabled={
                  slideDetails.findIndex((slide) => slide.isActive) ===
                  slideDetails.length - 1
                }
                className={
                  slideDetails.findIndex((slide) => slide.isActive) ===
                  slideDetails.length - 1
                    ? "disable_btn"
                    : ""
                }
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
          <div className={signin.post_btn}>
            <button onClick={PostHandler}>Post</button>
          </div>
        </div>
      </div>
      {selectedImageDetails && (
        <div className={signin.imageDetailsModal}>
          <div className={signin.imageDetailsContent}>
            <button onClick={() => setSelectedImageDetails(null)}>
              &#120;
            </button>

            {selectedImageDetails.category == "food" && (
              <Stories stories={visibleFoodArray} loop={true} />
            )}
            {selectedImageDetails.category == "health and fitness" && (
              <Stories stories={visibleHealthArray} loop={true} />
            )}
            {selectedImageDetails.category == "travel" && (
              <Stories stories={visibleTravelArray} loop={true} />
            )}
            {selectedImageDetails.category == "movies" && (
              <Stories stories={visibleMoviesArray} loop={true} />
            )}
            {selectedImageDetails.category == "education" && (
              <Stories stories={visibleEducationArray} loop={true} />
            )}
            {/* {selectedImageDetails.postCreatedBy === getItemLocalStorage("id") && <Stories stories={visibleMainArray} loop = {true}/>} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default signinPage;
