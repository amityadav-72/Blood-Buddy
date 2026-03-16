import React from 'react';
import Navbar from "./Navbar";

import payalPhoto from "./photo/payal.png";
import amitPhoto from "./photo/man (5).png";
import anuragPhoto from "./photo/boy.png";
import janhaviPhoto from "./photo/woman (3).png";
import ghaziPhoto from "./photo/man (6).png";
import palashPhoto from "./photo/young-boy.png";

const About = () => {
 
  const teamMembers = [
    { id: 1, name: 'Miss. Payal Sobhani', role: 'Team Lead', photo: payalPhoto },
    { id: 2, name: 'Mr. Amit Kumar Yadav', role: 'Full-Stack Developer', photo: amitPhoto },
    { id: 3, name: 'Mr. Anurag Rokade', role: 'Backend Engineer', photo: anuragPhoto },
    { id: 4, name: 'Miss. Janhavi Uchitkar', role: 'Database Administrator', photo: janhaviPhoto },
    { id: 5, name: 'Mr. Ghazi Fuzail', role: 'UI & UX Designer', photo: ghaziPhoto },
    { id: 6, name: 'Mr. Palash Dhande', role: 'Front-end Engineer', photo: palashPhoto }
  ];

  return (<>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8" style={{marginTop: '30px'}}>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-red-700 mb-4">About Blood Buddy</h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A life-saving initiative by final year engineering students to bridge the gap between blood donors and recipients
          </p>
        </div>

       
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-red-100">
          <h2 className="text-2xl font-semibold text-red-800 mb-8 text-center">
            Meet Our Team
          </h2>
          
         
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="relative inline-block mb-3">
                 
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-red-200 to-red-300 border-4 border-white shadow-lg mx-auto overflow-hidden">
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        
                        e.target.style.display = 'none';
                        const fallback = e.target.nextSibling;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                   
                    <div 
                      className="w-full h-full flex items-center justify-center bg-red-200 rounded-full"
                      style={{display: 'none'}}
                    >
                      <span className="text-red-600 font-bold text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{member.name}</h3>
                <p className="text-xs text-gray-600 leading-tight">{member.role}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-4">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <p className="text-lg text-gray-700 text-center">
              We are final year Computer Science Engineering students from P R Pote Patil College of Engineering, Amravati, 
              passionate about using technology to solve real-world problems.
            </p>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>

       
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-red-600 font-bold">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-red-800">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Blood Buddy is our final year engineering project designed to create a reliable 
              and efficient platform connecting blood donors with recipients in emergency situations. 
              We aim to eliminate the critical time gap in blood donation processes through 
              technology-driven solutions.
            </p>
          </div>

          <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-red-600 font-bold">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-red-800">Why We're Doing This</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Witnessing the challenges in finding timely blood donors during emergencies 
              inspired us to create this platform. We believe that no life should be lost 
              due to unavailability of blood, and technology can play a crucial role in 
              making blood donation more accessible and efficient.
            </p>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-red-100">
          <h2 className="text-2xl font-semibold text-red-800 mb-8 text-center">
            Powered by Technology & Data
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                Accurate Location Matching
              </h4>
              <p className="text-gray-600 mb-6">
                Our platform uses precise location data to connect donors and recipients 
                based on proximity, ensuring faster response times during critical situations.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                Faster Response Times
              </h4>
              <p className="text-gray-600">
                Instant alerts to nearby donors when someone in their area needs blood, 
                creating an efficient emergency response system.
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h4 className="text-lg font-semibold text-red-800 mb-4 text-center">
                Extensive Vidarbha Database
              </h4>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-red-600">10,000+</span>
                <p className="text-gray-600">Donor Records</p>
              </div>
              <p className="text-gray-700 text-sm text-center">
                We've built our platform using thousands of donor records from the 
                Vidarbha region, ensuring comprehensive coverage and reliable 
                donor availability across multiple cities and towns.
              </p>
            </div>
          </div>
        </div>

    
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { icon: '📍', title: 'Location-based Matching', desc: 'Find the closest available donors' },
            { icon: '⚡', title: 'Quick Response', desc: 'Reduce emergency response time' },
            { icon: '🛡️', title: 'Verified Donors', desc: 'Authenticated and reliable donors' },
            { icon: '📱', title: 'User-friendly', desc: 'Simple and intuitive interface' },
            { icon: '🌐', title: 'Regional Focus', desc: 'Specialized for Vidarbha region' },
            { icon: '🔒', title: 'Privacy First', desc: 'Secure and confidential data' }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-red-200 transition-colors">
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h4 className="font-semibold text-gray-800 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

    
        <div className="text-center bg-red-600 text-white rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Together, we can create a network of life-savers and ensure that no one 
            has to struggle to find blood during emergencies.
          </p>
          <a
            href="/become-donor"
            className="inline-block bg-white text-red-600 font-semibold px-8 py-3 rounded-full hover:bg-red-50 transition-colors"
          >
            Become a Blood Buddy Today
          </a>
        </div>
      </div>
    </div></>
  );
};

export default About;