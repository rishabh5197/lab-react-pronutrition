import React, { useState } from "react"
import ReactDOM from "react-dom"
import Food from "./Food"

import jsonfood from "./foodsource"
import SelectedFood from "./selectedfood"



const Home = () => {
    const [filterui, setfilter] = useState()
    const [food, setfoodlist] = useState([])


    const sharedata = (arg) => {
        const foodstate = food
        if (foodstate.length === 0) {
            foodstate.unshift(arg)
            setfoodlist(foodstate)
        }
        else {
            let isnotexist = true
            foodstate.forEach(ele => {
                if (ele.name === arg.name) {
                    isnotexist = false
                    ele.quantity = arg.quantity
                }
            })
            if (isnotexist) {
                foodstate.unshift(arg)
                setfoodlist(foodstate)
            }
        }

        const removecart = (arg) => {
            console.log(arg);
            console.log(food);
            let foodstate = food
            foodstate.forEach((ele => {
                if (ele.name === arg)
                    ele.quantity = 0
            }))
            const cartui = foodstate[0] ? foodstate.filter(ele => ele.quantity !== 0).map(ele => <SelectedFood key={ele.name} removecart={removecart} quantity={ele.quantity} title={ele.name} calorie={ele.calorie} />) : undefined

            const totalcalorie = foodstate[0] ? foodstate.map(ele => ele.quantity * ele.calorie).reduce((output, next) => output + next) : undefined
            ReactDOM.render(
                <React.Fragment>
                    <h1>Today's Food {totalcalorie} cal</h1>
                    {cartui}
                </React.Fragment>
                , document.querySelector(".cartlist"))


        }
        const cartui = foodstate[0] ? foodstate.filter(ele => ele.quantity !== 0).map(ele => <SelectedFood key={ele.name} removecart={removecart} quantity={ele.quantity} title={ele.name} calorie={ele.calorie} />) : null
        console.log("outside : " + food.length);
        const totalcalorie = foodstate[0] ? foodstate.map(ele => ele.quantity * ele.calorie).reduce((output, next) => output + next) : null
        ReactDOM.render(
            <React.Fragment>
                <h1>Today's Food {totalcalorie} cal</h1>
                {cartui}
            </React.Fragment>
            , document.querySelector(".cartlist"))
    }

    const filterfood = (e) => {
        if (e.target.value)
            setfilter(jsonfood.filter(ele => ele.name.toLowerCase().startsWith(e.target.value)).map(ele => <Food getdata={sharedata} key={ele.name} title={ele.name} calorie={ele.calories} imgpath={ele.image} />))
        else
            setfilter(undefined)
    }

    const ui = jsonfood.map(ele => <Food getdata={sharedata} key={ele.name} title={ele.name} calorie={ele.calories} imgpath={ele.image} />)

    return (
        <React.Fragment>
            <div>
                <div>
                    <label htmlFor="foodsearch">Search:  </label>
                    <input type="search" name="foodsearch" id="foodsearch" onKeyUp={filterfood} placeholder="Food" />

                </div>
                {filterui ? filterui : ui}

            </div>
            <div className="cartlist">
            </div>
        </React.Fragment>
    )
}

export default Home