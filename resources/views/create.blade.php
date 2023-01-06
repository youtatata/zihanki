@extends('layouts.app')

@section('js')
<script src="{{ asset('js/create.js') }}"></script>
<!-- <link rel=”stylesheet” href="{{ asset('css/create.css') }}"> -->
@endsection

@section('Map')
<div class="card-header "> 
    <div class="text-center">
    自動販売機の位置にピンをセット
    </div>
</div>
<div class="card-body p-2">
    <div class="container">
        <div class="row justify-content-center">
            <div id="map" style="height:400px"></div>
        </div>
    </div>
</div>
@endsection

@section('Photo')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">{{ __('写真登録') }}</div>
                <div class="card-body">
                    <form method='post' action="{{route('app.store')}}"enctype="multipart/form-data">
                        @csrf
                        <ul>
                            <div>{{ \Carbon\Carbon::now()->format("Y/m/d") }}</div>
                            <input value type="hidden" id="lat" name="lat" required>
                            <input value type="hidden" id="lng" name="lng" required>
                            <input value="{{ \Carbon\Carbon::now()->format('Y/m/d') }}" type="hidden" id="date" name="date" required>
                            <div id="Lat"></div>
                            <div id="Lng"></div>
                            <input type="file" name="image">
                            <br>
                            <button type='submit' class="btn btn-primary p-1">保存</button>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('Container')
<label class="text-center">マップが表示されない場合は更新ボタンをクリック</label>
<div class="d-flex justify-content-around">
    <a href="{{route('home')}}" class="btn btn-primary p-1">ホーム</a>
</div>
@endsection
