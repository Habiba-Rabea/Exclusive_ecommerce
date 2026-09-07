import "../../CSS/sectionheader.css";
const SectionHeader = ({ tag, title }) => {
  return (
    <header className="section-header">
      <div className="section-tag">
        <span className="red-rectangle"></span>
        <span className="tag-text">{tag}</span>
      </div>
      <h2 className="section-title">{title}</h2>
    </header>
  );
};
export default SectionHeader;