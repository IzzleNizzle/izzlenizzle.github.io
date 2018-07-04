import React, { Component } from 'react';
import { Navbar, NavItem, Parallax, Footer } from 'react-materialize';
// import Image from 'react-native'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar brand='IzzleNizzle' right>
          <NavItem href="https://github.com/IzzleNizzle">Isaac P.</NavItem>
          <NavItem href="https://github.com/IzzleNizzle"><span><img className='logo' src="assets/githubicon.png" alt="#" /></span></NavItem>
          <NavItem href="https://www.linkedin.com/in/-isaacp/"><span><img className='logo' src="assets/linkedinicon.png" alt="#" /></span></NavItem>
          <NavItem href="https://stackoverflow.com/users/8822068/isaac?tab=profile"><span><img className='logo' src="assets/stackoverflowicon.png" alt="#" /></span></NavItem>

        </Navbar>

        <Parallax imageSrc="./assets/narrowcanyon.jpg" />
        <div className="section white">
          <div className="row container">
            <img src="/assets/AmberandI.JPG" id="profile" alt="Me" />
            <h3 className="header">Hi! I'm Isaac</h3>
            <p className="grey-text text-darken-3 lighten-3">I'm a Web Developer currently working with the MERN Stack.
            <br/>
            <br/>
            I love the diversity of people. Coding makes me happy.
            <br/>
            <br/>
            In my free time you can find me peddling my bike, riding at the skatepark, or coding up a storm with my laptop.</p>
          </div>
        </div>
        <Parallax imageSrc="./assets/ipadchessmatch.jpg" />
        <div className="section white">
          <div className="row container">
            <h2 className="header">Full Stack Projects</h2>
            
            {/* Project Examples */}

            {/* Sk8 */}
            <div className="project-div">
            <img src="/assets/Sk8.gif" className="project" alt="Me" />
            <p className="project-text grey-text text-darken-3 lighten-3">As a team of 3 we built this Full Stack Application from the ground up, I was the Back-End Developer. Sk8 enables skateboarders to save spots on Google Maps and upload their best tricks for specific locations and share with others. Tech used: MySQL, NodeJS, Express, Google Maps API, Geolocation, AJAX, jQuery, Heroku. Find it on <a href='https://github.com/IzzleNizzle/SK8'>GitHub</a></p>
            </div>


            {/* <br/> */}

            {/* Scrape 2 Mongo */}
            <div className="project-div">
            <img src="/assets/Scrape2Mongo.gif" className="project project-right" alt="Me" />
            <p className="project-text grey-text text-darken-3 lighten-3">I built this Full Stack Application by myself, this application scrapes another news website and allows users to make lists and add custom comments. Tech used: NodeJS, Express, MongoDB, Mongoose, AJAX, jQuery. Find it on <a href='https://github.com/IzzleNizzle/groupProject1'>GitHub</a></p>
            </div>
            {/* <br/>  */}

            {/* PikaFlik */}
            <div className="project-div">
            <img src="/assets/PikaFlik.gif" className="project" alt="Me" />
            <p className="project-text grey-text text-darken-3 lighten-3">A website to help groups of friends decide on what movie they want to watch. Tech used: Bootstrap, Firebase, jQuery, API calls to <a href='themoviedb.org'>themoviedb.org</a>. Find it on <a href='https://github.com/IzzleNizzle/scrape2Mongo'>GitHub</a></p>
            </div>

          </div>
        </div>


        <Footer copyrights="&copy; IzzleNizzle 2018"

          links={
            <ul>
              {/* <li>
                <h4>Let's Connect!</h4>
              </li> */}
              <li>
              <a href="https://github.com/IzzleNizzle" className='logo'>GitHub <span ><img className='logo'src="assets/githubicon.png" alt="#" /></span></a>
              </li>
              <li>
              <a href="https://www.linkedin.com/in/-isaacp/" className='logo'>LinkedIn <span ><img className='logo'src="assets/linkedinicon.png" alt="#" /></span></a>
              </li>
              <li>
              <a href="https://stackoverflow.com/users/8822068/isaac?tab=profile" className='logo'>Stack Overflow <span ><img className='logo'src="assets/stackoverflowicon.png" alt="#" /></span></a>
              </li>
            </ul>
          }
          className='example'
        >
          <h4 className="white-text">Let's connect!</h4>

        </Footer>

      </div>
    );
  }
}

export default App;
