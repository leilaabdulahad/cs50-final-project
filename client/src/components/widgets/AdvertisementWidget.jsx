import '../../index.css'

const AdvertisementWidget = () => {

  return (
    <div className="bg-gray-200 p-4 rounded-lg w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-400">
          Sponsored
        </div>
      </div> 
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/advert-img.jpg"
        className="w-full h-auto rounded-lg my-3"
      />
      <div className="flex flex-wrap justify-between items-center sm:text-sm">
        <div className="text-gray-500 text-base">
          SkinCare
        </div>
        <a 
          href="http://cosmetics.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-500 no-underline hover:underline"
        >
          www.skincare.com
        </a>
      </div>
      <div className="text-sm text-gray-500 my-2">
        20% off on all skin and beauty products. Hurry up! Offer ends in 3 days.
      </div>
    </div>
  );
};

export default AdvertisementWidget;