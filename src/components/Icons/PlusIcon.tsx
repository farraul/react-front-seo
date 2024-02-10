interface ExternalLinkIcon {
  height?: string;
  width?: string;
  backgroundColor?: string;
}

export const PlusIcon = ({ height, width, backgroundColor }: ExternalLinkIcon) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center  overflow-hidden  rounded-full ${height} ${width} ${backgroundColor}`}
    >
      <img src='/assets/images/icons/plus-white.svg' className='object-cover w-12 ' />
    </div>
  );
};
