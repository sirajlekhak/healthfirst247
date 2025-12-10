import { Heart, Phone, Mail, MapPin, Clock, MessageCircle, Stethoscope, Shield, ExternalLink, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  // Updated contact details
  const contactInfo = {
    phone1: '+91 79082 24288',
    phone2: '+91 90641 88801',
    email: 'drspriyadarshi@yahoo.co.in',
    location: 'Matigara, West Bengal, India',
    whatsapp: '+917908224288'
  };

  const clinicHours = [
    { day: 'Monday - Saturday', time: '9:00 AM - 7:00 PM' },
    { day: 'Sunday', time: '10:00 AM - 2:00 PM' },
    { day: 'Emergency', time: '24/7 on Call' }
  ];

  const quickLinks = [
    { name: 'Home', page: 'home' },
    { name: 'About Dr. Shailendra', page: 'about' },
    { name: 'Services', page: 'services' },
    { name: 'Health Insights', page: 'blog' },
    { name: 'Contact & Booking', page: 'contact' }
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello, I'd like to schedule an appointment with Dr. Shailendra.");
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${message}`, '_blank');
  };

  const handleCallClick = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_blank');
  };

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Brand & Description - 4 cols */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <Heart size={24} fill="white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-blue-900"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">HealthFirst<span className="text-emerald-400">247</span></h2>
                  <p className="text-sm text-blue-200">Dr. Shailendra | Since 1992</p>
                </div>
              </div>
              <p className="text-blue-200 leading-relaxed text-sm">
                With over <span className="font-semibold text-emerald-300">32 years</span> of distinguished medical practice across India's premier institutions, providing trusted, compassionate healthcare to the Matigara community.
              </p>
            </div>

            {/* Quick Contact Actions */}
            <div className="space-y-3 mt-6">
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-center bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all font-medium"
              >
                <MessageCircle size={18} className="mr-2" />
                WhatsApp Appointment
              </button>
              <button
                onClick={() => handleCallClick(contactInfo.phone1)}
                className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all font-medium"
              >
                <Phone size={18} className="mr-2" />
                Call Now
              </button>
            </div>
          </div>

          {/* Quick Links - 3 cols */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <Stethoscope size={18} className="mr-2 text-emerald-400" />
              Quick Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="flex items-center text-blue-200 hover:text-emerald-300 transition-colors group text-sm"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information - 3 cols */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <MapPin size={18} className="mr-2 text-emerald-400" />
              Contact Details
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-8 h-8 bg-blue-800/50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <MapPin size={16} className="text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Clinic Location</p>
                  <p className="text-blue-200 text-sm">{contactInfo.location}</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 bg-blue-800/50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Phone size={16} className="text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Primary Contact</p>
                  <button
                    onClick={() => handleCallClick(contactInfo.phone1)}
                    className="text-blue-200 hover:text-emerald-300 transition-colors text-sm"
                  >
                    {contactInfo.phone1}
                  </button>
                  <p className="text-blue-300 text-xs mt-1">Alternate: {contactInfo.phone2}</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 bg-blue-800/50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Mail size={16} className="text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}?subject=HealthFirst247 Consultation`}
                    className="text-blue-200 hover:text-emerald-300 transition-colors text-sm flex items-center"
                  >
                    {contactInfo.email}
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Clinic Hours & Emergency - 3 cols */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <Clock size={18} className="mr-2 text-emerald-400" />
              Timing & Emergency
            </h3>
            <div className="space-y-4">
              {clinicHours.map((hour, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    hour.day === 'Emergency'
                      ? 'bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-800/30'
                      : 'bg-blue-800/30 border border-blue-700/30'
                  }`}
                >
                  <p className={`font-medium text-sm ${
                    hour.day === 'Emergency' ? 'text-red-300' : 'text-blue-200'
                  }`}>
                    {hour.day}
                  </p>
                  <p className={`font-bold ${
                    hour.day === 'Emergency' ? 'text-red-400' : 'text-emerald-300'
                  } text-sm`}>
                    {hour.time}
                  </p>
                </div>
              ))}
            </div>

            {/* Emergency Button */}
            <button
              onClick={() => handleCallClick(contactInfo.phone1)}
              className="mt-6 w-full flex items-center justify-center bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all font-bold shadow-lg"
            >
              <Phone size={18} className="mr-2" />
              Emergency Call Now
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-blue-800/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center p-4 bg-blue-800/30 rounded-xl">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-300">32+</p>
                <p className="text-sm text-blue-200">Years Experience</p>
              </div>
            </div>
            <div className="flex items-center justify-center p-4 bg-blue-800/30 rounded-xl">
              <div className="flex items-center">
                <Shield size={24} className="text-emerald-400 mr-3" />
                <div>
                  <p className="font-medium text-blue-100">Patient Confidentiality</p>
                  <p className="text-xs text-blue-300">100% Private & Secure</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center p-4 bg-blue-800/30 rounded-xl">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-300">7+</p>
                <p className="text-sm text-blue-200">Prestigious Institutions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-blue-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-blue-300">
                © {currentYear} HealthFirst247 | Dr. Shailendra. All rights reserved.
              </p>
              <p className="text-xs text-blue-400 mt-1">
                Committed to exceptional healthcare in Matigara since 1992
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={() => onNavigate('contact')}
                className="text-sm text-blue-300 hover:text-emerald-300 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-sm text-blue-300 hover:text-emerald-300 transition-colors"
              >
                Terms of Service
              </button>
              
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Float Button for Mobile */}
      <button
        onClick={handleWhatsAppClick}
        className="md:hidden fixed bottom-6 right-6 z-40 bg-gradient-to-r from-emerald-500 to-green-600 text-white p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
        title="Quick WhatsApp Appointment"
      >
        <MessageCircle size={24} />
      </button>
    </footer>
  );
}