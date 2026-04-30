import { ChevronDown, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-200 to-green-200 dark:from-teal-900 dark:to-green-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-200 to-blue-200 dark:from-teal-900 dark:to-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-48">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-100 to-green-100 dark:from-teal-900/30 dark:to-green-900/30 rounded-full border border-teal-200 dark:border-teal-800">
            <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="text-sm font-medium text-teal-700 dark:text-teal-300">Welcome to my portfolio</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-gray-900 dark:text-white">Jezreel</span>
              <span className="block bg-gradient-to-r from-teal-600 via-green-600 to-teal-600 bg-clip-text text-transparent">Gito</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Computing Graduate | Web Developer | Tech Enthusiast
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Passionate about turning ideas into reality through code and design. Skilled in Microsoft Office Suite, Accounting Systems, and Web Development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToContact}
              className="px-8 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-teal-500/50 transform hover:scale-105 transition-all duration-200"
            >
              Get in Touch
            </button>
            <a
              href="#projects"
              className="px-8 py-3 border-2 border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 rounded-lg font-semibold hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors duration-200"
            >
              View My Work
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 animate-bounce">
            <ChevronDown className="w-6 h-6 mx-auto text-teal-600 dark:text-teal-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
