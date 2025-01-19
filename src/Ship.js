(function exportShip() {
class Ship {
    constructor(itinerary){
        this.itinerary = itinerary;

        this.previousPort = null;

        this.currentPort = itinerary.ports[0];
        this.currentPort.addShip(this);

        this.nextPort = itinerary.ports[1];
    };

    
    setSail() {
        const itinerary = this.itinerary;
        const currentPortIndex = itinerary.ports.indexOf(this.currentPort);
      
        if (currentPortIndex < (itinerary.ports.length - 1)) {
          this.previousPort = this.currentPort;

          this.currentPort.removeShip(this);
          this.currentPort = null;
        }

      };

    
    dock () {
        const itinerary = this.itinerary;
        const previousPortIndex = itinerary.ports.indexOf(this.previousPort);
      
        this.currentPort = itinerary.ports[previousPortIndex + 1];

        if(previousPortIndex + 2 <= itinerary.ports.length){
            this.nextPort = itinerary.ports[previousPortIndex + 2];
        }

        this.currentPort.addShip(this);
      };
};
    
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Ship;
    } else {
        window.Ship = Ship;
};
}());