import Spinner from "./Spinner";

export default function PageLoader({ message = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Spinner size="lg" />
            <p className="text-gray-400 text-sm">{message}</p>
        </div>
    );
}
