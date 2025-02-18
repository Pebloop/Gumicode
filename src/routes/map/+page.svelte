<script lang="ts">
    import {onMount} from "svelte";

    interface Room {
        rects: { x: number, y: number, width: number, height: number }[],
        name: string,
        url: string
    }

    const mapSize = 0.3;

    let x = $state(-250);
    let y = $state(-150);
    let currentRoom : Room | null = $state(null);

    const rooms: Room[] = [
        { rects: [{x: 163, y: 35, width: 280, height: 157}], name: 'code basics', url: "/road/basics"},
    ];

    onMount(() => {
        const canvas = document.getElementById('map') as HTMLCanvasElement;

        canvas.onresize = (event: UIEvent) => {
            console.log(event.target);
            draw();
        };

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            draw();
        });

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // with keyboard
        window.addEventListener('keydown', (event) => {
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
            draw();
        });

        // with mouse
        let isDragging = false;
        let lastX = 0;
        let lastY = 0;
        let hasMoved = false;

        window.addEventListener('mousedown', (event: any) => {
            isDragging = true;
            lastX = event.clientX;
            lastY = event.clientY;
        });

        window.addEventListener('mouseup', (event: any) => {
            if (!hasMoved) {
                // if click on a room
                if (currentRoom && event.sourceCapabilities.firesTouchEvents == false) {
                    document.location.href = currentRoom.url;
                }
            }

            isDragging = false;
            hasMoved = false;
        });

        window.addEventListener('mousemove', (event: any) => {
            if (isDragging) {
                x -= event.clientX - lastX;
                y -= event.clientY - lastY;

                if (event.clientX - lastX > 5 || event.clientY - lastY > 5 || event.clientX - lastX < -5 || event.clientY - lastY < -5) {
                    hasMoved = true;
                }

                lastX = event.clientX;
                lastY = event.clientY;
            }

            draw();

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
                    const ctx = canvas.getContext('2d');

                    if (ctx) {

                        for (const rect of room.rects) {
                            ctx.fillStyle = 'blue';
                            ctx.fillRect(rect.x - x, rect.y - y, rect.width, rect.height);
                        }

                        ctx.fillStyle = 'white';
                        ctx.font = '12px Arial';
                        const roomNameWidth = ctx.measureText(room.name).width;
                        const roomNameX = room.rects[0].x - x + room.rects[0].width / 2 - roomNameWidth / 2;
                        const roomNameY = room.rects[0].y - y + room.rects[0].height / 2;
                        ctx.fillText(room.name, roomNameX, roomNameY);

                        canvas.style.cursor = 'pointer';

                        currentRoom = room;
                    }
                }
            }

            if (!isInARoom) {
                canvas.style.cursor = 'default';
                canvas.onclick = null;
            }

        });

        // with touch
        let isTouching = false;
        let lastTouchX = 0;
        let lastTouchY = 0;
        let hasMovedTouch = false;

        window.addEventListener('touchstart', (event) => {
            isTouching = true;
            lastTouchX = event.touches[0].clientX;
            lastTouchY = event.touches[0].clientY;
        });

        window.addEventListener('touchend', () => {
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
                    const canvas = document.getElementById('map') as HTMLCanvasElement;
                    const rect = canvas.getBoundingClientRect();
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
                            // draw room
                            const ctx = canvas.getContext('2d');

                            if (ctx) {
                                for (const rect of room.rects) {
                                    ctx.fillStyle = 'blue';
                                    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
                                }

                                ctx.fillStyle = 'white';
                                ctx.font = '12px Arial';
                                const roomNameWidth = ctx.measureText(room.name).width;
                                const roomNameX = room.rects[0].x + room.rects[0].width / 2 - roomNameWidth / 2;
                                const roomNameY = room.rects[0].y + room.rects[0].height / 2;
                                ctx.fillText(room.name, roomNameX, roomNameY);
                            }
                        }

                    }
                }
            }

            isTouching = false;
            hasMovedTouch = false;

        });

        window.addEventListener('touchmove', (event) => {
            if (isTouching) {
                x -= event.touches[0].clientX - lastTouchX;
                y -= event.touches[0].clientY - lastTouchY;

                if (event.touches[0].clientX - lastTouchX > 5 || event.touches[0].clientY - lastTouchY > 5 || event.touches[0].clientX - lastTouchX < -5 || event.touches[0].clientY - lastTouchY < -5) {
                    hasMovedTouch = true;
                }

                lastTouchX = event.touches[0].clientX;
                lastTouchY = event.touches[0].clientY;
                draw();
            }
        });

        // draw once after 10ms
        setTimeout(() => {
            draw();
        }, 10);

    });

    function draw() {
        const canvas = document.getElementById('map') as HTMLCanvasElement;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // create image from file
        const image = new Image();
        image.src = "/gumicode_map.png";
        ctx.drawImage(image, -x, -y, image.width * mapSize, image.height * mapSize);

    }

    if (typeof window !== 'undefined') {

        draw();
    }
</script>

<canvas id="map" width="800" height="600"></canvas>