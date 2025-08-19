import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusIcon } from 'lucide-react';
import type { FC } from "react";

const NoTrips: FC = () => {
  return (
    <div className="py-10 text-center">
      <h2 className="text-2xl font-bold text-gray-800">No Trips Found</h2>
      <p className="mt-2 text-gray-500">
        It looks like you haven't planned any trips yet.
      </p>
      <div className="mt-6">
        <Link to="/dashboard/trip/create" className="flex items-center justify-center">
          <Button className="flex items-center gap-2">
            <PlusIcon size={18} />
            Create Your First Trip
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoTrips;