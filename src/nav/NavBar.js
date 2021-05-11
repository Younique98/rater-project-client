import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import $ from 'jquery'

export const NavBar = (props) => {
    var util = {
        mobileMenu() {
          $("#nav").toggleClass("nav-visible");
        },
        windowResize() {
          if ($(window).width() > 800) {
            $("#nav").removeClass("nav-visible");
          }
        },
        scrollEvent() {
          var scrollPosition = $(document).scrollTop();
          
          $.each(util.scrollMenuIds, function(i) {
            var link = util.scrollMenuIds[i],
                container = $(link).attr("href"),
                containerOffset = $(container).offset().top,
                containerHeight = $(container).outerHeight(),
                containerBottom = containerOffset + containerHeight;
      
            if (scrollPosition < containerBottom - 20 && scrollPosition >= containerOffset - 20) {
              $(link).addClass("active");
            } else {
              $(link).removeClass("active");
            }
          });
        }
      };
      
      $(document).ready(function() {
        
        util.scrollMenuIds = $("a.nav-link[href]");
        $("#menu").click(util.mobileMenu);
        $(window).resize(util.windowResize);
        $(document).scroll(util.scrollEvent);
        
      });
      
                    
      
    
    
    return (
        
        <nav className="navbar">
  <div id="trapezoid">
      <li>
 <Link className="expandHome ref"  to="/">Games</Link></li>
  <Link className="expandHome ref"  to="/profile">My Profile</Link>
    <a href="https://www.linkedin.com/in/ericathompsonsmiles/" className="expandHome ref">Contact Us</a>
  
     <div className="subnav">
         <li>
     <Link className="subnavbtnSpec floatEventsText" to="/">Join Us<i className="fa fa-caret-down"></i></Link>
       <div className="subnav-content">
        <div className="subnav-trapezoid">
          <Link className="refSub subText" to="/register">Register to Play</Link>
          <Link className="refSub subText" to="/login">Login in to Join</Link>
         </div>
       </div>
          </li>
      </div>
  </div>
</nav>
    )
}