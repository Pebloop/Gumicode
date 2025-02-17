<script lang="ts">

    import {onMount} from "svelte";
    import {SimpleGraphMaker} from "$lib/utils/SimpleGraphMaker";



    onMount(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const nodes = [
            {x: 100, y: 100, label: 'Variable', link: "/lesson/what-is-a-variable"},
            {x: 100, y: 200, label: 'Function', link: "/lesson/what-is-a-function"},
        ];
        const links = [
            {source: {x: 150, y: 150}, target: {x: 150, y: 200}},
        ];

        SimpleGraphMaker(nodes, links, canvas);
    });
</script>

<main class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold">Beginner road</h1>

    <canvas id="canvas" width="300" height="600">
        Your browser does not support the HTML5 canvas tag.
    </canvas>
</main>