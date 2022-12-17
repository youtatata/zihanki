<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ secure_asset('/css/style.css')  }}" >

    <title>{{ config('app.name', 'SimpleNote') }}</title>

    <!-- Scripts -->
    <script src="{{ '/js/app.js' }}" defer></script>
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
    @yield('js')
    <!-- <script src="https://maps.googleapis.com/maps/api/js?language=ja&region=JP&key=[APIキーをここに入力]&callback=initMap" async defer> -->
    <script src="https://maps.googleapis.com/maps/api/js?language=ja&region=JP&key=AIzaSyAQPboFGY6ZEOp_eRLjVeuADsgBTvePFNM&callback=initMap" async defer></script>
    <!-- 上のがMap用のjs -->

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href= '/css/app.css' rel="stylesheet">
    <link href="{{ '/css/utility.css' }}" rel="stylesheet">
    @yield('css')
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name') }}
                </a>
            </div>
        </nav>

        <main class="main">
            <div class="row" style='height: auto;'><!--62vh row justify-content-center -->
                <div class="col-md-7 p-0">
                    <div class="card h-auto">
                        @yield('Map')
                    </div>    
                </div> <!-- col-md-3 -->

                <div class="col-md-5 p-0">
                    @yield('Photo')
                </div>
            </div> <!-- row justify-content-center -->
        </main>

        <div class="container" style="padding:8px 0">
            @yield('Container')
        </div>

        <footer id="footer" class="text-center my-3">
            <small>&copy; 2022 inu</small>
        </footer>
    </div>
</body>
</html>
