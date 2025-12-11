import { Menu, X, Phone, Mail, MessageCircle, User, Home, Stethoscope, FileText, Mailbox } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Contact details
  const contactDetails = {
    phone1: '+91 79082 24288',
    phone2: '+91 90641 88801',
    email: 'drspriyadarshi@yahoo.co.in'
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'services', label: 'Services', icon: Stethoscope },
    { id: 'blog', label: 'Health Insights', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Mailbox },
    { id: 'prescriptiongenerator', label: 'Prescription', icon: FileText },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setIsMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello, I'd like to schedule an appointment with Dr. Shailendra.");
    window.open(`https://wa.me/917908224288?text=${message}`, '_blank');
  };

  const handleCallClick = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_blank');
  };

  // Simple background based on scroll
  const getNavBackground = () => {
    if (scrolled) {
      return 'bg-white shadow';
    }
    return 'bg-gradient-to-r from-blue-50 to-emerald-50';
  };

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 ${getNavBackground()} transition-colors duration-200 ${scrolled ? 'py-2' : 'py-4'}`}>
        {/* Top Contact Bar - Desktop Only */}
        {!scrolled && (
          <div className="hidden lg:block">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center text-sm py-2">
                <div className="flex items-center space-x-6">
                  <a
                    href={`tel:${contactDetails.phone1}`}
                    className="flex items-center text-blue-800 hover:text-teal-600 font-medium"
                  >
                    <Phone size={14} className="mr-2" />
                    {contactDetails.phone1}
                  </a>
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="flex items-center text-blue-800 hover:text-teal-600 font-medium"
                  >
                    <Mail size={14} className="mr-2" />
                    {contactDetails.email}
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-blue-600 font-medium">Since 1992</span>
                  <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
                  <span className="text-emerald-700 font-medium">32+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with logo.png */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleNavClick('home')}
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center mr-3">
                  <img 
                    src={logo} 
                    alt="HealthFirst247 Logo" 
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      // Fallback if logo doesn't exist
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.parentElement?.nextElementSibling;
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                  {/* Fallback logo - hidden by default */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-teal-600 rounded-xl hidden items-center justify-center">
                    <span className="text-white font-bold text-2xl">H</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    HealthFirst<span className="text-teal-700">247</span>
                  </h1>
                  <p className="text-xs text-gray-600 font-medium">
                    Dr. Shailendra | Matigara
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center px-4 py-2 rounded-xl ${
                      currentPage === item.id
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'text-gray-700 hover:text-teal-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 ml-6">
                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-emerald-600"
                >
                  <MessageCircle size={18} className="mr-2" />
                  WhatsApp
                </button>
                
                <button
                  onClick={() => handleCallClick(contactDetails.phone1)}
                  className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700"
                >
                  <Phone size={18} className="mr-2" />
                  Call Now
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X size={28} className="text-gray-700" />
              ) : (
                <Menu size={28} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg">
            {/* Menu Header with logo.png */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center mr-4">
                  <img 
                    src="/logo.png" 
                    alt="HealthFirst247 Logo" 
                    className="w-14 h-14 object-contain"
                    onError={(e) => {
                      // Fallback if logo doesn't exist
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.parentElement?.nextElementSibling;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  {/* Fallback logo for mobile - hidden by default */}
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-700 to-teal-600 rounded-xl hidden items-center justify-center">
                    <span className="text-white font-bold text-2xl">H</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">HealthFirst247</h2>
                  <p className="text-sm text-gray-600">Dr. Shailendra</p>
                </div>
              </div>
              
              {/* Quick Contact */}
              <div className="space-y-3">
                <button
                  onClick={() => handleCallClick(contactDetails.phone1)}
                  className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-blue-700"
                >
                  <Phone size={18} className="mr-2" />
                  {contactDetails.phone1}
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-center bg-emerald-500 text-white px-4 py-3 rounded-xl font-medium hover:bg-emerald-600"
                >
                  <MessageCircle size={18} className="mr-2" />
                  WhatsApp Now
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center p-4 rounded-xl mb-2 ${
                      currentPage === item.id
                        ? 'bg-teal-50 text-teal-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} className="mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}

              {/* Emergency Section */}
              <div className="mt-8 p-4 bg-red-50 rounded-xl border border-red-100">
                <h3 className="font-bold text-gray-900 mb-3">Emergency Contact</h3>
                <button
                  onClick={() => handleCallClick(contactDetails.phone1)}
                  className="w-full flex items-center justify-center bg-red-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-red-700"
                >
                  <Phone size={18} className="mr-2" />
                  Emergency: {contactDetails.phone1}
                </button>
                <p className="text-xs text-gray-600 mt-2 text-center">
                  Available 24/7 for emergencies
                </p>
              </div>

              {/* Email Section */}
              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="flex items-center justify-center text-blue-700 hover:text-blue-800 font-medium"
                >
                  <Mail size={18} className="mr-2" />
                  {contactDetails.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600"
        title="Quick WhatsApp Consultation"
      >
        <MessageCircle size={28} />
      </button>
    </>
  );
}