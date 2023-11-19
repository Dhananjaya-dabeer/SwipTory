import React from 'react'
import Home from './HomePage.module.css'
import ALL_IMG from '../../assets/all.svg'
import MED_IMG from '../../assets/medical.svg'
import FRUIT_IMG from '../../assets/fruits.svg'
import WORLD_IMG from '../../assets/world.svg'

function HomePage() {
  return (
    <div className={Home.parent}>
      <div className={Home.navbar}>
        <div className={Home.title}>
            <h2>SwipTory</h2>
        </div>
        <div className={Home.nav_btns}>
        <div className={Home.register_btn}>
            <button>Register Now</button>
        </div>
        <div className={Home.signin_btn}>
            <button>Sign In</button>
        </div>
        </div>
      </div>

      <div className={Home.page}>
        <div className={Home.images}>
            <div className={Home.all}>
                <img src={ALL_IMG} alt="" />
                <h2>ALL</h2>
            </div>
            <div className={Home.med}>
                <img src={MED_IMG} alt="" />
            </div>
            <div className={Home.fruits}>
                <img src={FRUIT_IMG} alt="" />
            </div>
            <div className={Home.med}>
                <img src={WORLD_IMG} alt="" />
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default HomePage
