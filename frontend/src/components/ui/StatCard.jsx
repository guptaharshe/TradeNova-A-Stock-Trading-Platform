import Card from "./Card";

const StatCard = ({ title, value, subtitle }) => {
  return (
    <Card>
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">
        {value}
      </h3>
      {subtitle && (
        <p className="mt-1 text-xs text-gray-500">
          {subtitle}
        </p>
      )}
    </Card>
  );
};

export default StatCard;
