(function exportController() {
class Controller {
    constructor(ship) {
    this.ship = ship;
    this.initialiseSea();

    document.querySelector('#sailbutton').addEventListener('click', () => {
        this.setSail();
    });
    this.displayPorts(ship.itinerary.ports[0].name, ship.itinerary.ports[1].name);
};

    initialiseSea() {
    const backgrounds = [
        './images/water0.png',
        './images/water1.png',
    ];
    let backgroundIndex = 0;

    window.setInterval(() => {
        document.querySelector('#viewport').style.backgroundImage = `url('${backgrounds[backgroundIndex % backgrounds.length]}')`;
        backgroundIndex += 1;

      }, 1000);
    };

    displayPorts(currentPort, nextPort) {
        const currentPortDiv = document.querySelector('#currentport');
        const nextPortDiv = document.querySelector('#nextport');
    
        currentPortDiv.textContent = "Current Port: " + currentPort;
        nextPortDiv.textContent = "Next Port: " + nextPort;
    
    };

    renderPorts(ports) {
        const portsElement = document.querySelector('#ports');
        portsElement.style.width = '0px';
        
        ports.forEach((port, index) => {
            this.createPort(port, index, portsElement)
          });
    };
 
    createPort(port, index, portsElement) {
        const newPortElement = document.createElement('div');
        newPortElement.className = 'port';
        newPortElement.dataset.portName = port.name;
        newPortElement.dataset.portIndex = index;
    
        const portsElementWidth = parseInt(portsElement.style.width, 10);
        portsElement.style.width = `${portsElementWidth + 256}px`;
  
        portsElement.appendChild(newPortElement);
    };

    renderShip() {
        const ship = this.ship;
        const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`);
        
        const shipElement = document.querySelector('#ship');
        shipElement.style.top = `${portElement.offsetTop}px`;
        shipElement.style.left = `${portElement.offsetLeft}px`;

        shipElement.style.top = `${portElement.offsetTop + 32}px`;
        shipElement.style.left = `${portElement.offsetLeft - 32}px`;
    };

    setSail() {
        const ship = this.ship

        const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const nextPortIndex = currentPortIndex + 1;
        const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`);
            if (!nextPortElement) {
                //return alert('End of the line!');
                return this.renderMessage(`${ship.currentPort.name} is the final destination`);
            };
            
        this.renderMessage(`Now departing ${ship.currentPort.name}`);

        this.displayPorts(ship.itinerary.ports[currentPortIndex].name, ship.itinerary.ports[nextPortIndex].name); 

        const shipElement = document.querySelector('#ship');
        const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.style.left, 10);
            if (shipLeft === (nextPortElement.offsetLeft - 32)) {
                ship.setSail();
                ship.dock();
                    this.renderMessage(`We have arrived at ${ship.currentPort.name}`);
                clearInterval(sailInterval);
  };

        shipElement.style.left = `${shipLeft + 1}px`;
            }, 20);
        };


        renderMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.id = 'message';
            messageElement.innerHTML = message;

            const viewport = document.querySelector('#viewport');
            viewport.appendChild(messageElement);

            setTimeout(() => {
                viewport.removeChild(messageElement);
              }, 2000);
        };

};
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    };
}());



