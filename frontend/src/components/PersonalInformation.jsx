const PersonalInformation = ({ personal }) => {
  return (
    <div className="my-2">
      <div className="flex flex-col sm:flex-row w-full justify-center gap-5">
        <div className="w-full sm:w-1/2 flex justify-center items-center">
          <img
            src={personal[0]?.avatar}
            alt="avatar"
            className="rounded-full w-60 h-60 object-cover"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <h1 className="text-6xl font-bold">
            {personal[0]?.firstName} {personal[0]?.lastName}
          </h1>
          <p className="text-4xl font-medium">{personal[0]?.profession}</p>
          <p className="text-2xl">{personal[0]?.address}</p>
          <p className="text-2xl">{personal[0]?.email}</p>
          <p className="text-2xl">{personal[0]?.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
