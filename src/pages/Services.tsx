import { Stethoscope, Heart, Activity, Users, FileText, Thermometer, Clipboard, Shield } from 'lucide-react';
import stethoscope from '../assets/stethoscope.jpg';
interface ServicesProps {
  onNavigate: (page: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const services = [
    {
      icon: Stethoscope,
      title: 'General & Family Medicine',
      description: 'Comprehensive primary care for patients of all ages, from routine check-ups to acute illness management.',
      features: [
        'Complete physical examinations',
        'Diagnosis and treatment of common illnesses',
        'Health screenings and assessments',
        'Vaccination and immunization',
      ],
    },
    {
      icon: Activity,
      title: 'Chronic Disease Management',
      description: 'Expert care for long-term conditions requiring ongoing monitoring and personalized treatment plans.',
      features: [
        'Diabetes management and monitoring',
        'Hypertension control',
        'Asthma and respiratory conditions',
        'Arthritis and joint disorders',
      ],
    },
    {
      icon: Heart,
      title: 'Preventive Health Check-ups',
      description: 'Proactive healthcare focused on early detection and prevention of potential health issues.',
      features: [
        'Annual health assessments',
        'Cardiovascular risk evaluation',
        'Cancer screening recommendations',
        'Lifestyle counseling',
      ],
    },
    {
      icon: Users,
      title: 'Geriatric Care',
      description: 'Specialized medical attention for elderly patients with age-related health concerns.',
      features: [
        'Age-appropriate health management',
        'Mobility and fall prevention',
        'Cognitive health assessment',
        'Medication management',
      ],
    },
    {
      icon: FileText,
      title: 'Health Consultations',
      description: 'Expert medical advice and second opinions for various health concerns and treatment options.',
      features: [
        'Detailed medical consultations',
        'Treatment plan discussions',
        'Medical report interpretation',
        'Health guidance and education',
      ],
    },
    {
      icon: Thermometer,
      title: 'Acute Care',
      description: 'Prompt treatment for sudden illnesses and medical conditions requiring immediate attention.',
      features: [
        'Fever and infection management',
        'Respiratory infections',
        'Digestive system disorders',
        'Minor injuries and wounds',
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-32">
      <section className="pb-20 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6 mt-4">
              Our Services
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 leading-tight mb-6">
              Comprehensive Healthcare Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From preventive care to chronic disease management, we offer a full spectrum of medical services tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border-t-4 border-teal-600"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-900 rounded-full flex items-center justify-center mb-6">
                    <IconComponent className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
                Why Choose Our Services?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                With over three decades of medical experience, Dr. Shailendra provides healthcare services built on a foundation of expertise, compassion, and personalized attention.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Clipboard className="text-teal-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">
                      Personalized Treatment Plans
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Every patient receives a customized care plan tailored to their unique health needs and lifestyle.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Shield className="text-teal-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">
                      Evidence-Based Medicine
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Treatment approaches backed by the latest medical research and clinical guidelines.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Heart className="text-teal-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">
                      Compassionate Care
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      A patient-centered approach that prioritizes your comfort, understanding, and well-being.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={stethoscope}                 
                  alt="Medical consultation"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border-l-4 border-teal-600">
                <p className="text-sm text-gray-600 mb-1">Patient Satisfaction</p>
                <p className="text-4xl font-bold text-blue-900">98%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-900 text-white p-12 rounded-2xl shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-4">
                  Ready to Start Your Healthcare Journey?
                </h2>
                <p className="text-xl text-teal-200 leading-relaxed">
                  Schedule an appointment today and experience the difference that personalized, expert medical care can make in your life.
                </p>
              </div>
              <div className="text-center lg:text-right">
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-teal-600 text-white px-10 py-4 rounded-lg hover:bg-teal-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg inline-block"
                >
                  Book Your Appointment
                </button>
                <p className="mt-4 text-teal-200">
                  Same-day appointments available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
