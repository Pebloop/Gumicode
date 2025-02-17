<script lang="ts">
    import Swiper from 'swiper';
    import 'swiper/css';
    import {onMount} from "svelte";

    onMount(() => {
        const swiper = new Swiper('.swiper', {
            direction: "vertical",
            autoHeight: true,
            initialSlide: 1,
            on: {
                reachBeginning: (sw) => {
                    document.location.href = '/road/beginner/000-what-is-a-variable';
                },
                reachEnd: (sw) => {
                    document.location.href = '/road/beginner/001-what-is-a-function';
                }
            }

        });
    });

</script>

<div>
    <h1 class="text-2xl font-bold m-5 text-end">What is a function?</h1>
    <hr>
</div>

<div class="swiper">
    <div class="swiper-wrapper">

        <div class="swiper-slide">
            <p class="text-center text-xl m-3">Going to previous lesson</p>
        </div>

        <div class="swiper-slide">
            <div class="h-screen">
                <h2 class="text-center text-xl m-3">calling commands</h2>
                <p>
                    functions are used to call commands.
                </p>
            </div>
        </div>

        <div class="swiper-slide">
            <h2 class="text-center text-xl m-3">Small game to explain</h2>
            <p>
                understand functions with a mini game.
            </p>
        </div>

        <div class="swiper-slide">
            <p class="text-center text-xl m-3">Going to next lesson</p>
        </div>
    </div>
</div>