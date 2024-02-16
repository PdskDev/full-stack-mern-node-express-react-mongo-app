import React from 'react';

const Footer = () => {
  return (
    <footer>
      <header>
        <h2>NadetDev</h2>
        <p>
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis,
          accusantium?"
        </p>
        <ul className='icons'>
          <ion-icon class='icon' name='logo-facebook'></ion-icon>
          <ion-icon class='icon' name='logo-instagram'></ion-icon>
          <ion-icon class='icon' name='logo-twitter'></ion-icon>
          <ion-icon class='icon' name='logo-youtube'></ion-icon>
        </ul>
      </header>
      <aside>
        <ul className='category'>
          <li>
            <h3>Project</h3>
          </li>
          <li>Houses</li>
          <li>Rooms</li>
          <li>Flats</li>
          <li>Apartments</li>
        </ul>
        <ul className='category'>
          <li>
            <h3>Company</h3>
          </li>
          <li>Objective</li>
          <li>Capital</li>
          <li>Security</li>
          <li>Selling</li>
        </ul>
        <ul className='category'>
          <li>
            <h3>Movement</h3>
          </li>
          <li>Movement</li>
          <li>Support us</li>
          <li>Pricing</li>
          <li>Renting</li>
        </ul>
        <ul className='category'>
          <li>
            <h3>Help</h3>
          </li>
          <li>Privacy</li>
          <li>Contact</li>
          <li>FAQs</li>
          <li>Blog</li>
        </ul>
      </aside>
    </footer>
  );
};

export default Footer;
