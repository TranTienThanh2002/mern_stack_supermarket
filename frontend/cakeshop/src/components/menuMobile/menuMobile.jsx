import React from 'react'
import { BiCategory, BiHeart, BiHomeAlt2, BiSearch } from 'react-icons/bi'
import { BsHandbag } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export const MenuMobile = () => {
  return (
    <>
    <div class="mobile-menu d-md-none d-block mobile-cart">
        <ul>
            <li>
                <Link to='/'>
                    <BiHomeAlt2 className='icli'/>
                    <span>Home</span>
                </Link>
            </li>

            <li class="mobile-category">
                <Link to='/shop'>
                    <BiCategory className='icli'/>
                    <span>Category</span>
                </Link>
            </li>

            <li>
                <Link to='/searchProduct' class="search-box">
                    <BiSearch className='icli'/>
                    <span>Search</span>
                </Link>
            </li>

            <li>
                <Link to='/wishlist' class="notifi-wishlist">
                    <BiHeart className='icli'/>
                    <span>My Wish</span>
                </Link>
            </li>

            <li>
                <Link to='/cart'>
                    <BsHandbag className='icli'/>
                    <span>Cart</span>
                </Link>
            </li>
        </ul>
    </div>
    </>
  )
}
