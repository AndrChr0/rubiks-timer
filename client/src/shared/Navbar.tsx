import { useState } from "react";
import { Home, Info, Mail, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='bg-primaryNav text-primary-foreground'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex justify-between'>
          <div className='flex space-x-4'>
            <div>
              <NavLink
                to='/'
                className='flex items-center py-5 px-2 text-white'
              >
                <span className='font-bold text-2xl'>Logo</span>
              </NavLink>
            </div>
          </div>
          {/* Desktop menu */}
          <div className='hidden md:flex items-center space-x-1'>
            <NavLink
              to='/'
              className='py-5 px-3 hover:text-gray-300 text-white flex items-center'
            >
              <Home className='w-4 h-4 inline-block mr-1' />
              Home
            </NavLink>
            <NavLink
              to='/about'
              className='py-5 px-3 hover:text-gray-300 text-white flex items-center '
            >
              <Info className='w-4 h-4 inline-block mr-1' />
              About
            </NavLink>
            <NavLink
              to='/contact'
              className='py-5 px-3 hover:text-gray-300 text-white flex items-center'
            >
              <Mail className='w-4 h-4 inline-block mr-1' />
              Contact
            </NavLink>
          </div>
          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            <button onClick={toggleMenu} className='mobile-menu-button'>
              {isMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <NavLink
          to='/'
          className='block py-2 px-4 text-sm hover:bg-primary-foreground hover:text-primary'
        >
          <Home className='w-4 h-4 inline-block mr-1' />
          Home
        </NavLink>
        <NavLink
          to='/about'
          className='block py-2 px-4 text-sm hover:bg-primary-foreground hover:text-primary'
        >
          <Info className='w-4 h-4 inline-block mr-1' />
          About
        </NavLink>
        <NavLink
          to='/contact'
          className='block py-2 px-4 text-sm hover:bg-primary-foreground hover:text-primary'
        >
          <Mail className='w-4 h-4 inline-block mr-1' />
          Contact
        </NavLink>
      </div>
    </nav>
  );
}
