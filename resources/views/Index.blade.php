<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" >
    <head>
        <title>{{env('FULL_NAME')}}</title>
        <meta charset="utf-8">
        <link rel="icon" type="image/x-icon" href="https://forum.2023.hub-fintech-ncku.tw/assets/logo/new-fintech-logo.png">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
        <meta name="description" content="國立成功大學,產學小聯盟,永續金融,永續金融科技,ESG,NCKU,SFTA">
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta name="author" content="Chan Zi Hang">
        {{-- <meta name="image" content="/assets/Image/metapage.png"> --}}
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        @viteReactRefresh
    </head>
    <body>
        @yield('Content')
        @vite(['resources/js/app.js'])
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    </body>
</html>