<script lang="ts">
    import Swiper from 'swiper';
    import 'swiper/css';
    import {onMount} from "svelte";

    onMount(() => {
        const swiper = new Swiper('.swiper', {
            direction: "vertical",
            autoHeight: true,

            on: {
                reachEnd: (sw) => {
                    document.location.href = '/road/beginner/001-what-is-a-function';
                }
            }

        });
    });

</script>

<div>
    <h1 class="text-2xl font-bold m-5 text-end">What is a variable?</h1>
    <hr>
</div>

<div class="swiper">
    <div class="swiper-wrapper">

        <div class="swiper-slide">
            <div class="h-screen">
                <h2 class="text-center text-xl m-3">Storing data</h2>
                <p>
                    Variable are used to store data.
                </p>
            </div>
        </div>

        <div class="swiper-slide">
            <h2 class="text-center text-xl m-3">Small game to explain</h2>
            <p>
                Variable are used to store data.
            </p>
        </div>

        <div class="swiper-slide">
            <h2 class="text-center text-xl m-3">Modifying data</h2>
            <p>
                Variable are used to change data.
            </p>
        </div>

        <div class="swiper-slide">
            <p class="text-center text-xl m-3">Going to next lesson</p>
        </div>
    </div>
</div>