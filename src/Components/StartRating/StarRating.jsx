import React from 'react';
import './StarRating.css';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="star-rating">
            {Array(fullStars)
                .fill()
                .map((_, i) => (
                    <span key={i} className="star">★</span>
                ))}
            {halfStar && <span className="star">☆</span>}
            {Array(emptyStars)
                .fill()
                .map((_, i) => (
                    <span key={i + fullStars + 1} className="star">☆</span>
                ))}
            <span className="rating-average">{rating.toFixed(1)}</span>
        </div>
    );
};

export default StarRating;
