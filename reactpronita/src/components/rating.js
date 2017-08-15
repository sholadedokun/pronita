import React from 'react';
import Icon from './icon'
export default ({ratings, maxRatings, reviews})=>{
    let rating = 'no ratings';
    let review = ' and reviews'
    let starsToFill=0;
    if(ratings){
        rating=[]
        starsToFill=(Math.round(ratings)/maxRatings) * 5;
        for (let i=0; i< starsToFill; i++){
            rating.push(<Icon key={i} icon='star' />)
        }
        for(let i=0; i<(5-starsToFill); i++){
            rating.push(<Icon  key={i+5}  icon='star-o' />)
        }
        rating.push(<span key='totalReview'>{ratings}</span>)
    }
    if(reviews){
        review=<span>`(${reviews})`</span>
    }
    return(
        <div>{rating}{reviews} </div>
    )
}
