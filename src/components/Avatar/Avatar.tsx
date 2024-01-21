interface Avatar {
  height?: string;
  width?: string;
}

export const Avatar = ({ height, width }: Avatar) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-100 rounded-full ${height} ${width}`}
    >
      <img src='/assets/images/icons/profile.svg' className='object-cover w-12 ' />
    </div>
  );
};
