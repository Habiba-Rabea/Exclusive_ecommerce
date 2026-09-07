import { Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2, ArrowLeft, ArrowRight } from 'lucide-react';
import CategoryCard from "../../Components/Common/CategoryCard";
import '../../CSS/Categories.css';
import SectionHeader from '../../Components/Common/sectionheader.jsx';

function Category() {
    return (
        <section className="category-sec">
            <div className="header-sec">
                <SectionHeader tag="Categories" title="Browse By Category" />
                
                <div className="slider-controls">
                    <button className="control-btn"><ArrowLeft size={20} /></button>
                    <button className="control-btn"><ArrowRight size={20} /></button>
                </div>
            </div>

            <div className="category-grid">
                 <CategoryCard icon={Smartphone} name="Phones" to="/category/phones" />
                 <CategoryCard icon={Monitor} name="Computers" to="/category/computers" />
                 <CategoryCard icon={Watch} name="SmartWatch" to="/category/smartwatch" />
                 <CategoryCard icon={Camera} name="Camera" to="/category/camera" /> 
                 <CategoryCard icon={Headphones} name="HeadPhones" to="/category/headphones" />
                 <CategoryCard icon={Gamepad2} name="Gaming" to="/category/gaming" />
            </div>
        </section>
    );
}

export default Category;