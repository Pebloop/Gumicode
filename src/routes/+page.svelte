<div class="flex flex-col items-center justify-center h-screen bg-image">
    <h1 class="text-4xl font-bold">Gumicode</h1>
    <h2 class="text-center max-sm:w-48">Start to learn code concepts and improve yourself !</h2>

    <div class="flex flex-row justify-center items-center buttons mt-2">
        <a href="/road/beginner/000-what-is-a-variable" class="text-white button bg-blue-800 p-2 rounded-2xl hover:bg-blue-700 text-center">Start now</a>
        <a href="/" class="text-white bg-blue-800 p-2 rounded-2xl ml-4 button hover:bg-blue-700 text-center">login</a>
    </div>

    <!--<a href="/login" class="text-blue-950  hover:text-blue-800 p-2 rounded-2xl mt-4">I already have an account</a>-->
</div>

<style>
    .bg-image {
        background-image: url('/artworks/home/home_pc.png');
        background-size: cover;
        background-position: center;
    }

    @media (max-width: 500px) {
        .buttons {
            flex-direction: column;
        }

        .button {
            margin-left: 0;
            margin-top: 10px;
        }

        .bg-image {
            background-image: url('/artworks/home/home_phone.png');
        }
    }

</style>