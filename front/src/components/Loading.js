import "../styles/Loading.css";

export default function Loading() {
  return (
    <div className="max-w-8xl h-screen bg-gray-900 mx-auto px-4 sm:px-6 md:px-8 py-6 flex justify-center items-center">
      <div className="spinner"></div>
    </div>
  );
}
