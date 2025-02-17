
interface Node {
    label: string;
    x: number;
    y: number;
    link: string;
}

interface Link {
    source: {x: number, y: number};
    target: {x: number, y: number};
}

export function SimpleGraphMaker(nodes: Node[], links: Link[], canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        nodes.forEach(node => {
            ctx.strokeRect(node.x, node.y, 100, 50);
            ctx.font = '16px Arial';
            // center text
            const textWidth = ctx.measureText(node.label).width;
            const textX = node.x + (100 - textWidth) / 2;
            const textY = node.y + 30;
            ctx.fillText(node.label, textX, textY);

            // if click on node, redirect to the lesson
            canvas.addEventListener('click', (event) => {
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                if (x >= node.x && x <= node.x + 100 && y >= node.y && y <= node.y + 50) {
                    window.location.href = node.link;
                }
            });

            // if hover on node, change color and cursor
            canvas.addEventListener('mousemove', (event) => {
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                if (x >= node.x && x <= node.x + 100 && y >= node.y && y <= node.y + 50) {
                    ctx.fillStyle = 'lightblue';
                    ctx.fillRect(node.x, node.y, 100, 50);
                    ctx.fillStyle = 'black';
                    ctx.fillText(node.label, textX, textY);
                    canvas.style.cursor = 'pointer';
                } else {
                    ctx.clearRect(node.x, node.y, 100, 50);
                    ctx.strokeRect(node.x, node.y, 100, 50);
                    ctx.fillText(node.label, textX, textY);
                    canvas.style.cursor = 'default';
                }
            });
        });

        links.forEach(link => {
            const source = link.source;
            const target = link.target;
            if (source && target) {
                ctx.beginPath();
                ctx.moveTo(source.x, source.y);
                ctx.lineTo(target.x, target.y);
                ctx.stroke();
            }
        });
    }
}