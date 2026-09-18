import { useState } from 'react';
import InputField from '../../Components/UI/Inputs.jsx'; 
import { FaPhoneAlt, FaRegEnvelope } from 'react-icons/fa';
import axios from 'axios'; 
import './Contact.css';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', type: '' });
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setAlertInfo({
        show: true,
        message: 'Please fill in all required fields (*)',
        type: 'error'
      });
      return;
    }
    setLoading(true);
    setAlertInfo({ show: false, message: '', type: '' });
    try {
      const apiPayload = {
        email: formData.email,
        subject: formData.subject || "New Contact Form Submission",
        fields: {
          name: formData.name,
          phone: formData.phone,
          message: formData.message
        }
      };

     await axios.post('https://gig-program-apis-production.up.railway.app/api/contact/', apiPayload);

      setLoading(false);
      setAlertInfo({
        show: true,
        message: 'Your message has been sent successfully!',
        type: 'success'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      setLoading(false);
      console.error("Error submitting contact form:", error);
      setAlertInfo({
        show: true,
        message: error.response?.data?.message || 'Something went wrong, please try again.',
        type: 'error'
      });
    }
  };

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

      <form className="contact-form" onSubmit={handleSubmit}>
        {alertInfo.show && (
          <div className={`status-alert ${alertInfo.type}`}>
            {alertInfo.message}
          </div>
        )}

        <div className="row">
          <InputField 
            placeholder="Your Name *" 
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <InputField 
            type="email" 
            placeholder="Your Email *" 
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <InputField 
            type="tel"  جوه 
            placeholder="Your Phone" 
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>

        <div className="row">
          <InputField 
            placeholder="Subject" 
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
          />
        </div>
        
        <InputField 
          placeholder="Your Message *" 
          isTextArea={true} 
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
        />
        
        <div className="btn-wrapper">
          <button type="submit" className="view-all-products-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;