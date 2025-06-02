document.addEventListener('DOMContentLoaded', init);

function init() {
    class Drawing {
        constructor(canvasId) {
            const canvas = document.getElementById(canvasId);
            if (typeof canvas !== 'object') {
                throw "Canvas does not exist.";
            }
            this.context = canvas.getContext('2d');
        }

        /**
         * Draws the full page circle and a point on it with coordinates passed with the first param
         * @param {number[]|} [coordinates] - Array of two numbers: x and y coordinates of the point to draw. If not set,
         * point is drawn at the default point.
         */
        redraw(coordinates) {
            this.context.canvas.width = window.innerWidth;
            this.context.canvas.height = window.innerHeight;
          //  console.log(window.innerWidth + ',' + window.innerHeight);

            const centerX = this.context.canvas.width / 2;
            const centerY = this.context.canvas.height / 2;
            const radius = Math.round(Math.min(this.context.canvas.width, this.context.canvas.height) / 3);
            const pointRadius = radius / 20;

            this.context.beginPath();
            this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            this.context.lineWidth = pointRadius / 3;
            this.context.strokeStyle = 'black';
            this.context.stroke();

            if (typeof coordinates === 'object' && coordinates.length == 2) {
                this.context.beginPath();
                this.context.arc(centerX + radius * coordinates[0], centerY - radius * coordinates[1], pointRadius, 0, 2 * Math.PI, false);
                this.context.fillStyle = 'red';
                this.context.fill();
                this.context.lineWidth = 2;
                this.context.strokeStyle = 'red';
                this.context.stroke();
            }
        }
    }

    /**
     * Calculates coordinates for point depending on time
     * @param {number} time - Time to calculate coordinates
     * @returns {number[]} - Coordinates in Array
     */
    function getCoordinates(time) {
        // TODO: implement body of this function
        return [0.0, 1.0];
    }

    /**
     * Updates drawing on defined interval
     */
    function update() {
        const time = Date.now() / 1000;
        coordinates = getCoordinates(time);
        drawing.redraw(coordinates);
    }

    const drawing = new Drawing('cnvDraw');
    const timer = setInterval(update, 10);
    // window.addEventListener('resize', update);
}