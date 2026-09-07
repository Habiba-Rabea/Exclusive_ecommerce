import Story from "./Story";
import '../../CSS/About.css';
import StateAbout from './State.jsx';
import Team from './Team.jsx';
import Services from './Services.jsx';


function About(){
    return(
<div>
      <Story/>
      <StateAbout/>
      <Team/>
      <Services/>
    </div>
    );
}
export default About;