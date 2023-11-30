import React, { useContext, useEffect } from "react";
import Home from "./HomePage.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getItemLocalStorage,
  setItemLocalStorage,
} from "../../../../server/src/utils/ExportUtils";

function HomePage() {
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

  const [registerPopUp, setRegisterPopUp] = useState(false);
  const [signInPopUp, setSignInPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [jwt, setJwt] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();


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
          setJwt(true);
          navigate("/signin");
        } else {
          setJwt(false);
          navigate("/");
        }
      } catch (error) {
        setJwt(false);
      }
    })();


  }, [navigate]);
  const regsterHandler = () => {
    setRegisterPopUp(!registerPopUp);
    setSignInPopup(false);
  };
  const signInPopUpHandler = () => {
    setSignInPopup(!signInPopUp);
    setRegisterPopUp(false);
  };

  const HandleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const registerPopUpHandler = () => {
    setRegisterPopUp(!registerPopUp);
  };

  const signInPopUphandler = () => {
    setSignInPopup(!signInPopUp);
  };

  const registerHandler = async () => {
    let register = await axios.post(
      " http://localhost:7000/api/v1/users/register",
      userDetails
    );
    try {
      window.alert(register.data.status);
      setItemLocalStorage("token", register.data.token);
      setItemLocalStorage("username", register.data.username)
      setItemLocalStorage("id", register.data.id)
      if (register.data.token) navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const signinHandler = async () => {
    let signin = await axios.post(
      "http://localhost:7000/api/v1/users/signin",
      userDetails
    );
    try {
      window.alert(signin.data.message);
      if (signin.data.status == "success") {
        setItemLocalStorage("token", signin.data.token);
        setItemLocalStorage("username", signin.data.username)
        setItemLocalStorage("id", signin.data.id)
        if (signin.data.token) navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={registerPopUp || signInPopUp ? Home.blurBack : Home.parent}
      onClick={() => {
        setRegisterPopUp(false);
        setSignInPopup(false);
      }}
    >
      <div className={Home.navbar}>
        <div className={Home.title}>
          <h2>SwipTory</h2>
        </div>
        <div className={Home.nav_btns}>
          <div
            className={Home.register_btn}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={regsterHandler}>Register Now</button>
          </div>
          <div className={Home.signin_btn} onClick={(e) => e.stopPropagation()}>
            <button onClick={signInPopUpHandler}>Sign In</button>
          </div>
        </div>
      </div>

      <div className={Home.page}>
        <div className={Home.images}>
          <div className={Home.all}>
            <img src={ALL_IMG} alt="" />
            <h2>ALL</h2>
          </div>
          <div className={Home.food}>
            <img src={FOOD_IMG} alt="" />
            <h2> FOOD</h2>
          </div>
          <div className={Home.health}>
            <img src={healtAndFitness} alt="" />
            <h2>
              HEALTH&<br></br>FITNESS
            </h2>
          </div>
          <div className={Home.travel}>
            <img src={TRAVEL_IMG} alt="" />
            <h2>TRAVEL</h2>
          </div>
          <div className={Home.movie}>
            <img src={MOVIE_IMG} alt="" />
            <h2>MOVIE</h2>
          </div>
          <div className={Home.education}>
            <img src={EDUCATION_IMG} alt="" />
            <h2>EDUCATION</h2>
          </div>
        </div>

        <div className={Home.storyContainer}>
          <div className={Home.foodstry}>
            <h2>Top Stories About food</h2>
            <h3>No stories Available</h3>
          </div>
          <div className={Home.healthstry}>
            <h2>Top Stories About Medical</h2>
            <h3>No stories Available</h3>
          </div>
          <div className={Home.travelstry}>
            <h2>Top Stories About Travel</h2>
            <h3>No stories Available</h3>
          </div>
          <div className={Home.moviestry}>
            <h2>Top Stories About Movies</h2>
            <h3>No stories Available</h3>
          </div>
          <div className={Home.educationstry}>
            <h2>Top Stories About Education</h2>
            <h3>No stories Available</h3>
          </div>
        </div>
      </div>
      <div
        className={registerPopUp ? Home.registerpopup : Home.displaynone}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={Home.crosslogo}>
          <span onClick={registerPopUpHandler}>&#10060;</span>
        </div>
        <div className={Home.popupHeader}>
          <h3>Register to SwipTory</h3>
        </div>
        <div className={Home.username_field}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
          />
        </div>
        <div className={Home.password_field}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
        </div>
        <div className={Home.show_hide_password}>
          <input id="checkbox" type="checkbox" onClick={HandleShowPassword} />
          <label htmlFor="checkbox">Show Password</label>
        </div>
        <div className={Home.register_popup_btn}>
          <button onClick={registerHandler}>Register</button>
        </div>
      </div>
      <div
        className={signInPopUp ? Home.signinpopup : Home.displaynone}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={Home.crosslogo}>
          <span onClick={signInPopUphandler}>&#10060;</span>
        </div>
        <div className={Home.popupHeader}>
          <h3>SIgn In to SwipTory</h3>
        </div>
        <div className={Home.username_field}>
          <label htmlFor="username-L">Username</label>
          <input
            id="username-L"
            type="text"
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
          />
        </div>
        <div className={Home.password_field}>
          <label htmlFor="password-L">Password</label>
          <input
            id="password-L"
            type={showPassword ? "text" : "password"}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
        </div>
        <div className={Home.show_hide_password}>
          <input id="checkbox" type="checkbox" onClick={HandleShowPassword} />
          <label htmlFor="checkbox">Show Password</label>
        </div>
        <div className={Home.register_popup_btn}>
          <button onClick={signinHandler}>Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
