
export interface Node {
    label: string;
    x: number;
    y: number;
    width: number;
    height: number;
    url: string;
}

export interface Link {
    source: {node: number, anchor: string};
    target: {node: number, anchor: string};
}

export class SimpleGraphMaker {
    private nodes: Node[] = [];
    private links: Link[] = [];
    private canvas: HTMLCanvasElement;
    private currentNode: Node | null = null;
    private x: number = 0;
    private y: number = 0;

    private lastMouseX: number = 0;
    private lastMouseY: number = 0;
    private isDragging: boolean = false;
    private hasMouseMoved: boolean = false;

    private lastTouchX: number = 0;
    private lastTouchY: number = 0;
    private isTouchDragging: boolean = false;
    private hasTouchMoved: boolean = false;

    addNode(node: Node) {
        this.nodes.push(node);
    }

    addLink(link: Link) {
        this.links.push(link);
    }

    getGraph() {
        return {nodes: this.nodes, links: this.links};
    }

    clear() {
        this.nodes = [];
        this.links = [];
    }

    getNodes() {
        return this.nodes;
    }

    getLinks() {
        return this.links;
    }

    getNodesCount() {
        return this.nodes.length;
    }

    getLinksCount() {
        return this.links.length;
    }

    getNode(index: number) {
        return this.nodes[index];
    }

    getLink(index: number) {
        return this.links[index];
    }

    removeNode(index: number) {
        this.nodes.splice(index, 1);
    }

    removeLink(index: number) {
        this.links.splice(index, 1);
    }

    updateNode(index: number, node: Node) {
        this.nodes[index] = node;
    }

    updateLink(index: number, link: Link) {
        this.links[index] = link;
    }

    getIndexOfNode(node: Node) {
        return this.nodes.indexOf(node);
    }

    getIndexOfLink(link: Link) {
        return this.links.indexOf(link);
    }

    setNodes(nodes: Node[]) {
        this.nodes = nodes;
    }

    setLinks(links: Link[]) {
        this.links = links;
    }

    setGraph(graph: {nodes: Node[], links: Link[]}) {
        this.nodes = graph.nodes;
        this.links = graph.links;
    }

    getGraphFromJson(json: string) {
        return JSON.parse(json);
    }

    getJsonFromGraph() {
        return JSON.stringify(this.getGraph());
    }

    getNodeCount() {
        return this.nodes.length;
    }

    draw() {
        const ctx = this.canvas.getContext("2d");
        if (!ctx) {
            return;
        }

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // draw links
        ctx.strokeStyle = "#000000";
        for (let link of this.links) {
            let sourceX = this.nodes[link.source.node].x - this.x;
            let sourceY = this.nodes[link.source.node].y - this.y;
            let targetX = this.nodes[link.target.node].x - this.x;
            let targetY = this.nodes[link.target.node].y - this.y;

            switch (link.source.anchor) {
                case "top":
                    sourceY -= 5;
                    sourceX += this.nodes[link.source.node].width / 2;
                    break;
                case "bottom":
                    sourceY += this.nodes[link.source.node].height + 5;
                    sourceX += this.nodes[link.source.node].width / 2;
                    break;
                case "left":
                    sourceX -= 5;
                    sourceY += this.nodes[link.source.node].height / 2;
                    break;
                case "right":
                    sourceX += this.nodes[link.source.node].width + 5;
                    sourceY += this.nodes[link.source.node].height / 2;
                    break;
            }

            switch (link.target.anchor) {
                case "top":
                    targetY -= 5;
                    targetX += this.nodes[link.target.node].width / 2;
                    break;
                case "bottom":
                    targetY += this.nodes[link.target.node].height + 5;
                    targetX += this.nodes[link.target.node].width / 2;
                    break;
                case "left":
                    targetX -= 5;
                    targetY += this.nodes[link.target.node].height / 2;
                    break;
                case "right":
                    targetX += this.nodes[link.target.node].width + 5;
                    targetY += this.nodes[link.target.node].height / 2;
                    break;
            }

            ctx.beginPath();
            ctx.moveTo(sourceX, sourceY);
            ctx.lineTo(targetX, targetY);
            ctx.stroke();
        }

        // draw nodes
        for (let node of this.nodes) {
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.roundRect(node.x - this.x, node.y - this.y, node.width, node.height, 5);
            ctx.stroke();
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.fillStyle = "#000000";
            const textWidth = ctx.measureText(node.label).width;
            const textHeight = 5;
            const textX = node.x - this.x + node.width / 2 - textWidth / 2;
            const textY = node.y - this.y + node.height / 2 + textHeight / 2;
            ctx.fillText(node.label, textX, textY);
        }

        // draw current node
        if (this.currentNode) {
            ctx.fillStyle = "#00509f";
            ctx.beginPath();
            ctx.roundRect(this.currentNode.x - this.x, this.currentNode.y - this.y, this.currentNode.width, this.currentNode.height, 5);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            const textWidth = ctx.measureText(this.currentNode.label).width;
            const textHeight = 5;
            const textX = this.currentNode.x - this.x + this.currentNode.width / 2 - textWidth / 2;
            const textY = this.currentNode.y - this.y + this.currentNode.height / 2 + textHeight / 2;
            ctx.fillText(this.currentNode.label, textX, textY);
        }
    }

    // init
    constructor(canvas: HTMLCanvasElement) {
        this.nodes = [];
        this.links = [];
        this.canvas = canvas;

        // with keyboard
        window.onkeydown = (e) => {
            switch (e.key) {
                case "ArrowUp":
                    this.y -= 5;
                    break;
                case "ArrowDown":
                    this.y += 5;
                    break;
                case "ArrowLeft":
                    this.x -= 5;
                    break;
                case "ArrowRight":
                    this.x += 5;
                    break;
            }
            this.draw();
        }

        // with mouse
        this.canvas.onmousedown = (e) => {
            this.lastMouseX = e.clientX
            this.lastMouseY = e.clientY;
            this.isDragging = true;
            this.hasMouseMoved = false;
        }

        this.canvas.onmousemove = (e) => {
            if (this.isDragging) {
                this.x -= e.clientX - this.lastMouseX;
                this.y -= e.clientY - this.lastMouseY;
                if (e.clientX - this.lastMouseX > 5 || e.clientY - this.lastMouseY > 5 || e.clientX - this.lastMouseX < -5 || e.clientY - this.lastMouseY < -5) {
                    this.hasMouseMoved = true;
                }
                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;
                this.draw();
            } else {
                this.currentNode = null;
                for (let node of this.nodes) {
                    if (e.clientX >= node.x - this.x && e.clientX <= node.x - this.x + node.width && e.clientY >= node.y - this.y && e.clientY <= node.y - this.y + node.height) {
                        this.currentNode = node;
                        break;
                    }
                }

                if (!this.currentNode) {
                    canvas.style.cursor = "default";
                } else {
                    canvas.style.cursor = "pointer";
                }

                this.draw();


            }
        }

        this.canvas.onmouseup = (e) => {
            this.isDragging = false;
            if (!this.hasMouseMoved && this.currentNode) {
                document.location.href = this.currentNode.url;
            }
        }

        // with touch
        this.canvas.ontouchstart = (e) => {
            this.lastTouchX = e.touches[0].clientX;
            this.lastTouchY = e.touches[0].clientY;
            this.isTouchDragging = true;
            this.hasTouchMoved = false;
        }

        this.canvas.ontouchmove = (e) => {
            if (this.isTouchDragging) {
                this.x -= e.touches[0].clientX - this.lastTouchX;
                this.y -= e.touches[0].clientY - this.lastTouchY;
                if (e.touches[0].clientX - this.lastTouchX > 5 || e.touches[0].clientY - this.lastTouchY > 5 || e.touches[0].clientX - this.lastTouchX < -5 || e.touches[0].clientY - this.lastTouchY < -5) {
                    this.hasTouchMoved = true;
                }
                this.lastTouchX = e.touches[0].clientX;
                this.lastTouchY = e.touches[0].clientY;
                this.draw();
            } else {
                this.currentNode = null;
                for (let node of this.nodes) {
                    if (e.touches[0].clientX >= node.x - this.x && e.touches[0].clientX <= node.x - this.x + node.width && e.touches[0].clientY >= node.y - this.y && e.touches[0].clientY <= node.y - this.y + node.height) {
                        this.currentNode = node;
                    }
                }

                this.draw();
            }
        }

        this.canvas.ontouchend = (e) => {
            this.isTouchDragging = false;
            if (!this.hasTouchMoved && this.currentNode) {
                document.location.href = this.currentNode.url;
            }
        }

        setInterval(() => {
            this.draw();
        }, 100);
    }


}