<script lang="ts">
    export let road: string | null = null;
    export let direction: "vertical" | "horizontal" = "vertical";
</script>

<div class="fixed z-10 top-0 left-0 w-min flex {direction === 'vertical' ? 'flex-col' : 'flex-row'}">
    <a href="/" class="text-blue-800 hover:text-blue-700 p-2 font-bold text-2xl w-min">Gumicode</a>
    <a href="/map" aria-label="map" class="m-2 w-10 h-10 rounded-full bg-blue-800 flex justify-center items-center hover:bg-blue-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...$$props}><path fill="white" d="M231.38 46.54a12 12 0 0 0-10.29-2.18L161.4 59.28l-60-30a12 12 0 0 0-8.28-.91l-64 16A12 12 0 0 0 20 56v144a12 12 0 0 0 14.91 11.64l59.69-14.92l60 30a12 12 0 0 0 8.28.91l64-16A12 12 0 0 0 236 200V56a12 12 0 0 0-4.62-9.46M108 59.42l40 20v117.16l-40-20Zm-64 6l40-10v119.21l-40 10Zm168 125.21l-40 10V81.37l40-10Z"/></svg>
    </a>
    {#if (road)}
        <a href={road} aria-label="road" class="m-2 w-10 h-10 rounded-full bg-blue-800 flex justify-center items-center hover:bg-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...$$props}><path fill="white" d="M237.88 202.46a12 12 0 0 1-16.34-4.58L153 76h-13v4a12 12 0 0 1-24 0v-4h-13L34.46 197.88a12 12 0 1 1-20.92-11.76L75.48 76H24a12 12 0 0 1 0-24h208a12 12 0 0 1 0 24h-51.48l61.94 110.12a12 12 0 0 1-4.58 16.34M128 108a12 12 0 0 0-12 12v16a12 12 0 0 0 24 0v-16a12 12 0 0 0-12-12m0 56a12 12 0 0 0-12 12v16a12 12 0 0 0 24 0v-16a12 12 0 0 0-12-12"/></svg>        </a>
    {/if}
</div>