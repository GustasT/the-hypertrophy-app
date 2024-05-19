interface ErrorListProps {
  errors: string[];
}

const ErrorList: React.FC<ErrorListProps> = ({ errors }) => {
  return errors.length > 0 ? (
    <div className="mb-4 text-red-500">
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default ErrorList;
