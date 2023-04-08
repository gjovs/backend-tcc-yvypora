interface IMessage {
    from: number
    to: number
    content: string
}

interface IntentOfTravel {
  accepted: boolean;
  order: any;
  routes: any;
}

interface IDeliveryLocationInTravel {
  order: any;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface IRetreatProductFinished {
  order: any;
}
