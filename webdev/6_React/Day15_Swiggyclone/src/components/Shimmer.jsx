

export default function Shimmer() {
  return (
    <div className="mt-20 w-[80%] mx-auto">
      {/* Heading shimmer */}
      <div className="h-8 w-72 bg-gray-200 rounded mb-10 animate-pulse"></div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array(12)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="max-w-72 px-1"
            >
              {/* Image shimmer */}
              <div className="w-full h-45 bg-gray-200 rounded-xl animate-pulse"></div>

              <div className="w-[95%] mx-auto mt-3 space-y-3">
                {/* Name */}
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>

                {/* Rating + time */}
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>

                {/* Cuisines */}
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>

                {/* Area */}
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
