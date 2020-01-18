import React from 'react';
import {Button} from "../../components/Elements/Elements";
import './MoreInfo.css';
import PropTypes from 'prop-types';

export default function MoreInfo(props) {
  return (
    <div>
      <div className="info">
        <center>
          <p className="heading">
            What is Neural Turret?
          </p>
        </center>

        <p className="text">
          Neural Turret is a mind-controlled turret (catapult arm) that lets you select directions 
          and actions using your brain activity! 
        </p>

        <center>
          <p className="heading">
            How Does It Work?
          </p>
        </center>

        <p className="text">
          Let&apos;s start with a thought experiment.
        </p>

        <p className="text">
          Imagine you have a bag of balls, which are all <span className="blueText">blue</span> 
          except for one <span className="redText">red</span> ball.
        </p>

        <p className="text">
          <span className="redText">
            You want the red ball.
          </span>
        </p>

        <p className="text">
          Now suppose I start randomly removing the balls. One by one, you see blue ball after blue 
          ball removed from the bag until suddenly, after patiently waiting, you see the red ball emerge.
        </p>

        <p className="text">
          Because you knew what you were looking for but you didn&apos;t know when you&apos;ll see it exactly, 
          the moment you saw the red ball finally removed, it triggered a neurological reaction detectable by 
          measuring your brain activity.
        </p>

        <p className="text">
          This is known as the P300 oddball paradigm and it&apos;s the foundation for the keyboard&apos;s functionality.
        </p>

        <p className="text">
          The keyboard relies on the P300 mechanism by randomly flashing rows and columns of letters, 
          symbols and numbers.
          When you see a row with the letter you want, but you don&apos;t know when it&apos;s going to happen exactly, 
          it triggers the P300 reaction in your brain - and the same happens when a row with the letter is 
          randomly flashed. Your EEG headset detects the specific change in your brain&apos;s electrical activity 
          associated with the P300. When both a row and a column with a particular item of interest 
          (such as the letter &lsquo;p&rsquo;) triggers this response, our code will type the letter on the screen.
        </p>

        <p className="text"> 
          Now you know how it works, go try it out! 
        </p>
      </div>
      <Button className="back" onClick={props.goBack} value="Go Back"/>
    </div>
  )
}

MoreInfo.propTypes = {
  goBack: PropTypes.func.isRequired
};