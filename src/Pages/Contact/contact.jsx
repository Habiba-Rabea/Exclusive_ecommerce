import InputField from '../../Components/UI/inputs.jsx'; 
import ViewAllProducts from '../../Components/UI/Buttons/ViewAllProducts.jsx';
import { FaPhoneAlt, FaRegEnvelope } from 'react-icons/fa';
import './Contact.css';
const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-info">
        <div>
          <div className="icon">
            <FaPhoneAlt />
          </div>
          <h3>Call To Us</h3>
        </div>
        <p>We are available 24/7, 7 days a week.</p>
        <p>Phone: +8801611112222</p>
        <hr />
        <div>
          <div className="icon">
            <FaRegEnvelope />
          </div>
          <h3>Write To Us</h3>
        </div>
        <p>Fill out our form and we will contact you within 24 hours.</p>
        <p>Emails: customer@exclusive.com</p>
        <p>Emails: support@exclusive.com</p>
      </div>
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <InputField placeholder="Your Name *" />
          <InputField type="email" placeholder="Your Email *" />
          <InputField type="tel" placeholder="Your Phone *" />
        </div>
        <InputField placeholder="Your Massage" isTextArea={true} />
        <div className="btn-wrapper">
          <ViewAllProducts text="Send Massage" />
        </div>
      </form>
    </div>
  );
};

export default Contact;