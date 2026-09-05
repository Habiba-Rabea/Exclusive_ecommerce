import '../../CSS/Breadcrumb.css';
import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
  return (
    <div className="breadcrumb">
      {items.map((item, index) => (
        <span key={index}>
          {item.link ? ( <Link to={item.link} className="breadcrumb-link">{item.name}</Link>) 
            : ( <span className="breadcrumb-current">{item.name}</span>
          )}

          {index !== items.length - 1 && (
            <span className="breadcrumb-separator"> / </span>
          )}
        </span>
      ))}
    </div>
  );
}