@extends('layouts.app')

@section('js')
<script src="{{ asset('js/result.js') }}"></script>

<script>
   const data = @json($zihankis);
</script>
@endsection

@section('Map')
<div class="card-header "> 
    <div class="text-center">
    自動販売機
    </div>
</div>
<div class="card-body p-3">
    <div class="container">
        <div class="row justify-content-center">
            <div id="map" style="height:400px"></div>
            <div class=text-center>
                <table class="table table-striped">
                    @foreach($zihankis as $data)
                        <div id="lat" hidden>{{$data['lat']}}</div>
                        <div id="lng" hidden>{{$data['lng']}}</div>
                        <div id="img" hidden>{{$data['img_path']}}</div>
                        <div id="created" hidden>{{$data['created_at']}}</div>
                    @endforeach
                </table>
                <!-- <div id="all" hidden>{{$zihankis}}</div>
                <div id="all_show_result"></div> -->
                <div id="target"></div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('Photo')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">{{ __('商品') }}</div>
                <div class="card-body">
                    <div class="text-center">
                        <div id="date"></div>
                        <!-- <div id="path">{{$zihankis[0]['img_path']}}</div> -->
                        <!-- <img src= "{{  asset('storage/img/ncH7qG0C5QUJS0sTTTCLghF5h3gjRXojoWgKxPXj.jpg') }}"class="img-fluid" alt="..."> -->
                        <img src= "{{ asset('storage/'.$owner->img_path) }}" id="imgpath" class="img-fluid" alt="...">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('Container')
<label class="text-center">マップが表示されない場合は更新ボタンをクリック</label>
<div class="d-flex justify-content-around">
    <a href="{{route('creative')}}" class="btn btn-primary p-1">追加</a>
    <a href="{{route('editing')}}" class="btn btn-primary p-1">編集</a>
</div>
@endsection
