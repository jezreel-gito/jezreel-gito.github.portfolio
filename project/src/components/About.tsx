import { BookOpen, Target, Lightbulb } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">Get to know more about my journey and passion</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            I'm Jezreel Gito, a recent Computing graduate with a strong foundation in modern technology and business solutions. My journey in computing has equipped me with versatile skills spanning from productivity tools to custom software development.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            During my diploma, I mastered the Microsoft Office Suite—Word, Excel, PowerPoint, Publisher, and Access—and developed expertise in computerized accounting systems. These skills have taught me the importance of precision, organization, and attention to detail.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Beyond traditional office tools, I've ventured into web development, learning HTML, CSS, and JavaScript fundamentals. What excites me most is the intersection of technology and problem-solving—creating solutions that make work easier and more efficient for others.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">2025</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Year Graduated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">10+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Skills Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projects Built</div>
            </div>
          </div>
        </div>

        {/* Right Cards */}
        <div className="space-y-6">
          {/* Card 1 */}
          <div className="p-6 bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-xl border border-teal-200 dark:border-teal-800 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-teal-600 rounded-lg flex-shrink-0">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Learning Journey</h3>
                <p className="text-gray-700 dark:text-gray-300">Comprehensive computing diploma covering business tools, accounting systems, and web development fundamentals.</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-600 rounded-lg flex-shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">My Goal</h3>
                <p className="text-gray-700 dark:text-gray-300">Create impactful solutions that solve real-world problems and help businesses and individuals work more efficiently.</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-600 rounded-lg flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Passion</h3>
                <p className="text-gray-700 dark:text-gray-300">Continuously learning and exploring new technologies, always excited about the next challenge and opportunity to grow.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
