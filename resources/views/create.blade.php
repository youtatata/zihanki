@extends('layouts.app')

@section('js')
<script src="{{ asset('js/create.js') }}"></script>
<!-- <link rel=”stylesheet” href="{{ asset('css/create.css') }}"> -->
@endsection

@section('css')
<link rel="stylesheet" href="{{ asset('/css/style.css')  }}" >
@endsection

@section('Map')
<div class="card-header" id="hed"> 
    <div class="text-center">
        <a id="contenas">自動販売機の位置にピンをセット</a>
    </div>
</div>
<div class="card-body p-0" id="con">
    <div class="container">
        <div class="row justify-content-center">
            <div id="map" style="height:400px"></div>
            <label class="text-center" id="pop">マップが表示されない場合は更新ボタンをクリック</label>
        </div>
    </div>
</div>
@endsection

@section('Photo')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header" id="hed">
                    <div class="text-center"><a id="contenas">{{ __('写真登録') }}</a></div>
                </div>
                <div class="card-body" id="con">
                    <form method='post' action="{{route('app.store')}}"enctype="multipart/form-data">
                        @csrf
                        <ul>
                            <li>
                                <div>{{ \Carbon\Carbon::now()->format("Y/m/d") }}</div>
                                <input value type="hidden" id="lat" name="lat" required>
                                <input value type="hidden" id="lng" name="lng" required>
                                <input value="{{ \Carbon\Carbon::now()->format('Y/m/d') }}" type="hidden" id="date" name="date" required>
                            </li>
                            <li><div id="Lat"></div></li>
                            <li><div id="Lng"></div></li>
                            <li><input type="file" name="image" id="image" onChange="imgPreView(event)"></li>
                            <!-- <div id="preview"></div> -->
                            <li><button type='submit' class="btn btn-primary p-1">保存</button></li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('Container')
<div class="d-flex justify-content-around">
    <a href="{{route('home')}}" class="btn p-1">ホーム</a>
</div>
@endsection
