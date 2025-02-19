<script lang="ts">
    import {onMount} from "svelte";
    import {createSwiper} from "$lib/utils/LessonSwipper";
    import Header from "$lib/components/Header.svelte";

    let page = 0;
    let slideHeight = $state(0);

    function resize() {
        const widthChange = 768;
        const spacing = 4;
        const space = window.innerWidth > widthChange ? spacing * 20 : spacing * 32;
        slideHeight = window.innerHeight - space - 10;
    }

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        page = parseInt(urlParams.get('page') ?? '0');
        resize();

        window.onresize = () => {
            resize();
        }

        $effect(() => {
            document.querySelectorAll('.slide').forEach((el) => {
                let element = el as HTMLElement;
                element.style.height = `${slideHeight}px`;
            });
        });

        createSwiper({
            initialSlide: page,
            after: "road/basics/variables",
            height: slideHeight,
        });
    });

</script>

<Header road="/road/basics" direction="horizontal" />

<div class="w-screen h-screen block fixed top-0 left-0">
<h1 class="text-2xl font-bold m-3 max-md:mt-16 max-md:text-center text-end">What is code?</h1>
<hr class="m-5 text-blue-900" />
</div>

<div class="max-md:pt-32 pt-20 ">
</div>
<div class="swiper">
    <div class="swiper-wrapper">

        <div class="swiper-slide">
            <div class="w-full flex justify-center slide" style="height: {slideHeight}px;">
                <div class="flex flex-col w-2/3 max-md:w-full p-4 bg-white rounded-md h-full">
                    <h2 class="text-center text-xl mb-3">Storing data</h2>
                    <p>
                        Variable are used to store data.
                    </p>
                </div>
            </div>
        </div>

        <div class="swiper-slide">
            <div class="w-full flex justify-center slide" style="height: {slideHeight}px;">
                <div class="flex flex-col w-2/3 max-md:w-full p-4 bg-blue-950 rounded-md h-full items-center justify-center">
                    <p class="text-xl text-white">
                        Loading next lesson
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    :global(body) {
        background-color: #eff4fb;
    }
</style>