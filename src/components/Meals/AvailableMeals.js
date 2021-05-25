import React, { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(null)

    useEffect(() => {
        const fetchmeals = async () => {
            const response = await fetch('https://react-https-2e5a2-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error('something went wrong')
            }

            const recievedMeals = [];

            for (const key in responseData) {
                recievedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                })
            }
            setMeals(recievedMeals)
            setIsLoading(false)
        }

        fetchmeals().catch((isError) => {
            setIsLoading(false)
            setIsError(isError.message)

        })
    }, [])

    if (isLoading) {
        return (
            <section className={classes.mealsinloading}>
                <p>Your Meals is Loading...</p>
            </section>
        )
    }

    if (isError) {
        return (
            <section className={classes.mealsinerror}>
                <p>{isError}</p>
            </section>
        )
    }


    const mealsli = meals.map(meal =>
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price} />)
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsli}</ul>
            </Card>
        </section>
    )
}

export default AvailableMeals
