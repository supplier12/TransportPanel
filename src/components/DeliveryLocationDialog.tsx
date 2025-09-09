import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Package, User, Phone, Calendar } from "lucide-react";

interface DeliveryLocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  delivery: {
    orderId: string;
    customerName: string;
    cartons: number;
    deliveryAddress: string;
    deliveryPoint: string;
    deliveryTime: string;
  } | null;
}

export function DeliveryLocationDialog({ open, onOpenChange, delivery }: DeliveryLocationDialogProps) {
  if (!delivery) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden delivery-dialog">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">Delivery Details</DialogTitle>
                <p className="text-orange-100 text-sm">Order #{delivery.orderId}</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              {delivery.cartons} Cartons
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Customer Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 info-section">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <User className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-blue-900">Customer Information</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-blue-700 font-medium">Name:</span>
                <span className="font-semibold text-blue-900">{delivery.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-500" />
                <span className="text-blue-700">Contact information available</span>
              </div>
            </div>
          </div>

          {/* Delivery Location */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 info-section">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-green-900">Delivery Location</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-green-700 font-medium mb-1">Address:</p>
                <p className="text-green-900 bg-white/50 p-3 rounded-lg border border-green-200">
                  {delivery.deliveryAddress}
                </p>
              </div>
              <div>
                <p className="text-green-700 font-medium mb-1">Delivery Point:</p>
                <p className="text-green-900 bg-white/50 p-3 rounded-lg border border-green-200">
                  {delivery.deliveryPoint}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Time */}
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200 info-section">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-purple-900">Delivery Schedule</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-500" />
                <span className="text-purple-700 font-medium">Time Window:</span>
              </div>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 font-semibold">
                {delivery.deliveryTime}
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}