import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface Skill {
  id: string;
  name: string;
  category: 'Office' | 'Accounting' | 'Coding';
  proficiency_level: number;
}

const categoryColors = {
  Office: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-400', bar: 'bg-blue-500' },
  Accounting: { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800', text: 'text-green-700 dark:text-green-400', bar: 'bg-green-500' },
  Coding: { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800', text: 'text-purple-700 dark:text-purple-400', bar: 'bg-purple-500' },
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY
      );

      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });

      if (!error && data) {
        setSkills(data);
      }
      setLoading(false);
    };

    fetchSkills();
  }, []);

  const categories = ['Office', 'Accounting', 'Coding'] as const;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Skills & Expertise</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">Technical competencies developed through rigorous training</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      ) : (
        <div className="space-y-12">
          {categories.map((category) => {
            const categorySkills = skills.filter(s => s.category === category);
            const colors = categoryColors[category];

            return (
              <div key={category}>
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">{category} Suite</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className={`p-6 rounded-xl border ${colors.bg} ${colors.border} hover:shadow-lg transition-shadow duration-300`}>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h4>
                        <span className={`text-sm font-bold ${colors.text}`}>{skill.proficiency_level}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`${colors.bar} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${(skill.proficiency_level / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
