import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Calendar, Building2 } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  institution: string;
  start_date: string;
  end_date: string | null;
  description: string;
  created_at: string;
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY
      );

      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('start_date', { ascending: false });

      if (!error && data) {
        setExperiences(data);
      }
      setLoading(false);
    };

    fetchExperiences();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Experience</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">Educational background and professional development</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline Line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 top-16 w-1 h-12 bg-gradient-to-b from-teal-500 to-transparent md:left-1/2"></div>
              )}

              {/* Timeline Dot */}
              <div className="absolute left-0 top-0 w-12 h-12 bg-white dark:bg-gray-950 flex items-center justify-center border-2 border-teal-500 rounded-full md:left-1/2 md:transform md:-translate-x-1/2">
                <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-green-500 rounded-full"></div>
              </div>

              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:pr-12'}`}>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{exp.title}</h3>

                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                      <Building2 className="w-4 h-4" />
                      <span className="font-semibold">{exp.institution}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
