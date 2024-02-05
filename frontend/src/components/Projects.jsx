import { useState } from 'react';
import { IoIosWarning } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Projects = ({ projects }) => {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [image, setImage] = useState({});

  const handleImageClick = (img) => {
    setIsImageOpen(true);
    setImage(img);
  };

  const handleClose = () => {
    setIsImageOpen(false);
  };

  if (!projects && projects.length < 1) {
    return (
      <div className="flex justify-center items-center my-10 gap-10">
        <IoIosWarning className="text-4xl text-primaryColorDark" />
        <p className="text-center">{projects?.message}</p>
      </div>
    );
  }

  return (
    projects && (
      <div className="my-2 w-[80%] text-left">
        <h2 className="flex flex-row items-center text-2xl font-bold underline uppercase mb-2 bg-gray-300 py-2 px-1">
          Project:
        </h2>
        <ul className="flex flex-col justify-center items-center my-1">
          {projects?.project?.map((prj, index) => (
            <li
              key={prj._id}
              className={`flex gap-2 w-full my-2 ${
                index === projects?.project?.length - 1
                  ? 'border-b-2 border-primaryColorLight pb-2'
                  : 'border-b-2 border-gray-300'
              }`}
            >
              <img
                src={`/${prj?.image}`}
                alt={prj.title}
                className="w-24 h-24 object-cover cursor-pointer p-1"
                onClick={() => handleImageClick(prj)}
              />

              <div className="flex flex-col text-left w-full">
                <h3 className="text-xl font-bold">{prj?.title}</h3>
                <p className="text-sm text-gray-600">{prj?.description}</p>
                <ul className="inline-flex gap-3">
                  <>
                    <span className="font-semibold underline underline-offset-1">
                      Technologies used:{' '}
                    </span>
                    {prj?.technologies[0]
                      ?.split(',')
                      ?.map((technology, index) => {
                        if (
                          index ===
                          prj?.technologies[0]?.split(',').length - 1
                        ) {
                          return <li key={index}>{technology.trim()}</li>;
                        }
                        return <li key={index}>{technology.trim()} /</li>;
                      })}
                  </>
                </ul>
                <Link
                  to={prj?.link}
                  className="text-blue-700 hover:underline w-fit"
                  target="_blank"
                >
                  Visit demo
                </Link>
              </div>
            </li>
          ))}
          {isImageOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-black/40 opacity-75"></div>
                </div>

                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                  <img
                    src={`/${image?.image}`}
                    alt={image?.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleClose}
                    className="p-1 bg-gray-300 font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
    )
  );
};

export default Projects;
