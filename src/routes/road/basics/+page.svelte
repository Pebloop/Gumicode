<script lang="ts">

    import {onMount} from "svelte";
    import {type Link, type Node, SimpleGraphMaker} from "$lib/utils/SimpleGraphMaker";
    import Header from "$lib/components/Header.svelte";

    let width = $state(100);
    let height = $state(100);

    const nodes: Node[] = [
        {x: 100, y: 100, width: 70, height: 30, label: 'What is code ?', url: "/road/basics/what-is-code"},
        {x: 100, y: 200, width: 70, height: 30, label: 'Functions', url: "/road/basics/functions"},
        {x: 100, y: 300, width: 70, height: 30, label: 'Variables', url: "/road/basics/variables"},
    ]

    const links: Link[] = [
        {source: {node: 0, anchor: "bottom"}, target: {node: 1, anchor: "top"}},
        {source: {node: 1, anchor: "bottom"}, target: {node: 2, anchor: "top"}},
    ]

    let graph: SimpleGraphMaker;

    onMount(() => {
        const canvas = document.getElementById('map') as HTMLCanvasElement;
        graph = new SimpleGraphMaker(canvas);
        graph.setNodes(nodes);
        graph.setLinks(links);

        const canvasResizeObserver = new ResizeObserver(() => {
            width = canvas.clientWidth;
            height = canvas.clientHeight;
        });
        canvasResizeObserver.observe(canvas);
    });

</script>

<Header road={null} />

<canvas id="map" class="w-screen h-screen block fixed top-0 left-0" width={width} height={height}></canvas>