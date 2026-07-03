const NotificationToast = ({ listing, onClose }) => {
  if (!listing) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-white shadow-lg rounded-lg p-4 w-80 border-l-4 border-green-500">
      <div className="flex items-start">
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium text-gray-900">New Food Listing!</p>
          <p className="mt-1 text-sm text-gray-500">
            {listing.title} from {listing.restaurantId?.organizationName || 'a restaurant'} is now available.
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button onClick={onClose} className="inline-flex text-gray-400 hover:text-gray-500">
            <span className="sr-only">Close</span>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;