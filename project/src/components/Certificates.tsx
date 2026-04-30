import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Download, Eye, X } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issue_date: string;
  issuer: string;
  file_url: string;
  description: string | null;
  created_at: string;
}

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCertificates = async () => {
      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY
      );

      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('issue_date', { ascending: false });

      if (!error && data) {
        setCertificates(data);
      }
      setLoading(false);
    };

    fetchCertificates();
  }, []);

  const handleView = (cert: Certificate) => {
    setSelectedCert(cert);
    setShowModal(true);
  };

  const handleDownload = (fileUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${title}.pdf`;
    link.click();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Certificates & Credentials</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">Professional certifications and achievements</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Certificate Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <span className="text-xl">📜</span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{cert.title}</h3>

              <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <p><span className="font-semibold">Issuer:</span> {cert.issuer}</p>
                <p><span className="font-semibold">Date:</span> {formatDate(cert.issue_date)}</p>
              </div>

              {cert.description && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">{cert.description}</p>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleView(cert)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-lg hover:bg-teal-200 dark:hover:bg-teal-900/50 transition-colors duration-200 text-sm font-semibold"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleDownload(cert.file_url, cert.title)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-200 text-sm font-semibold"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedCert && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold">{selectedCert.title}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Issuer</p>
                  <p className="text-lg">{selectedCert.issuer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Issue Date</p>
                  <p className="text-lg">{formatDate(selectedCert.issue_date)}</p>
                </div>
                {selectedCert.description && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Description</p>
                    <p className="text-gray-700 dark:text-gray-300">{selectedCert.description}</p>
                  </div>
                )}
              </div>

              {/* File Preview */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">Document Preview</p>
                <a
                  href={selectedCert.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                >
                  <Eye className="w-5 h-5" />
                  Open File
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-6 flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => handleDownload(selectedCert.file_url, selectedCert.title)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-semibold"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
