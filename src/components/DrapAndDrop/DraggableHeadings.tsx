export const DraggableHeadings = ({ level, content, subHeadings }) => {
  const tags = ['h1', 'h2', 'h3', 'h4'];

  return (
    <>
      <h1 {...tags[level - 1]}>{content}</h1>
      {subHeadings?.length > 0 && (
        <ul>
          {subHeadings.map((subHeading) => (
            <DraggableHeadings
              key={subHeading.id}
              level={subHeading.level}
              content={subHeading.content}
              subHeadings={subHeading.subHeadings}
            />
          ))}
        </ul>
      )}
    </>
  );
};
