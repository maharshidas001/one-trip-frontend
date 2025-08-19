import { Link } from "react-router-dom";

const TripCards = ({ title, image, id }: { title: string; image: string; id: string }) => {
  return (
    <>
      <div>
        <div
          className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <Link to={`/dashboard/trip/${id}`}>
            <img
              src={image}
              alt={'Image'}
              className="w-full h-52 object-cover"
            />
          </Link>
        </div>
        <div className="mt-3">
          <Link to={`/dashboard/trip/${id}`}>
            <h3 className="text-2xl font-bold text-black mb-2">{title}</h3>
          </Link>
        </div>
      </div>
    </>
  )
};

export default TripCards;