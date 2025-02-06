'use client'

import styles from "./header.module.css";
import logo from "../images/logo.png";
import { useState } from "react";
import classNames from "classnames";
import {FaInstagram, FaWhatsapp} from 'react-icons/fa'

export default function Header() {
    const[active, setActive] = useState(false);
  return (
    <header className={styles.navbar}>
      <a href="/" className={styles.nav_logo}>
        <img src={logo.src} alt="" />
      </a>
      <nav>
        <menu className={classNames(active? styles.menuactive : null)}>
          <li>
            <a href="/#home">Home</a>
          </li>
          <li>
            <a href="/catalog">Catalogo</a>
          </li>
          <li>
            <a href="/sobre">Sobre</a>
          </li>
          <li>
            <a href="/contact">Contato</a>
          </li>
          <li className={styles.social_icons}>
            <a href=""><FaInstagram/></a>
            <a href=""><FaWhatsapp/></a>
          </li>
        </menu>
        <div onClick={()=>setActive(!active)} className={styles.menu_burguer} >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
}
