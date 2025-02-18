<script lang="ts">
    import {onMount} from "svelte";

    interface Room {
        rects: { x: number, y: number, width: number, height: number }[],
        name: string,
        url: string
    }

    const mapSize = 0.3;
    const rooms: Room[] = [
        { rects: [{x: 163, y: 35, width: 280, height: 157}], name: 'code basics', url: "/road/basics"},
    ];

    let canvas: HTMLCanvasElement;

    let x = $state(0);
    let y = $state(0);
    let canvasWidth = $state(100);
    let canvasHeight = $state(100);
    let currentRoom : Room | null = $state(null);

    $effect(() => {
        if (canvasWidth || canvasHeight) {
            draw(document.getElementById('map') as HTMLCanvasElement);
        }
    });

    onMount(() => {
        // get all canvases with the class map
        canvas = document.getElementById('map') as HTMLCanvasElement;

        const canvasResizeObserver = new ResizeObserver(() => {
            canvasWidth = canvas.clientWidth;
            canvasHeight = canvas.clientHeight;
        });
        canvasResizeObserver.observe(canvas);

        // with keyboard
        window.onkeydown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    y -= 10;
                    break;
                case 'ArrowDown':
                    y += 10;
                    break;
                case 'ArrowLeft':
                    x -= 10;
                    break;
                case 'ArrowRight':
                    x += 10;
                    break;
            }
            draw(canvas);
        };

        // with mouse
        let isDragging = false;
        let lastX = 0;
        let lastY = 0;
        let hasMoved = false;

        canvas.onmousedown = (event: any) => {
            isDragging = true;
            lastX = event.clientX;
            lastY = event.clientY;
        };

        canvas.onmouseup = (event: any) => {
            if (!hasMoved) {
                // if click on a room
                if (currentRoom && event.sourceCapabilities.firesTouchEvents == false) {
                    document.location.href = currentRoom.url;
                }
            }

            isDragging = false;
            hasMoved = false;
        };

        canvas.onmousemove = (event: any) => {
            if (isDragging) {
                x -= event.clientX - lastX;
                y -= event.clientY - lastY;

                if (event.clientX - lastX > 5 || event.clientY - lastY > 5 || event.clientX - lastX < -5 || event.clientY - lastY < -5) {
                    hasMoved = true;
                }

                lastX = event.clientX;
                lastY = event.clientY;
            }

            // if mouse hover a room display the name
            let isInARoom = false;
            for (const room of rooms) {
                let isInside = false;

                for (const rect of room.rects) {
                    if (event.clientX > rect.x - x && event.clientX < rect.x - x + rect.width &&
                        event.clientY > rect.y - y && event.clientY < rect.y - y + rect.height) {
                        isInside = true;
                    }
                }

                if (isInside) {
                    isInARoom = true;
                    canvas.style.cursor = 'pointer';
                    currentRoom = room;
                }
            }

            if (!isInARoom) {
                canvas.style.cursor = 'default';
                currentRoom = null;
            }

            draw(canvas);
        };

        // with touch
        let isTouching = false;
        let lastTouchX = 0;
        let lastTouchY = 0;
        let hasMovedTouch = false;

        canvas.ontouchstart = (event) => {

            isTouching = true;
            lastTouchX = event.touches[0].clientX;
            lastTouchY = event.touches[0].clientY;
        };

        canvas.ontouchend = () => {
            console.log('touchend');
            if (!hasMovedTouch) {
                // if click on a room
                if (currentRoom != null) {

                    // if is still clicking on the room
                    let isInside = false;
                    for (const rect of currentRoom.rects) {
                        if (lastTouchX > rect.x - x && lastTouchX < rect.x - x + rect.width &&
                            lastTouchY > rect.y - y && lastTouchY < rect.y - y + rect.height) {
                            isInside = true;
                        }
                    }

                    if (isInside) {
                        document.location.href = currentRoom.url;
                    }

                } else {
                    // if click on the map
                    const currentX = lastTouchX - x;
                    const currentY = lastTouchY - y;

                    // if click on a room
                    for (const room of rooms) {

                        let isInside = false;
                        for (const rect of room.rects) {
                            if (currentX > rect.x && currentX < rect.x + rect.width &&
                                currentY > rect.y && currentY < rect.y + rect.height) {
                                isInside = true;
                            }
                        }

                        if (isInside) {
                            currentRoom = room;
                        }

                    }
                }
            }

            isTouching = false;
            hasMovedTouch = false;
            draw(canvas);
        };

        canvas.ontouchmove = (event) => {
            if (isTouching) {
                x -= event.touches[0].clientX - lastTouchX;
                y -= event.touches[0].clientY - lastTouchY;

                if (event.touches[0].clientX - lastTouchX > 5 || event.touches[0].clientY - lastTouchY > 5 || event.touches[0].clientX - lastTouchX < -5 || event.touches[0].clientY - lastTouchY < -5) {
                    hasMovedTouch = true;
                }

                lastTouchX = event.touches[0].clientX;
                lastTouchY = event.touches[0].clientY;
                draw(canvas);
            }
        };

        x = -canvas.clientWidth / 2;
        y = -canvas.clientHeight / 2;
        draw(canvas);
        setInterval(() => {
            draw(canvas);
        }, 1000 / 60);
    });

    function draw(canvas: HTMLCanvasElement) {
        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        if (canvasWidth != canvas.width || canvasHeight != canvas.height) {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
        }

        ctx.save();

        // clear canvas
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // create image from file
        const image = new Image();
        image.src = "/gumicode_map.png";
        ctx.drawImage(image, -x, -y, image.width * mapSize, image.height * mapSize);

        // draw current room
        if (currentRoom) {
            for (const rect of currentRoom.rects) {
                ctx.fillStyle = 'blue';
                ctx.fillRect(rect.x - x, rect.y - y, rect.width, rect.height);
            }

            ctx.fillStyle = 'white';
            ctx.font = '12px Arial';
            const roomNameWidth = ctx.measureText(currentRoom.name).width;
            const roomNameX = currentRoom.rects[0].x - x + currentRoom.rects[0].width / 2 - roomNameWidth / 2;
            const roomNameY = currentRoom.rects[0].y - y + currentRoom.rects[0].height / 2;
            ctx.fillText(currentRoom.name, roomNameX, roomNameY);
        }

        ctx.restore();
    }


</script>

<canvas class="w-screen h-screen block fixed" id="map" width={canvasWidth} height={canvasHeight}>
    Your browser does not support the HTML5 canvas tag.
</canvas>