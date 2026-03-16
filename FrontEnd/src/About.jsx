import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";

import payalPhoto from "./photo/payal.png";
import amitPhoto from "./photo/Amit.jpeg";
import anuragPhoto from "./photo/boy.png";
import janhaviPhoto from "./photo/woman (3).png";
import ghaziPhoto from "./photo/man (6).png";
import palashPhoto from "./photo/young-boy.png";

const About = () => {
  const teamMembers = [
    { id: 1, name: 'Miss. Payal Sobhani', role: 'Team Lead & Data Collector', photo: payalPhoto },
    { id: 2, name: 'Mr. Amit Kumar Yadav', role: 'Cloud Engineer & Marketing Expert', photo: amitPhoto },
    { id: 3, name: 'Mr. Anurag Rokade', role: 'Backend Engineer & Data Collector', photo: anuragPhoto },
    { id: 4, name: 'Miss. Janhavi Uchitkar', role: 'Backend Engineer & Figma UI', photo: janhaviPhoto },
    { id: 5, name: 'Mr. Ghazi Fuzail', role: 'UI & Social Media Manager', photo: ghaziPhoto },
    { id: 6, name: 'Mr. Palash Dhande', role: 'Front-end Engineer & Backend Support', photo: palashPhoto }
  ];

  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-rose-50 via-white to-red-50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-red-200/40 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />

        <div className="relative max-w-6xl mx-auto">
          <section className="text-center mb-10">
            <span className="inline-flex items-center rounded-full border border-red-200 bg-white px-4 py-1 text-sm font-medium text-red-700 shadow-sm">
              About BloodBuddy
            </span>

            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Built by students,
              <span className="text-red-600"> driven to save lives</span>
            </h1>

            <p className="mt-5 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
              BloodBuddy is a life-saving initiative by final year engineering students to bridge
              the critical gap between blood donors and recipients during emergencies.
            </p>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { value: '10,000+', label: 'Donor Records' },
                { value: '6', label: 'Core Team Members' },
                { value: '24/7', label: 'Emergency Purpose' },
                { value: 'Vidarbha', label: 'Regional Focus' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-red-100 bg-white/90 px-4 py-4 shadow-sm"
                >
                  <p className="text-2xl font-bold text-red-600">{item.value}</p>
                  <p className="text-sm text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10 rounded-3xl border border-red-100 bg-white/95 shadow-xl shadow-red-100/40 p-6 md:p-8">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Meet Our Team</h2>
              <span className="text-sm font-medium text-red-700 bg-red-50 border border-red-100 rounded-full px-3 py-1">
                P R Pote Patil College of Engineering, Amravati
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
              {teamMembers.map((member) => (
                <article
                  key={member.id}
                  className="group rounded-2xl border border-red-100 bg-gradient-to-b from-white to-red-50/50 p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition"
                >
                  <div className="relative mx-auto mb-3 h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-red-200 to-red-300 shadow-lg">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.nextSibling;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div
                      className="h-full w-full items-center justify-center rounded-full bg-red-200"
                      style={{ display: 'none' }}
                    >
                      <span className="text-red-700 font-bold text-lg">
                        {member.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <span className="absolute bottom-1 right-1 block h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
                  </div>

                  <h3 className="font-semibold text-gray-900 text-sm md:text-base leading-tight">{member.name}</h3>
                  <p className="mt-1 text-xs md:text-sm text-gray-600 leading-snug">{member.role}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid lg:grid-cols-2 gap-6 mb-10">
            <article className="rounded-3xl border border-red-100 bg-white p-7 shadow-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-700 text-xl">
                M
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                BloodBuddy is our final year engineering project designed to create a reliable and
                efficient platform connecting blood donors with recipients in emergency situations.
                Our goal is to eliminate critical delays in blood donation through technology-driven
                matching and communication.
              </p>
            </article>

            <article className="rounded-3xl border border-red-100 bg-white p-7 shadow-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-700 text-xl">
                W
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Why We Built This</h3>
              <p className="text-gray-600 leading-relaxed">
                Real emergency struggles inspired us to build a platform where help can be found
                faster. We believe no life should be lost due to unavailability of blood, and that
                accessible digital tools can make donation more efficient for everyone.
              </p>
            </article>
          </section>

          <section className="mb-10 rounded-3xl border border-red-100 bg-white p-7 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Powered by Technology and Data</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div>
                  <h4 className="font-semibold text-gray-900">Accurate Location Matching</h4>
                  <p className="text-gray-600 mt-1">
                    We use location-based matching to connect recipients with nearby donors for
                    quicker emergency support.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Faster Response Time</h4>
                  <p className="text-gray-600 mt-1">
                    Timely donor discovery helps reduce delay when every minute matters.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                <p className="text-sm uppercase tracking-wide text-red-700 font-semibold">Database Coverage</p>
                <p className="mt-2 text-4xl font-extrabold text-red-600">10,000+</p>
                <p className="text-gray-600 mt-1">Donor Records from Vidarbha region</p>
                <p className="mt-4 text-sm text-gray-600">
                  Built with practical, region-focused donor data for better local reliability.
                </p>
              </div>
            </div>
          </section>

          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              { title: 'Location-Based Matching', desc: 'Find the closest available donors quickly.' },
              { title: 'Quick Emergency Response', desc: 'Designed to reduce critical response time.' },
              { title: 'Verified Donor Focus', desc: 'Reliable donor information in one place.' },
              { title: 'Simple User Experience', desc: 'Easy flow for urgent usage across devices.' },
              { title: 'Regional Relevance', desc: 'Specialized for Vidarbha and nearby areas.' },
              { title: 'Privacy Conscious', desc: 'Built with responsible handling of user data.' },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:border-red-200 transition-colors"
              >
                <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </section>

          <section className="rounded-3xl bg-red-600 p-8 md:p-10 text-center text-white shadow-xl shadow-red-300/30">
            <h3 className="text-2xl md:text-3xl font-bold">Join Our Mission</h3>
            <p className="mt-3 text-red-100 max-w-2xl mx-auto">
              Together, we can build a stronger network of life-savers so no one struggles to
              find blood during emergencies.
            </p>
            <a
              href="/become-donor"
              className="mt-6 inline-flex items-center rounded-full bg-white px-7 py-3 font-semibold text-red-600 hover:bg-red-50 transition"
            >
              Become a Blood Buddy Today
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default About;