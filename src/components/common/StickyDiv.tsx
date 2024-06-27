type Props = { children: React.ReactNode };

const StickyDiv = (props: Props) => {
  return (
    <div className="sticky top-0 bg-white z-10 border-b -mx-4 px-4 mb-2">
      {props.children}
    </div>
  );
};

export default StickyDiv;
