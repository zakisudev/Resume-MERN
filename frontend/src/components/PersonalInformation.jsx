import { FaMailBulk, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PersonalInformation = ({ personal, theme }) => {
  return (
    <div className="py-4 w-full">
      <div className="flex flex-col sm:flex-row w-full justify-center gap-5">
        <div className="w-full sm:w-1/2 flex justify-center items-center">
          <img
            src={personal[0]?.avatar}
            alt="avatar"
            className="rounded-full w-40 h-40 object-cover"
          />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col justify-center">
          <h1
            className={`${
              theme === '' && 'text-primaryColorDark'
            } text-3xl font-bold whitespace-nowrap`}
          >
            {personal[0]?.firstName} {personal[0]?.lastName}
          </h1>
          <p className="text-2xl font-medium">{personal[0]?.profession}</p>
          <p className="text-lg">{personal[0]?.address}</p>
          <Link
            to={`mailto:${personal[0]?.email}?subject=Regarding Resume viewing&body=Hi there Zak,`}
            className="text-primaryColorLight text-md font-semibold flex items-center gap-2"
          >
            <FaMailBulk /> {personal[0]?.email}
          </Link>
          <Link
            href={`tel:${personal[0]?.phone}`}
            className="text-md font-semibold text-primaryVariantColorLight flex items-center gap-2"
          >
            <FaPhone /> {personal[0]?.phone}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
