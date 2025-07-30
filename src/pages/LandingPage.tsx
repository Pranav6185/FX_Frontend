import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Award, TrendingUp, Shield, Clock, Target, CheckCircle, Mail, Phone, MapPin, Calendar, Globe, ExternalLink, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import ImageSlider from "../components/ImageSlider";
import { FaTelegramPlane , FaWhatsapp } from "react-icons/fa";
import CountUp from 'react-countup';
import StatsSection from '@/components/StatsSection';


const LandingPage = () => {
  
  const rating=4.5;
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      alt: "Trading Workshop",
      title: "Live Trading Workshop"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      alt: "Student Learning",
      title: "Interactive Learning Sessions"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      alt: "Expert Instructor",
      title: "Expert Instructors"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
      alt: "Online Class",
      title: "Online Classes"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      alt: "Market Analysis",
      title: "Market Analysis"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop",
      alt: "Success Stories",
      title: "Success Stories"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
  
  
      <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: 'url("/Hero.png")',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Glassmorphism Content Box */}
      <div className="relative z-10 mx-4 sm:ml-10 p-6 sm:p-10 max-w-full sm:max-w-xl rounded-2xl backdrop-blur-sm bg-white/20 border border-white/30 shadow-lg animate-fade-in">
        
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight animate-slide-in">
          Master the
          <span className="text-primary-600 block">Financial Markets</span>
        </h1>

        {/* Paragraph */}
        <p className="text-base sm:text-lg md:text-xl text-white/90 mt-4 sm:mt-6 leading-relaxed animate-fade-in">
          Join thousands of successful traders who've transformed their financial future with our comprehensive trading education platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 animate-fade-in">
          <a href='https://t.ly/5hYVf' className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto group bg-gradient-to-r from-[#1A2980] via-[#26D0CE] to-[#1A2980] 
  bg-[length:200%_auto] hover:bg-[position:right_center] 
  transition-all duration-500 text-white font-semibold 
  uppercase px-10 py-4 rounded-lg shadow-md">
              Start Learning Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <Link to="#features" className="w-full sm:w-auto">
          <Button
  variant="outline"
  size="lg"
  className="w-full sm:w-auto text-white border-white 
    bg-gradient-to-r from-[#DC2424] via-[#4A569D] to-[#DC2424]
    bg-[length:200%_auto] hover:bg-[position:right_center]
    transition-[background-position] duration-500 ease-in-out
    uppercase font-semibold text-sm
    px-6 py-2 rounded-md "
>
  Explore Features
</Button>

          </Link>
        </div>

        {/* Social Proof */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mt-6 sm:mt-8 space-y-4 sm:space-y-0 animate-fade-in">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-primary-100 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <span className="text-sm text-white/90">5,000+ Students</span>
          </div>
          

<div className="flex items-center space-x-1">
  {[1, 2, 3, 4, 5].map((i) => {
    if (i <= Math.floor(rating)) {
      // Full star
      return <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />;
    } else if (i === Math.ceil(rating) && rating % 1 >= 0.25) {
      // Half star
      return (
        <div key={i} className="w-4 h-4 relative flex items-center justify-center overflow-hidden">
          <Star className="w-4 h-4 text-gray-400 fill-gray-400 absolute" />
          <Star
            className="w-4 h-4 text-yellow-400 fill-yellow-400 absolute"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        </div>
      );
    } else {
      // Empty star
      return <Star key={i} className="w-4 h-4 text-gray-400 fill-gray-400" />;
    }
  })}
  <span className="text-sm text-white/90 ml-1">{rating}/5 Rating</span>
</div>

        </div>

      </div>
      
      
    </section>

    {/* <div className="relative py-12 px-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
  <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Trusted Tools</h2>
  
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-items-center">
    {[
      '/icons/tradingview.svg',
      '/icons/metaTrader.svg',
      '/icons/binance.svg',
      '/icons/coinbase.svg',
      '/icons/kucoin.svg',
      '/icons/ninjatrader.svg',
      '/icons/kraken.svg',
      '/icons/robinhood.svg'
    ].map((icon, i) => (
      <div key={i} className="w-20 h-20 p-3 bg-white rounded-full shadow-md animate-float hover:scale-110 transition duration-300">
        <img src={icon} alt="icon" className="w-full h-full object-contain" />
      </div>
    ))}
  </div>
</div> */}




    



      {/* Batches Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Live Batches
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Learn online or offline – Choose your preferred date and language
      </p>
    </div>

    <div className="flex flex-col lg:flex-row gap-12 items-start">
      {/* Left Side Image */}
      {/* <div className="group aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_8px_40px_rgba(22,105,122,0.25)] transition-shadow duration-500">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/90krrETzzf4"
          title="FxStreampro Video 1"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div> */}
      {/* <div className="w-full lg:w-1/2">
        <img
          src="/i.jpg"
          alt="Trading Illustration"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div> */}

      {/* Right Side Table-Style Batches */}
      <div className="w-full  bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
  {/* Table layout for md+ screens */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full text-lg text-left table-auto">
      <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
        <tr>
          <th className="px-5 py-4">Mode</th>
          <th className="px-5 py-4">Date</th>
          <th className="px-5 py-4">Language / Time</th>
          <th className="px-5 py-4 text-right"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 text-gray-700">
        {[
          {
            mode: "Online",
            date: "1 August",
            time: "Hindi | 6:00 PM – 9:00 PM IST",
            link: "https://docs.google.com/forms/d/e/1FAIpQLSfxVYIstqh-TuQKcE4JUYJm8eBqTXLgftN1fQYN8MNRuqlN3w/viewform?usp=header",
          },
          {
            mode: "Offline",
            date: "1 August",
            time: "Hindi | 11:00 AM – 1:00 PM IST",
            link: "https://docs.google.com/forms/d/e/1FAIpQLSfxVYIstqh-TuQKcE4JUYJm8eBqTXLgftN1fQYN8MNRuqlN3w/viewform?usp=header",
          },
          {
            mode: "Offline",
            date: "1 August",
            time: "Marathi | 11:00 AM – 1:00 PM IST",
            link: "https://docs.google.com/forms/d/e/1FAIpQLSfxVYIstqh-TuQKcE4JUYJm8eBqTXLgftN1fQYN8MNRuqlN3w/viewform?usp=header",
          },
        ].map((batch, i) => (
          <tr key={i} className="hover:bg-gray-50 transition">
            <td className="px-5 py-5">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  batch.mode === "Online"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {batch.mode}
              </span>
            </td>
            <td className="px-5 py-5 font-medium">{batch.date}</td>
            <td className="px-5 py-5">{batch.time}</td>
            <td className="px-5 py-5 text-right">
              <a
                href={batch.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-bold px-5 py-2.5 rounded-full transition whitespace-nowrap"
              >
                Register Now
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Card layout for small screens */}
  <div className="block md:hidden divide-y divide-gray-200">
    {[
      {
        mode: "Online",
        date: "21 August",
        time: "Hindi | 9:00 PM – 10:00 PM IST",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSfxVYIstqh-TuQKcE4JUYJm8eBqTXLgftN1fQYN8MNRuqlN3w/viewform?usp=header",
      },
      {
        mode: "Offline",
        date: "21 August",
        time: "Hindi | 11:00 AM – 1:00 PM IST",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSfxVYIstqh-TuQKcE4JUYJm8eBqTXLgftN1fQYN8MNRuqlN3w/viewform?usp=header",
      },
      {
        mode: "Offline",
        date: "21 August",
        time: "Marathi | 11:00 AM – 1:00 PM IST",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSfxVYIstqh-TuQKcE4JUYJm8eBqTXLgftN1fQYN8MNRuqlN3w/viewform?usp=header",
      },
    ].map((batch, i) => (
      <div key={i} className="p-4">
        {/* Mode badge */}
        <div className="mb-2">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              batch.mode === "Online"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {batch.mode}
          </span>
        </div>

        {/* Date and time info */}
        <p className="text-sm text-gray-800 font-medium mb-1">
          Date: <span className="font-normal">{batch.date}</span>
        </p>
        <p className="text-sm text-gray-800 mb-4">
          Time: <span className="font-normal">{batch.time}</span>
        </p>

        {/* Button at the bottom */}
        <div>
          <a
            href={batch.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-bold px-5 py-2.5 rounded-full transition w-full block text-center"
          >
            Register Now
          </a>
        </div>
      </div>
    ))}
  </div>
</div>


        {/* 🎥 Recorded Lectures Button */}
                  <div className="relative bg-gray-50 border-t border-gray-200 py-6 px-6 flex flex-col-reverse md:flex-row md:justify-end md:items-center gap-4 md:gap-0">
                        {/* Centered description with animated 👉 */}
                        <div className="text-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                          <p className="text-gray-800 font-semibold text-lg flex items-center justify-center gap-2">
                            Access all recorded lectures
                            <span className="text-2xl animate-wiggle hidden md:inline">👉</span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Click the button to view them on Rigi.
                          </p>
                        </div>

                        {/* Right-aligned button */}
                        <a
                          href="https://rpy.club/courses/tT7xYAdJD2"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg hover:from-red-500 hover:to-orange-500 hover:scale-105 transition-all duration-300 self-center md:self-auto"
                        >
                          View Recorded Lectures
                        </a>
                      </div>



      </div>
    </div>
  </div>
</section>




          {/* About Section */}
          <section
  id="about"
  className="relative py-20 bg-gradient-to-br from-gray-200 via-gray-400 to-gray-700 overflow-hidden"
>
  {/* 🔹 Faint Radial Pattern Background */}
  <div
    className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(209,213,219,0.3)_0%,transparent_60%),radial-gradient(circle_at_80%_80%,rgba(156,163,175,0.3)_0%,transparent_60%)] pointer-events-none z-0"
  />

  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-gray-900">
    <h2 className="text-4xl font-extrabold text-center mb-12">
      Smart Money & Smart Volume Concepts
    </h2>

    {/* 🔹 Concept Cards */}
    <div className="grid md:grid-cols-2 gap-12 mb-10">
      {/* SMC */}
      <div className="bg-gray-100 p-6 rounded-xl border border-gray-300 shadow-md">
        <h3 className="text-2xl font-bold text-[#1d3557] mb-4">Smart Money Concept (SMC)</h3>
        <p className="text-sm leading-relaxed mb-4 text-gray-800">
          The Smart Money Concept is centered around analyzing the actions of large financial
          institutions (banks, hedge funds) that influence market direction. It helps retail
          traders understand how these entities operate and how to align trades with their activity
          rather than against it.
        </p>
        <h4 className="text-lg font-semibold mb-2 text-gray-900">What you'll learn:</h4>
        <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
          <li>Understanding market structure: BOS, CHoCH, and internal/external structure</li>
          <li>Identifying and trading from order blocks</li>
          <li>Liquidity sweeps and false breakouts</li>
          <li>Imbalance & mitigation concepts</li>
          <li>SMC-based entry models with tight stop losses</li>
        </ul>
      </div>

      {/* SVC */}
      <div className="bg-gray-100 p-6 rounded-xl border border-gray-300 shadow-md">
        <h3 className="text-2xl font-bold text-[#1d3557] mb-4">Smart Volume Concept (SVC)</h3>
        <p className="text-sm leading-relaxed mb-4 text-gray-800">
          Smart Volume Concept focuses on volume as the fuel behind price action. It teaches traders
          how to interpret volume to confirm trends, detect accumulation/distribution, and catch
          major moves before they happen.
        </p>
        <h4 className="text-lg font-semibold mb-2 text-gray-900">What you'll learn:</h4>
        <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
          <li>Reading volume bars and clusters correctly</li>
          <li>Spotting absorption and exhaustion patterns</li>
          <li>Volume divergence with price action</li>
          <li>Understanding high volume nodes (HVN) & low volume nodes (LVN)</li>
          <li>Combining SVC with market structure for confluence entries</li>
        </ul>
      </div>
    </div>

    <ImageSlider />

    {/* 🔹 Comparison Table */}
    <div className="mt-16 overflow-x-auto max-w-full">
    <div className="bg-gray-100 p-6 rounded-xl border border-gray-300 shadow-md">
        <h3 className="text-2xl font-bold text-[#1d3557] mb-4 text-center">SMC vs SVC</h3>
        <table className="w-full text-sm text-gray-800 border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-300">
              <th className="p-3">Aspect</th>
              <th className="p-3">Smart Money Concept (SMC)</th>
              <th className="p-3">Smart Volume Concept (SVC)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="p-3">Core Focus</td>
              <td className="p-3">Institutional price manipulation & structure</td>
              <td className="p-3">Volume confirmation of price moves</td>
            </tr>
            <tr>
              <td className="p-3">Tools Used</td>
              <td className="p-3">Order blocks, BOS, liquidity zones</td>
              <td className="p-3">Volume profile, divergence, delta</td>
            </tr>
            <tr>
              <td className="p-3">Best For</td>
              <td className="p-3">Price action and structure traders</td>
              <td className="p-3">Volume-based confirmation and scalpers</td>
            </tr>
            <tr>
              <td className="p-3">Learning Curve</td>
              <td className="p-3">Medium to advanced</td>
              <td className="p-3">Beginner to intermediate</td>
            </tr>
            <tr>
              <td className="p-3">Risk Management</td>
              <td className="p-3">Based on structural invalidation</td>
              <td className="p-3">Based on volume absorption/shift</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>







      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-800 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Why Choose FxStreampro?
      </h2>
      <p className="text-xl text-slate-300 max-w-3xl mx-auto">
        Our comprehensive platform offers everything you need to succeed in the financial markets
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          icon: Users,
          title: 'Expert Instructors',
          description: 'Learn from certified professionals with years of market experience'
        },
        {
          icon: Award,
          title: 'Proven Curriculum',
          description: 'Industry-recognized courses designed for real-world application'
        },
        {
          icon: TrendingUp,
          title: 'Live Trading Sessions',
          description: 'Practice with real market data in our simulated environment'
        },
        {
          icon: Shield,
          title: 'Risk Management',
          description: 'Master the art of protecting your capital while maximizing returns'
        },
        {
          icon: Clock,
          title: 'Flexible Learning',
          description: 'Study at your own pace with 24/7 access to course materials'
        },
        {
          icon: Target,
          title: 'Results-Driven',
          description: 'Track your progress with detailed analytics and performance metrics'
        }
      ].map((feature, index) => (
        <Card
  key={index}
  className="bg-slate-700 text-white border border-slate-600 hover:shadow-[0_6px_30px_rgba(34,197,94,0.6)] transition-shadow duration-300 transform hover:-translate-y-1 rounded-xl"
>
  <CardContent className="p-8 text-center">
    <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
      <feature.icon className="h-8 w-8 text-primary-500" />
    </div>
    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
    <p className="text-slate-300">{feature.description}</p>
  </CardContent>
</Card>



      ))}
    </div>
  </div>
</section>

      {/* YouTube Video Section */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white "
      
      >
      
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Learn from the Experts
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Watch our latest trading insights and educational content
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
      {/* Video 1 */}
      <div className="group aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_8px_40px_rgba(22,105,122,0.25)] transition-shadow duration-500">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/90krrETzzf4"
          title="FxStreampro Video 1"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video 2 */}
      <div className="group aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_8px_40px_rgba(22,105,122,0.25)] transition-shadow duration-500">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/i26T2uaCthE?si=9El6YFMH7TP2FpUL"
          title="FxStreampro Video 2"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video 3 */}
      <div className="group aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_8px_40px_rgba(22,105,122,0.25)] transition-shadow duration-500">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/VO60jC630Ko?si=R8qtomm0bt9mhyRn"
          title="FxStreampro Video 3"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video 4 */}
      <div className="group aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_8px_40px_rgba(22,105,122,0.25)] transition-shadow duration-500">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/YPk61QGbOBo?si=5dk_zQIZEi9Jj6-b"
          title="FxStreampro Video 4"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>

    <div className="text-center mt-12">
      <a
        href="https://www.youtube.com/@fxstreampro"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
      >
        <Youtube className="h-5 w-5" />
        <span>Visit our YouTube Channel</span>
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  </div>
</section>



      {/* CTA Section */}
      {/* <section className="py-16 bg-gray-900 text-white text-center">
      <h2 className="text-4xl font-bold mb-8">Our Impact</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
        <div>
          <h3 className="text-5xl font-bold text-yellow-400">
            <CountUp end={5000} duration={3} />
            +
          </h3>
          <p className="mt-2 text-lg">Students Trained</p>
        </div>
        <div>
          <h3 className="text-5xl font-bold text-green-400">
            <CountUp end={120} duration={3} />
          </h3>
          <p className="mt-2 text-lg">Batches Completed</p>
        </div>
        <div>
          <h3 className="text-5xl font-bold text-blue-400">
            <CountUp end={98} duration={3} suffix="%" />
          </h3>
          <p className="mt-2 text-lg">Success Rate</p>
        </div>
      </div>
    </section> */}
    <StatsSection></StatsSection>
  

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-800  from-indigo-50 to-white border-t border-gray-200"
      
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-gray-100 font-bold  mb-4">
              Our Learning Environment
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Take a look at our state-of-the-art facilities and learning atmosphere
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image) => (
              <div key={image.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover-lift">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Broker and socail media link */}

{/* // Broker & Social Media Section */}
<section
  className="relative min-h-screen bg-gradient-to-br from-[#f9f9f9] via-[#e6f0f3] to-[#d0e4f2] bg-cover bg-center bg-no-repeat flex items-center justify-center"
>
  {/* Optional blur layer (light) */}
  <div
    className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm z-0"
  ></div>

  {/* Glassmorphism Content Box */}
  <div className="relative z-10 mx-4 sm:ml-10 p-6 sm:p-10 max-w-5xl rounded-2xl backdrop-blur-md bg-white/60 border border-white/40 shadow-lg text-center">
    <h2 className="text-4xl font-extrabold text-[#1d3557] mb-4 tracking-tight">
      Our Trusted Broker Partners
    </h2>
    <p className="text-[#0d3e61] text-lg mb-12 max-w-2xl mx-auto">
      We collaborate with globally recognized brokers to ensure seamless trading experiences for our community.
    </p>

    <div className="flex flex-wrap justify-center gap-10 items-center mb-16">
      {[
        {
          name: 'exeness',
          url: 'https://one.exnesstrack.org/a/hml0dmvhfy',
          logo: '/exeness1.png'
        },
        {
          name: 'Pu Prime',
          url: 'https://www.puprime.partners/forex-trading-account/?affid=60771',
          logo: '/pu_prime.png'
        },
        {
          name: 'Star Trader',
          url: 'https://www.startrader.com/live-account/?affid=NzQ1MTM0Mw==&ibpRebateCode=NzQ1MTM0M1NUMTAwMTM=',
          logo: '/logo1.jpg'
        }
      ].map((broker, index) => (
        <a
          key={index}
          href={broker.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 border border-gray-200 w-48 flex items-center justify-center"
        >
          <img src={broker.logo} alt={broker.name} className="h-12 object-contain" />
        </a>
      ))}
    </div>

    <h3 className="text-2xl font-bold text-[#1d3557] mb-4">Join Our Trading Community</h3>
    <p className="text-[#0d3e61] text-md mb-8">Stay connected and never miss a market move.</p>

    <div className="flex flex-wrap justify-center gap-6">
      <a
        href="https://t.ly/5hYVf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-md"
      >
        <FaWhatsapp className="h-5 w-5" /> <span>WhatsApp</span>
      </a>
      <a
        href="https://t.me/+w2_xVAHPQ005MmQ1"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-md"
      >
        <FaTelegramPlane className="h-5 w-5" /> <span>Telegram</span>
      </a>
      <a
        href="https://instagram.com/fxstreampro"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full shadow-md"
      >
        <Instagram className="h-5 w-5" /> <span>Instagram</span>
      </a>
    </div>
  </div>
</section>





      {/* Testimonials Section */}
      <section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        What Our Students Say
      </h2>
      <p className="text-xl text-gray-600">Real stories from real traders</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          name: 'Pranav Suryavanshi',
          role: 'Day Trader',
          content:
            'FxStreampro transformed my trading completely. The risk management techniques alone have saved me thousands.',
          rating: 5
        },
        {
          name: 'Ruturaj Mahekar',
          role: 'Investment Consultant',
          content:
            'The comprehensive curriculum and expert instructors make this the best trading education platform available.',
          rating: 5
        },
        {
          name: 'Sanket Natekar',
          role: 'Portfolio Manager',
          content:
            'I went from losing money to consistent profitability in just 6 months. Highly recommended!',
          rating: 5
        }
      ].map((testimonial, index) => {
        const bgColors = [
          'bg-[#f0fdf4]', // light green
          'bg-[#f0f9ff]', // light blue
          'bg-[#fdf2f8]'  // light pink
        ];
        return (
          <Card
            key={index}
            className={`${bgColors[index % bgColors.length]} border border-slate-200 transition-shadow duration-300 hover:shadow-[0_10px_35px_rgba(22,105,122,0.35)]`}
          >
            <CardContent className="p-8">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary-500 text-primary-500"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-xl text-gray-300 mb-8">
                Ready to start your trading journey? Contact us today and take the first step towards financial freedom.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-300">ajayfxstream@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-300">+91 9226722460</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-gray-300">Kolhapur, Pune, Maharashtra</div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com/fxstreampro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  
                  <a
                    href="https://instagram.com/fxstreampro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://youtube.com/@fxstreampro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <Youtube className="h-6 w-6" />
                  </a>
                 

                  <a
                    href="https://t.me/+w2_xVAHPQ005MmQ1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <FaTelegramPlane className="h-6 w-6 text-white" />
                  </a>

                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <Button className="w-full" size="lg">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
