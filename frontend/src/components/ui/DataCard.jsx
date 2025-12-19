import Card from "./Card";
import EmptyState from "./EmptyState";

export default function DataCard({
  title,
  dataLength = 0,
  emptyTitle = "No data",
  emptyDescription = "Nothing to show here yet.",
  children,
}) {
  return (
    <Card>
      {title && (
        <h3 className="text-white font-semibold mb-4">
          {title}
        </h3>
      )}

      {dataLength === 0 ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
        />
      ) : (
        children
      )}
    </Card>
  );
}
