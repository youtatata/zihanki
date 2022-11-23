@extends('layouts.app')

@section('js')
<script src="{{ asset('js/result.js') }}">const data = "@json($data)";</script>
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
                    <table>
                        <div id="jss"></div>
                        <div id="target"></div>
                    </table>
                </div>
        </div>
    </div>
</div>
@endsection

@section('Photo')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('商品') }}</div>

                <div class="card-body">
                    <div class="text-center">
                        <img src= "{{ asset('storage/'.$owner->img_path) }}" class="img-fluid" alt="...">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('Container')
<label class="text-center">自動販売機　ピン　オプション</label>
<div class="d-flex justify-content-around">
    <a href="{{route('creative')}}" class="btn btn-primary p-1">追加</a>
    <a href="{{route('editing')}}" class="btn btn-primary p-1">編集</a>
</div>
@endsection

