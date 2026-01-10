export default function RestShimmer() {
  return (
    <div className="w-[80%] mx-auto my-12 animate-pulse">
      
      {/* Restaurant Name */}
      <div className="h-12 w-[40%] bg-gray-200 rounded mb-10"></div>

      {/* Menu Sections */}
      {Array(4).fill("").map((_, sectionIndex) => (
        <div key={sectionIndex} className="w-full mb-12">

          {/* Section Divider */}
          <div className="w-full bg-gray-200 h-4 my-8 rounded-2xl"></div>

          {/* Section Title */}
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-[30%] bg-gray-200 rounded"></div>
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          </div>

          {/* Dishes */}
          {Array(3).fill("").map((_, dishIndex) => (
            <div key={dishIndex}>
              <div className="flex justify-between my-6">
                
                {/* Left Content */}
                <div className="w-[70%] space-y-3">
                  <div className="h-5 w-[60%] bg-gray-200 rounded"></div>
                  <div className="h-4 w-[30%] bg-gray-200 rounded"></div>
                  <div className="h-4 w-[40%] bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-[80%] bg-gray-200 rounded"></div>
                </div>

                {/* Image + Button */}
                <div className="w-[20%] relative">
                  <div className="w-full h-30 bg-gray-200 rounded"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-8 w-20 bg-gray-300 rounded"></div>
                </div>

              </div>

              {/* Divider */}
              <div className="w-full bg-gray-300 h-0.5 my-6 rounded-2xl"></div>
            </div>
          ))}

        </div>
      ))}
    </div>
  );
}
