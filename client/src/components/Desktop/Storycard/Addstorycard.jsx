import React from "react";
import Story from "./Storycard.module.css";
function Addstorycard({slideDetails, setSlideDetails, detail}) {

  return (
    <div className={Story.storyDetails}>
      <div>
      <div className={Story.heading}>
        <label htmlFor="heding">Heading:</label>
        <input type="text" id="heading" value={detail.heading} onChange={(event) => {
          setSlideDetails(
            [...slideDetails].map((slide) => {
              if(slide.id === detail.id){
                slide.heading = event.target.value
              }
              return slide
            })
          )
        }} />
      </div>
      <div className={Story.description}>
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" value={detail.description} onChange={(event) => {
          setSlideDetails(
            [...slideDetails].map((slide) => {
              if(slide.id === detail.id){
                slide.description = event.target.value
              }
              return slide
            })
          )
        }}/>
      </div>
      <div className={Story.image}>
        <label htmlFor="image">Image:</label>
        <input type="text" id="image" value={detail.image} onChange={(event) => {
          setSlideDetails(
            [...slideDetails].map((slide) => {
              if(slide.id === detail.id){
                slide.image = event.target.value
              }
              return slide
            })
          )
        }} />
      </div>
      <div className={Story.category}>
        <label htmlFor="category">Category:</label>
        <select name="Select caegory" id="" value={detail.category} onChange={(event) => {
          setSlideDetails(
            [...slideDetails].map((slide) => {
              if(slide.id === detail.id){
                slide.category = event.target.value
              }
              return slide
            })
          )
        }}>
          <option value="" defaultValue={"Select caegory"}>
            Select caegory
          </option>
          <option value="food">food</option>
          <option value="health and fitness">health and fitness</option>
          <option value="travel">travel</option>
          <option value="movies">movies</option>
          <option value="education">education</option>
        </select>
      </div>
      </div>
    </div>
  );
}

export default Addstorycard;
