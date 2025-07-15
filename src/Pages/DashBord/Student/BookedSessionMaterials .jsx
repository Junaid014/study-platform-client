import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { FaFileAlt, FaLink,FaDownload  } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../Extra/Loading';
import EmptyState from '../../Extra/EmptyState ';

const BookedSessionMaterials = () => {
  const { id: sessionId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: materials = [], isLoading } = useQuery({
    queryKey: ['materialsBySession', sessionId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/materials/by-session/${sessionId}`);
      return res.data;
    },
    enabled: !!sessionId,
  });

  const downloadImage = async (url, title = 'material-image.jpg') => {
    try {
      const response = await fetch(url, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = title;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Image download failed:', error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-[#422ad5] text-center mt-6 mb-6">📂 Session Materials</h2>

      {materials.length === 0 ? (
        <EmptyState
          icon="file"
          title="No Materials Available"
          message="This session doesn't have any materials uploaded yet."
        />
      ) : (
        <div className="grid md:grid-cols-2 border bg-gray-50 border-gray-300 py-8 px-16 rounded-2xl gap-6">
          {materials.map((material) => (
            <div
              key={material._id}
              className="border border-gray-200  rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <img
                src={material.image}
                alt={material.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1 text-start roboto">{material.title}</h3>

              <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                <FaFileAlt className="text-blue-500" />
                Material for this session
              </div>

              <div className='flex justify-between items-center'>
                     <a
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:underline mt-2"
              >
                <FaLink />
                Open Material
              </a>

              <button
                onClick={() => downloadImage(material.image, `${material.title || 'material'}.jpg`)}
                className="mt-3 inline-flex items-center gap-2 text-green-600 hover:underline text-sm"
              >
                <FaDownload />
                Download Image
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedSessionMaterials;