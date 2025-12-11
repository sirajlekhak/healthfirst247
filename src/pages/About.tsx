import { GraduationCap, Heart, Award, Star, Clock, Users, CheckCircle, Shield, ArrowRight, MapPin, BookOpen, Stethoscope, Brain } from 'lucide-react';
import { useState } from 'react';
import doctorprofilepic from '../assets/doctorprofilepic.jpg';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const [hoveredInstitution, setHoveredInstitution] = useState<number | null>(null);

  const institutions = [
    { 
      name: 'CMCH-Vellore', 
      fullName: 'Christian Medical College & Hospital, Vellore',
      description: 'One of India\'s premier medical institutions with over 100 years of excellence',
     
    },
    { 
      name: 'KEM-Pune', 
      fullName: 'King Edward Memorial Hospital, Pune',
      description: 'Renowned teaching hospital with advanced medical facilities',
     
    },
    { 
      name: 'Tata Main Hospital', 
      fullName: 'Tata Main Hospital, Jamshedpur',
      description: 'Corporate hospital providing comprehensive industrial healthcare',
      
    },
    { 
      name: 'MGMMCH', 
      fullName: 'Mahatma Gandhi Memorial Medical College & Hospital',
      description: 'Leading medical institution in Western India',
      
    },
    { 
      name: 'BITS-Pilani', 
      fullName: 'Birla Institute of Technology & Science, Pilani',
      description: 'University healthcare services for academic community',
     
    },
    { 
      name: 'CAPFS', 
      fullName: 'Central Armed Police Forces',
      description: 'Specialized healthcare for armed forces personnel',
     
    },
    { 
      name: 'MTMH', 
      fullName: 'Meharbai Tertiary Medical Hospital (ICS)',
      description: 'Advanced tertiary care medical facility',
     
    },
  ];

  const philosophyPoints = [
    {
      icon: Heart,
      title: "Patient-First Approach",
      description: "Every medical decision centers around what's best for the patient's unique situation and needs",
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: Brain,
      title: "Evidence-Based Practice",
      description: "Combining 32+ years of clinical experience with current medical research and guidelines",
      color: "from-blue-600 to-indigo-700"
    },
    {
      icon: Stethoscope,
      title: "Preventive Care Focus",
      description: "Emphasizing early detection and lifestyle interventions to prevent health issues before they develop",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Staying updated with medical advancements through ongoing education and professional development",
      color: "from-purple-600 to-violet-700"
    }
  ];

  const careerHighlights = [
    {
      icon: Clock,
      title: "32+ Years",
      description: "Continuous clinical practice",
      detail: "Three decades of serving patients"
    },
    {
      icon: Users,
      title: "10,000+ Patients",
      description: "Across diverse demographics",
      detail: "From children to elderly care"
    },
    {
      icon: GraduationCap,
      title: "7 Institutions",
      description: "Elite medical training",
      detail: "India's premier hospitals"
    },
    {
      icon: CheckCircle,
      title: "Holistic Approach",
      description: "Comprehensive healthcare",
      detail: "Treating mind, body & spirit"
    }
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello Dr. Shailendra, I'd like to schedule a consultation.");
    window.open(`https://wa.me/917908224288?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 pt-24 pb-20 mt-16">
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
                Distinguished Medical Career Since 1992
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                The Journey of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-600">Medical Excellence</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                With a career spanning <span className="font-semibold text-teal-700">over 32 years</span> across India's most prestigious medical institutions, Dr. Shailendra brings unparalleled clinical wisdom and compassionate care to Matigara.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                  <p className="text-2xl font-bold text-blue-900">32+</p>
                  <p className="text-xs text-gray-600">Years Experience</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                  <p className="text-2xl font-bold text-blue-900">7</p>
                  <p className="text-xs text-gray-600">Prestigious Institutions</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                  <p className="text-2xl font-bold text-blue-900">10K+</p>
                  <p className="text-xs text-gray-600">Patients Treated</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                  <p className="text-2xl font-bold text-blue-900">100%</p>
                  <p className="text-xs text-gray-600">Patient-First</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="group relative bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg shadow-lg flex items-center justify-center"
                >
                  <Stethoscope className="w-5 h-5 mr-3" />
                  Book Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('blog')}
                  className="group bg-white text-gray-800 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold text-lg border-2 border-gray-200 hover:border-teal-300 flex items-center justify-center"
                >
                  Read Health Insights
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
                  className="w-full h-[550px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-md">
                    <h3 className="text-2xl font-bold text-gray-900">Dr. Shailendra</h3>
                    <p className="text-teal-700 text-lg font-medium">Composite Medical Consultant</p>
                    <div className="flex items-center text-gray-600 mt-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Serving Matigara & Surrounding Regions</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-700 to-teal-600 text-white p-6 rounded-2xl shadow-2xl">
                <div className="text-center">
                  <p className="text-4xl font-bold">1992</p>
                  <p className="text-sm font-medium opacity-90">Career Start</p>
                  <p className="text-xs mt-1 opacity-80">Medical Practice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Philosophy Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Guiding Principles
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-600">HealthFirst247</span> Philosophy
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Core values that define three decades of patient-centered medical practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {philosophyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-white to-blue-50 p-6 md:p-8 rounded-2xl border border-gray-100 hover:border-teal-200 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${point.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">{point.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{point.description}</p>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-transparent group-hover:via-teal-300 to-transparent transition-all duration-300"></div>
                </div>
              );
            })}
          </div>

          {/* Doctor's Quote */}
          <div className="mt-16 bg-gradient-to-br from-blue-900 to-teal-900 text-white p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">My Commitment to Patients</h3>
                  <p className="text-blue-200">A promise built over 32 years of practice</p>
                </div>
              </div>
              <blockquote className="text-lg md:text-xl leading-relaxed italic text-center mb-6">
                "Medicine is not just a profession, it's a sacred trust. Every patient who walks through my door receives the same level of care, attention, and expertise that I would expect for my own family. Through careful listening, accurate diagnosis, and personalized treatment, we work together toward your optimal health."
              </blockquote>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">DS</span>
                </div>
                <div>
                  <p className="font-bold text-lg">Dr. Shailendra</p>
                  <p className="text-teal-300 text-sm">Composite Medical Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training & Institutions Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <GraduationCap className="w-4 h-4 mr-2" />
              Distinguished Training
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Elite Medical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-600">Education & Experience</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Trained and served at India's most prestigious medical institutions, building a foundation of excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {institutions.map((institution, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  hoveredInstitution === index ? 'ring-2 ring-teal-500' : ''
                }`}
                onMouseEnter={() => setHoveredInstitution(index)}
                onMouseLeave={() => setHoveredInstitution(null)}
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-teal-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <GraduationCap className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h3 className="text-xl font-bold text-blue-900 mr-3">{institution.name}</h3>
                      
                    </div>
                    <p className="text-sm text-gray-600">{institution.fullName}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{institution.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>Advanced medical training</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Career Highlights */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {careerHighlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div key={index} className="text-center p-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-teal-600" size={28} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{highlight.title}</p>
                    <p className="text-sm text-gray-600">{highlight.description}</p>
                    <p className="text-xs text-teal-600 mt-1">{highlight.detail}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Journey Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="text-teal-600 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">Over three decades of continuous clinical practice</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-teal-600 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">Extensive experience in both urban and industrial healthcare settings</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="text-teal-600 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">Specialized training in preventive medicine and chronic disease management</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-teal-600 w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">Commitment to evidence-based practice and continuous medical education</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-blue-900 to-teal-900 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '200px'
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <Star className="w-4 h-4 mr-2" fill="white" />
            Trusted Medical Care in Matigara
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Experience the Difference <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Experience Makes</span>
          </h2>
          
          <p className="text-lg md:text-xl text-blue-200 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">
            Benefit from 32+ years of medical wisdom, elite training, and compassionate care tailored to your unique health needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="group bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 md:px-10 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg flex items-center justify-center"
            >
              <Stethoscope className="w-5 h-5 mr-3" />
              Schedule Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="group bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-8 md:px-10 py-4 rounded-xl transition-all duration-300 font-semibold text-lg border-2 border-white/30 flex items-center justify-center"
            >
              Quick WhatsApp Inquiry
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
          
          <p className="text-blue-300 mt-8 text-sm">
            Serving Matigara with compassionate, expert healthcare since 1992
          </p>
        </div>
      </section>
    </div>
  );
}