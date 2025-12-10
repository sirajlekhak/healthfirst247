import { MapPin, Phone, Mail, Clock, Send, MessageCircle, AlertCircle, FileText, UserCheck, Shield, Calendar, Navigation, ExternalLink, CheckCircle, Stethoscope, CreditCard, Heart, Zap, Star, Users, Award } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredTime: 'morning'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Contact details
  const contactDetails = {
    phone1: '+91 79082 24288',
    phone2: '+91 90641 88801',
    whatsapp1: '+917908224288',
    whatsapp2: '+919064188801',
    email: 'drspriyadarshi@yahoo.co.in',
    location: 'HealthFirst247 Clinic, Matigara, West Bengal, India',
    mapUrl: 'https://maps.google.com/?q=Matigara+West+Bengal+India'
  };

  const consultationHours = [
    { day: 'Monday - Friday', time: '9:00 AM - 7:00 PM', type: 'regular', icon: Calendar },
    { day: 'Saturday', time: '9:00 AM - 7:00 PM', type: 'regular', icon: Calendar },
    { day: 'Sunday', time: '10:00 AM - 2:00 PM', type: 'weekend', icon: Clock },
    { day: 'Emergency', time: '24/7 on Call', type: 'emergency', icon: AlertCircle }
  ];

  const appointmentChecklist = [
    { icon: UserCheck, text: 'Valid ID Proof & Previous Medical Records' },
    { icon: FileText, text: 'List of Current Medications & Allergies' },
    { icon: Shield, text: 'Insurance/Health Card Information' },
    { icon: Calendar, text: 'List of Symptoms & Duration' }
  ];

  const stats = [
    { icon: Users, value: '5000+', label: 'Patients Treated' },
    { icon: Award, value: '32+', label: 'Years Experience' },
    { icon: Star, value: '98%', label: 'Satisfaction Rate' },
    { icon: Zap, value: '<2h', label: 'Avg. Response Time' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    const timePreference = formData.preferredTime === 'morning' ? 'Morning (9 AM - 12 PM)' :
                          formData.preferredTime === 'afternoon' ? 'Afternoon (12 PM - 4 PM)' :
                          'Evening (4 PM - 7 PM)';
    
    const whatsappMessage = `📋 *New Consultation Request - HealthFirst247*
    
👤 *Patient Information:*
• Name: ${formData.name}
• Phone: ${formData.phone}
• Email: ${formData.email || 'Not provided'}

⏰ *Appointment Preferences:*
• Preferred Time: ${timePreference}

📝 *Health Concern:*
${formData.message}

📍 *Location:* Matigara, West Bengal
📅 *Response Time:* Within 2 hours`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${contactDetails.whatsapp1}?text=${encodedMessage}`, '_blank');
    
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          preferredTime: 'morning'
        });
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDirectWhatsApp = (messageType: 'consultation' | 'emergency' | 'followup') => {
    let defaultMessage = '';
    
    switch (messageType) {
      case 'consultation':
        defaultMessage = "Hello Dr. Shailendra, I'd like to schedule a consultation appointment.";
        break;
      case 'emergency':
        defaultMessage = "URGENT: Need emergency medical consultation.";
        break;
      case 'followup':
        defaultMessage = "Hello, I need a follow-up appointment.";
        break;
    }
    
    window.open(`https://wa.me/${contactDetails.whatsapp1}?text=${encodeURIComponent(defaultMessage)}`, '_blank');
  };

  const handleDirectCall = (phoneNumber: string, isEmergency = false) => {
    if (isEmergency) {
      if (window.confirm('Call emergency number?')) {
        window.open(`tel:${phoneNumber}`, '_blank');
      }
    } else {
      window.open(`tel:${phoneNumber}`, '_blank');
    }
  };

  const handleGetDirections = () => {
    window.open(contactDetails.mapUrl, '_blank');
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 mt-8 shadow-lg animate-pulse">
              <MessageCircle className="w-4 h-4 mr-2" />
              24/7 Medical Support Available
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Your Health, Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-600">Priority</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10">
              Connect with Dr. Shailendra through multiple channels for appointments, consultations, and emergency care.
            </p>
            
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-center mb-2">
                      <Icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Contact Grid */}
          <div className="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                type: 'whatsapp', 
                title: 'WhatsApp Consultation', 
                desc: 'Instant appointment booking', 
                color: 'from-emerald-500 to-green-600',
                icon: MessageCircle,
                onClick: () => handleDirectWhatsApp('consultation')
              },
              { 
                type: 'call', 
                title: 'Primary Contact', 
                desc: contactDetails.phone1, 
                color: 'from-blue-600 to-teal-600',
                icon: Phone,
                onClick: () => handleDirectCall(contactDetails.phone1)
              },
              { 
                type: 'email', 
                title: 'Email Consultation', 
                desc: contactDetails.email, 
                color: 'from-blue-700 to-indigo-600',
                icon: Mail,
                href: `mailto:${contactDetails.email}?subject=Consultation Request - HealthFirst247`
              },
              { 
                type: 'emergency', 
                title: 'Emergency Contact', 
                desc: 'Available 24/7', 
                color: 'from-red-600 to-orange-600',
                icon: AlertCircle,
                onClick: () => handleDirectCall(contactDetails.phone1, true)
              }
            ].map((item, index) => {
              const Icon = item.icon;
              if (item.href) {
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="group relative bg-gradient-to-br bg-white border-2 border-gray-200 text-gray-800 p-6 rounded-2xl hover:shadow-2xl hover:border-teal-200 transition-all duration-300 overflow-hidden hover:scale-[1.02]"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-center mb-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-sm opacity-90 mb-3 truncate">{item.desc}</p>
                      <div className="text-xs text-teal-600 font-medium flex items-center justify-center">
                        <span>Click to connect</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </a>
                );
              }
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="group relative bg-gradient-to-br bg-white border-2 border-gray-200 text-gray-800 p-6 rounded-2xl hover:shadow-2xl hover:border-teal-200 transition-all duration-300 overflow-hidden hover:scale-[1.02]"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-sm opacity-90 mb-3">{item.desc}</p>
                    <div className="text-xs text-teal-600 font-medium flex items-center justify-center">
                      <span>Tap to connect</span>
                      <CheckCircle className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Appointment Booking Form */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold">Book Your Appointment</h2>
                      <p className="text-teal-100 text-sm mt-1">Complete the form below</p>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <Heart className="w-8 h-8 text-white/40" />
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <CheckCircle className="text-emerald-600 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Appointment Request Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Your consultation request has been prepared for WhatsApp. Please check your WhatsApp to send the message and complete the booking.
                    </p>
                    <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 mb-6 border border-blue-100">
                      <p className="text-sm text-gray-700 font-medium">
                        <strong>Next Step:</strong> Look for the WhatsApp message draft and send it to finalize your appointment request.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium border border-teal-200 px-6 py-2 rounded-lg hover:bg-teal-50 transition-colors"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all hover:border-teal-300"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all hover:border-teal-300"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all hover:border-teal-300"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Appointment Time
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all bg-white hover:border-teal-300"
                      >
                        <option value="morning">🌅 Morning (9:00 AM - 12:00 PM)</option>
                        <option value="afternoon">☀️ Afternoon (12:00 PM - 4:00 PM)</option>
                        <option value="evening">🌙 Evening (4:00 PM - 7:00 PM)</option>
                        <option value="flexible">🕐 Flexible - Any Available Slot</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Health Concern Details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all resize-none hover:border-teal-300"
                        placeholder="Please describe your symptoms, duration, and any specific concerns..."
                      ></textarea>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-gray-500">
                          Your information will be sent securely via WhatsApp
                        </p>
                        <span className="text-xs text-teal-600 font-medium">* Required fields</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className={`w-full ${
                        isSending
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:shadow-xl transform hover:scale-[1.02] active:scale-95'
                      } text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg flex items-center justify-center`}
                    >
                      {isSending ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Preparing WhatsApp...
                        </>
                      ) : (
                        <>
                          <MessageCircle size={20} className="mr-3" />
                          Send via WhatsApp
                          <Send size={18} className="ml-2" />
                        </>
                      )}
                    </button>

                    <div className="text-center text-xs text-gray-500 space-y-1 pt-4 border-t border-gray-200">
                      <p className="flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 mr-1 text-teal-500" />
                        You'll be redirected to WhatsApp to send the message
                      </p>
                      <p className="flex items-center justify-center">
                        <Clock className="w-3 h-3 mr-1 text-blue-500" />
                        Response typically within 2 hours during clinic hours
                      </p>
                      <p className="flex items-center justify-center">
                        <AlertCircle className="w-3 h-3 mr-1 text-red-500" />
                        For emergencies, please call directly
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Clinic Information Sidebar */}
            <div className="space-y-6">
              {/* Clinic Location Card */}
              <div className="bg-gradient-to-br from-blue-900 to-teal-900 text-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">Clinic Location</h3>
                      <p className="text-blue-200 leading-relaxed mb-4">
                        {contactDetails.location}
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={handleGetDirections}
                          className="inline-flex items-center bg-white text-blue-900 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </button>
                        <button
                          onClick={() => handleDirectCall(contactDetails.phone1)}
                          className="inline-flex items-center bg-white/20 text-white px-5 py-2.5 rounded-lg hover:bg-white/30 transition-colors font-medium"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Before Visit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Combined Hours & Emergency Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Clinic Hours Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mr-3">
                        <Clock className="text-teal-600 w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Clinic Hours</h3>
                    </div>
                    <div className="space-y-3">
                      {consultationHours.map((hour, index) => {
                        const Icon = hour.icon;
                        return (
                          <div
                            key={index}
                            className={`flex justify-between items-center p-3 rounded-lg ${
                              hour.type === 'emergency'
                                ? 'bg-red-50 border border-red-100'
                                : hour.type === 'weekend'
                                ? 'bg-amber-50 border border-amber-100'
                                : 'bg-blue-50 border border-blue-100'
                            }`}
                          >
                            <div className="flex items-center">
                              <Icon className={`w-4 h-4 mr-2 ${
                                hour.type === 'emergency' ? 'text-red-600' :
                                hour.type === 'weekend' ? 'text-amber-600' :
                                'text-blue-600'
                              }`} />
                              <span className={`font-medium text-sm ${
                                hour.type === 'emergency' ? 'text-red-700' :
                                hour.type === 'weekend' ? 'text-amber-700' :
                                'text-gray-700'
                              }`}>
                                {hour.day}
                              </span>
                            </div>
                            <span className={`font-bold text-sm ${
                              hour.type === 'emergency' ? 'text-red-600' :
                              hour.type === 'weekend' ? 'text-amber-600' :
                              'text-teal-700'
                            }`}>
                              {hour.time}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Emergency Contact Card */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100 shadow-lg">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-3">
                        <AlertCircle className="text-red-600 w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Emergency</h3>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      For urgent medical concerns requiring immediate attention:
                    </p>
                    <div className="space-y-3">
                      <button
                        onClick={() => handleDirectCall(contactDetails.phone1, true)}
                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center hover:shadow-xl transition-all shadow-md"
                      >
                        <Phone className="mr-2" size={18} />
                        Call Now: {contactDetails.phone1}
                      </button>
                      <button
                        onClick={() => handleDirectWhatsApp('emergency')}
                        className="w-full bg-white text-red-700 border border-red-300 hover:bg-red-50 px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Emergency
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment QR Code Card */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 shadow-lg">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
                      <CreditCard className="text-purple-600 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Payment</h3>
                      <p className="text-gray-700 text-sm mb-4">
                        Scan QR code for instant UPI payments
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    {/* QR Code Display */}
                    <div className="flex-shrink-0">
                      <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                        <img 
                          src="/payment-qrcode.png" 
                          alt="Payment QR Code"
                          className="w-40 h-40 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDE2MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIiByeD0iMTIiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIHJ4PSI4IiBmaWxsPSIjRkZGIiBzdHJva2U9IiNFRUVFRUUiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSI4MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U2NhbiB0byBwYXk8L3RleHQ+Cjx0ZXh0IHg9IjgwIiB5PSI3MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5VUEkgUVJDb2RlPC90ZXh0Pgo8cmVjdCB4PSI0MCIgeT0iOTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4IiByeD0iNCIgZmlsbD0iI0VFRUVFRSIvPgo8L3N2Zz4K';
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Payment Instructions */}
                    <div className="space-y-3 flex-1">
                      <div className="space-y-2">
                        <h4 className="font-bold text-gray-800 text-sm">How to Pay:</h4>
                        <ul className="space-y-1.5 text-xs text-gray-700">
                          <li className="flex items-start">
                            <div className="w-4 h-4 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">1</div>
                            Open any UPI app
                          </li>
                          <li className="flex items-start">
                            <div className="w-4 h-4 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">2</div>
                            Tap "Scan QR Code"
                          </li>
                          <li className="flex items-start">
                            <div className="w-4 h-4 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">3</div>
                            Scan & enter amount
                          </li>
                          <li className="flex items-start">
                            <div className="w-4 h-4 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">4</div>
                            Confirm payment
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white/80 rounded-lg p-3 border border-purple-200">
                        <p className="text-xs text-gray-700 mb-2 font-medium">
                          After payment share screenshot for confirmation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Checklist Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mr-3">
                      <Stethoscope className="text-blue-600 w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">For Your Appointment</h3>
                  </div>
                  <div className="space-y-3">
                    {appointmentChecklist.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="flex items-start p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                          <Icon className="text-blue-600 mr-3 flex-shrink-0 mt-0.5" size={16} />
                          <span className="text-sm text-gray-700">{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Response Time Banner */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Quick Response Guarantee</h3>
                  <p className="text-blue-100 text-sm">We respond to all inquiries within 2 hours during clinic hours</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                {[
                  { value: '2', label: 'Hours Max', color: 'text-blue-200' },
                  { value: '24/7', label: 'Emergency', color: 'text-red-200' },
                  { value: '100%', label: 'Confidential', color: 'text-emerald-200' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-xs ${stat.color}`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <button
        onClick={() => handleDirectWhatsApp('consultation')}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 active:scale-95 group"
        title="Quick WhatsApp Consultation"
      >
        <MessageCircle size={28} />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white animate-ping"></span>
        <div className="absolute right-16 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium">
          Quick Appointment
          <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
        </div>
      </button>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}