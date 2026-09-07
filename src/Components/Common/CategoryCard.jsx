import { Link } from 'react-router-dom';
import '../../CSS/Category.css';

function CategoryCard({ icon: Icon, name, to }) {
    return (
        <Link 
            to={to} 
            className="category-card-link"
        >
            <div className="category-card">
                {Icon && <Icon size={50} />}
                <span>{name}</span>
            </div>
        </Link>
    );
}

export default CategoryCard;