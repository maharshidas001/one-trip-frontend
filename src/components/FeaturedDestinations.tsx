type DestinationCard = {
  title: string;
  description: string;
  imageUrl: string;
};

const FeaturedDestinations = () => {
  const destinations: DestinationCard[] = [
    {
      title: "Explore the Majestic Peaks",
      description: "Hike through breathtaking mountain ranges and experience nature's grandeur.",
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Discover the Vibrant City Life",
      description: "Immerse yourself in the culture and excitement of bustling city centers.",
      imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Relax on the Pristine Beaches",
      description: "Unwind on soft sands and crystal-clear waters in paradise.",
      imageUrl: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinations.map((destination, index) => (
        <div key={index}>
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={destination.imageUrl}
              alt={destination.title}
              className="w-full h-52 object-cover"
            />
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-black mb-2">{destination.title}</h3>
            <p className="text-black/90">{destination.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedDestinations;