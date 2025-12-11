import { Award, Heart, Users, Clock, CheckCircle, Shield, Star, ArrowRight, Phone, Target, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import doctorprofilepic from '../assets/doctorprofilepic.jpg';
interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const institutions = [
    "CMCH-Vellore", "KEM-Pune", "Tata Main Hospital", 
    "MGMMCH", "BITS-Pilani", "CAPFS", "MTMH"
  ];

  const features = [
    {
      icon: Award,
      title: "Expert Training",
      description: "Trained at India's most prestigious medical institutions including CMCH-Vellore, KEM-Pune, and BITS-Pilani.",
      highlight: "Elite Medical Education"
    },
    {
      icon: Heart,
      title: "Comprehensive Care",
      description: "From preventive health to chronic disease management, providing complete healthcare solutions for all ages.",
      highlight: "Full Spectrum Healthcare"
    },
    {
      icon: Users,
      title: "Patient-First Philosophy",
      description: "Every patient receives personalized attention and care, ensuring the best possible health outcomes.",
      highlight: "Personalized Approach"
    }
  ];

  const stats = [
    { icon: Clock, value: "32+", label: "Years of Experience", description: "Trusted medical practice" },
    { icon: Users, value: "10,000+", label: "Patients Treated", description: "Across generations" },
    { icon: CheckCircle, value: "7+", label: "Prestigious Institutions", description: "Elite training background" },
    { icon: Shield, value: "24/7", label: "Care Priority", description: "Your health always comes first" }
  ];

  // Updated contact details
  const contactDetails = {
    phone1: '+91 79082 24288',
    phone2: '+91 90641 88801'
  };

  const handleEmergencyCall = () => {
    window.open(`tel:${contactDetails.phone1}`, '_blank');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello, I'd like to schedule an appointment with Dr. Shailendra.");
    window.open(`https://wa.me/917908224288?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated padding-top for new navigation */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 pt-24 lg:pt-28 pb-20 mt-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230f766e' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '300px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="relative">
              <div className="inline-flex items-center bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-5 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
                <Star className="w-4 h-4 mr-2" fill="white" />
                Trusted Healthcare in Matigara Since 1992
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-600">Experience</span> Meets Compassion
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                With over <span className="font-semibold text-teal-700">32 years</span> of distinguished service across India's premier medical institutions, Dr. Shailendra brings unparalleled expertise to Matigara.
              </p>

              {/* Success Foundation Tagline */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-blue-100">
                <div className="flex items-center">
                  <Target className="text-teal-600 mr-3 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-blue-900 text-lg">
                      Where health is the major foundation to SUCCESS
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Building healthier communities through expert medical care
                    </p>
                  </div>
                </div>
              </div>

              {/* Institution Badges */}
              <div className="mb-10">
                <p className="text-gray-600 font-medium mb-4">Trained & served at:</p>
                <div className="flex flex-wrap gap-3">
                  {institutions.map((inst, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-2 bg-white border border-blue-100 rounded-lg text-sm font-medium text-blue-800 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="group relative bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold text-base md:text-lg shadow-lg flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Book Your Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className="group bg-white text-gray-800 px-6 py-3 md:px-8 md:py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold text-base md:text-lg border-2 border-gray-200 hover:border-teal-300 flex items-center justify-center"
                >
                  View Full Profile
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Content - Doctor Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent z-10" />
                <img
                  src={doctorprofilepic}
                  alt="Dr. Shailendra - Composite Medical Consultant"
                  className="w-full h-[450px] md:h-[500px] lg:h-[550px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 max-w-md">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">Dr. Shailendra</h3>
                    <p className="text-teal-700 md:text-lg font-medium">
  MBBS, MD (Chest Medicine), <br />M.Phil,
  PhD(Medicine)
</p>
                    <p className="text-gray-600 mt-2 text-sm md:text-base">Composite Medical Consultant</p>
                  </div>
                </div>
              </div>
              
              {/* Experience Badge */}
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-gradient-to-br from-blue-700 to-teal-600 text-white p-4 md:p-6 rounded-2xl shadow-2xl">
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold">32+</p>
                  <p className="text-xs md:text-sm font-medium opacity-90">Years</p>
                  <p className="text-xs mt-1 opacity-80 hidden md:block">Medical Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              The <span className="text-teal-700">HealthFirst247</span> Difference
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Three decades of medical excellence distilled into a patient-first healthcare experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-white to-blue-50 p-6 md:p-8 rounded-2xl border border-gray-100 hover:border-teal-200 transition-all duration-300 ${
                  hoveredFeature === index ? 'shadow-xl scale-[1.02]' : 'shadow-lg hover:shadow-xl'
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-teal-50 to-blue-50 rounded-full -translate-y-8 translate-x-8 md:-translate-y-12 md:translate-x-12 opacity-50 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-teal-600 to-emerald-500 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="text-white" size={20} />
                  </div>
                  
                  <div className="inline-block bg-teal-100 text-teal-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold mb-3">
                    {feature.highlight}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{feature.description}</p>
                  
                  <div className="mt-4 md:mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => onNavigate('about')}
                      className="inline-flex items-center text-teal-700 font-semibold text-xs md:text-sm hover:text-teal-800"
                    >
                      Learn more
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Success Foundation Box */}
          <div className="mt-16 bg-gradient-to-br from-blue-900 to-teal-900 text-white rounded-2xl p-8 md:p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="md:w-1/4 flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Target className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="md:w-3/4 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Health: The Foundation of All Success
                </h3>
                <p className="text-blue-200 leading-relaxed text-lg">
                  At HealthFirst247, we believe that good health is not just the absence of disease, but the fundamental building block for personal, professional, and community success. With 32+ years of medical expertise, Dr. Shailendra helps you build this essential foundation.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center">
                    <CheckCircle2 className="text-emerald-300 mr-2" size={18} />
                    <span className="text-sm">Healthy Individuals</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="text-emerald-300 mr-2" size={18} />
                    <span className="text-sm">Productive Communities</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="text-emerald-300 mr-2" size={18} />
                    <span className="text-sm">Thriving Society</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Trust Built Over <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Three Decades</span>
            </h2>
            <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto">
              A legacy of medical excellence that patients in Matigara have relied upon for generations
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group text-center p-4 md:p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-teal-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon size={24} className="md:w-8 md:h-8 lg:w-9 lg:h-9" />
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                <p className="text-sm md:text-base lg:text-lg font-semibold text-teal-200 mb-1">{stat.label}</p>
                <p className="text-xs md:text-sm text-blue-200 opacity-80">{stat.description}</p>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="mt-12 md:mt-20 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-3xl mx-auto border border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Why Matigara Chooses HealthFirst247</h3>
                <p className="text-blue-200 text-sm md:text-base">
                  Consistent, compassionate care backed by institutional excellence
                </p>
                <p className="text-emerald-300 text-sm mt-2">
                  Building healthier foundations for success, one patient at a time
                </p>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-white text-blue-900 px-6 py-2 md:px-8 md:py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-sm md:text-base whitespace-nowrap"
              >
                Start Your Health Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230f766e' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '200px'
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-6 shadow-lg">
            Limited Appointment Slots Available
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-600">Foundation for Success</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-10 leading-relaxed max-w-2xl mx-auto">
            Good health is the cornerstone of all achievement. Schedule a consultation with Dr. Shailendra and invest in the most important foundation of your success.
          </p>

          {/* Success Quote */}
          <div className="mb-8 p-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-100 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Target className="text-teal-600 mr-3" size={24} />
              <p className="text-lg font-bold text-blue-900">
                "Where health is the major foundation to SUCCESS"
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              Dr. Shailendra's philosophy for 32+ years of medical practice
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleWhatsApp}
              className="group bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 md:px-10 md:py-4 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-base md:text-lg shadow-lg flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-3" />
              Book Appointment Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={handleEmergencyCall}
              className="bg-white text-gray-800 px-6 py-3 md:px-10 md:py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold text-base md:text-lg border-2 border-gray-200 hover:border-teal-300 shadow-md"
            >
              Emergency: {contactDetails.phone1}
            </button>
          </div>
          
          <p className="text-gray-600 mt-6 md:mt-8 text-xs md:text-sm">
            Response time: Typically within 2 hours • Evening appointments available
          </p>
        </div>
      </section>
    </div>
  );
}