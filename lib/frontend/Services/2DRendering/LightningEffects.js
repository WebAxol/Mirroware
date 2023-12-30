import Service from "../Service.js";
import Vector2D from '../../utils/Vector2D.js';
class LightningEffects extends Service {
    constructor(canvas) {
        super();
        this.context = canvas.getContext('2d');
        this.scale = 100;
        this.frameCount = 0;
        this.randomNextFrame = 100;
    }
    execute() {
        if (this.frameCount == 0) {
            this.context?.clearRect(0, 0, 3000, 1700);
            for (let i = 0; i < 4; i++) {
                if (Math.random() > 0.5)
                    this.renderLightning(new Vector2D(Math.random() * 3000, 0), new Vector2D(Math.random() * 3000, 1700 / 2));
            }
            this.randomNextFrame = Math.round(20 + Math.random() * 10);
        }
        if (this.context == null)
            return;
        this.context.fillStyle = 'rgba(155,155,155,0.05)';
        this.context?.fillRect(0, 0, 3000, 1700);
        this.frameCount = (this.frameCount + 1) % this.randomNextFrame;
    }
    renderLine(details) {
        if (this.context == null)
            return;
        this.context.beginPath();
        this.context.strokeStyle = details.stroke || 'black';
        this.context.lineWidth = details.lineWidth || 1;
        this.context.moveTo(details.from.x, details.from.y);
        this.context.lineTo(details.to.x, details.to.y);
        this.context.stroke();
        this.context.closePath();
    }
    renderLightning(start, end) {
        const divisions = 3;
        const thickness = Math.random() * 20;
        const _helper = (start, end, division = 1) => {
            if (division > divisions) {
                let extrapolatedEnd = Vector2D.between(start, end, 1.3);
                this.renderLine({
                    from: start,
                    to: extrapolatedEnd,
                    lineWidth: thickness,
                    stroke: 'black'
                });
                return;
            }
            let perpendicularNormal = Vector2D.perpendicular(Vector2D.sub(start, end).normalize());
            let middle = Vector2D.between(start, end, 0.5).add(perpendicularNormal.scale(100));
            _helper(start, middle, division + 1);
            _helper(middle, end, division + 1);
        };
        _helper(start, end, 1);
    }
}
export default LightningEffects;
//# sourceMappingURL=LightningEffects.js.map