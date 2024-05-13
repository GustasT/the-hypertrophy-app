import { Link } from "react-router-dom";

type Props = {};

const NotFoundPage = (props: Props) => {
  return (
    <div className="flex flex-col gap-2">
      Buvo BUVO BuuuuVo BuUvO!
      <Link to="/">Acipisi</Link>
    </div>
  );
};

export default NotFoundPage;
