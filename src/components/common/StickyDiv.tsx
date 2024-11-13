type Props = {
  children: React.ReactNode;
};

const StickyDiv = ({ children }: Props) => {
  return (
    <div className={`sticky bg-white z-10 border-b  px-4 py-2 shadow-lg `}>
      {children}
    </div>
  );
};

export default StickyDiv;
