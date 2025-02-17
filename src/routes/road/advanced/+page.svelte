<script lang="ts">

    import {onMount} from "svelte";
    import {SimpleGraphMaker} from "$lib/utils/SimpleGraphMaker";



    onMount(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const nodes = [
        ];
        const links = [
        ];

        SimpleGraphMaker(nodes, links, canvas);
    });
</script>

<main class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold">Advanced road</h1>

    <canvas id="canvas" width="300" height="600">
        Your browser does not support the HTML5 canvas tag.
    </canvas>
</main>