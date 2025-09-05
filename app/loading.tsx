export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mx-auto">
          <div className="w-8 h-8 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin"></div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Pocket Justice</h2>
          <p className="text-white text-opacity-70">Preparing your legal rights toolkit...</p>
        </div>
      </div>
    </div>
  );
}
