import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, ShoppingCart, LogIn, User, Menu, X, MapPin, LocateFixed } from 'lucide-react';
import './common.css';
import type { RootState } from '../../redux/reducers/store';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/reducers/auth/authSlice';

const Navbar: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const { totalQuantity } = useSelector((state: RootState) => state.carts);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [locationDetails, setLocationDetails] = useState<{
    exactLocation?: string;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
  
  const handleLogout = () => {
    dispatch(logout());
    setIsUserDropdownOpen(false);
  };

  const getPreciseLocation = async () => {
    if (!('geolocation' in navigator)) {
      setLocationError("Geolocation not supported");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      // Using Google Maps Geocoding API for precise address
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
          position.coords.latitude
        },${
          position.coords.longitude
        }&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        setLocationDetails({
          exactLocation: data.results[0].formatted_address
        });
      } else {
        setLocationError("Address not found");
      }
    } catch (error) {
      console.error('Location error:', error);
      setLocationError("Couldn't get location. Tap to retry.");
    } finally {
      setIsLocating(false);
    }
  };

  useEffect(() => {
    getPreciseLocation();
  }, []);

  const renderLocation = () => {
    if (isLocating) {
      return (
        <span className="text-sm text-gray-500 hidden md:flex items-center">
          <LocateFixed className="h-4 w-4 mr-1 animate-pulse" />
          Locating...
        </span>
      );
    }

    if (locationError) {
      return (
        <button 
          onClick={getPreciseLocation}
          className="text-sm text-gray-500 hidden md:flex items-center hover:text-orange-600"
        >
          <MapPin className="h-4 w-4 mr-1" />
          {locationError}
        </button>
      );
    }

    if (locationDetails?.exactLocation) {
      return (
        <div className="group relative">
          <span className="text-sm text-gray-500 hidden md:flex items-center cursor-pointer">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate max-w-[180px]">
              {locationDetails.exactLocation}
            </span>
          </span>
          <div className="absolute hidden group-hover:block bg-white p-2 shadow-lg rounded-md z-50 w-64 text-sm">
            {locationDetails.exactLocation}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full border shadow-md">
      <div className="w-full md:w-3/4 mx-auto pt-2 pb-2  ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-orange-600 rounded-full focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link to='/'>
              <div className="flex-shrink-0 ml-2 md:ml-0">
                <h1 className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-orange-700 transition-colors">
                  TR-Cafe
                </h1>
                {renderLocation()}
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="md:hidden p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all">
              <Search className="h-6 w-6" />
            </button>
            
            <Link to="/carts">
              <button className="relative p-2 text-gray-900 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all">
                <ShoppingCart className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              </button>
            </Link>

            {isAuthenticated === 'success' ? (
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="hidden sm:block p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all"
                >
                  <User className="h-6 w-6" />
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link 
                      to="/user" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/user/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth/login">
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-full font-medium transition-colors">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;