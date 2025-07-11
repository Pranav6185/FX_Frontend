import React from 'react';
import { Clock, Users, Star, Calendar, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Batch } from '../types/batch';

interface BatchCardProps {
  batch: Batch;
  onEnroll?: (batchId: string) => void;
  onViewDetails?: (batchId: string) => void;
  showEnrollButton?: boolean;
}

const BatchCard: React.FC<BatchCardProps> = ({
  batch,
  onEnroll,
  onViewDetails,
  showEnrollButton = true
}) => {
  const progressPercentage = (batch.filledSlots / batch.totalSlots) * 100;

  return (
    <Card className="overflow-hidden hover-lift cursor-pointer group">
      <div className="relative">
        <img
          src={batch.thumbnail}
          alt={batch.batchName}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="outline">{batch.mode.toUpperCase()}</Badge>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-lg font-bold text-gray-900">₹{batch.price}</span>
        </div>
      </div>

      <CardHeader className="pb-4">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{batch.batchName}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{batch.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{batch.duration}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{batch.language}</span>
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Enrollment Progress</span>
            <span className="font-medium">{batch.filledSlots}/{batch.totalSlots}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Starts {new Date(batch.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="h-4 w-4" />
            <span>Certificate</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex space-x-2">
        {onViewDetails && (
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onViewDetails(batch.id)}
          >
            View Details
          </Button>
        )}
        {showEnrollButton && onEnroll && (
          <Button
            className="flex-1"
            onClick={() => onEnroll(batch.id)}
            disabled={batch.filledSlots >= batch.totalSlots}
          >
            {batch.filledSlots >= batch.totalSlots ? 'Full' : 'Enroll Now'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BatchCard;
