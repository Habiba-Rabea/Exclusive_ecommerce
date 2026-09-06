import { Star } from "lucide-react";
import '../../CSS/Rating.css';

function RatingStars({ rating, reviewsCount }) {
    const renderStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star
                    key={i}
                    size={16}
                    fill={i < rating ? "#FFAD33" : "none"}
                    stroke={i < rating ? "#FFAD33" : "#BFBFBF"}
                />
            );
        }
        return stars;
    };

    return (
        <div className="rating-container">
            <div className="starss">
                {renderStars()}
            </div>
         
            <span className="reviews-count">({reviewsCount})</span>
        </div>
    );
}

export default RatingStars;