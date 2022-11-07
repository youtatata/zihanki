@extends('layouts.app')
<script src="{{ asset('js/create.js') }}"></script> 
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
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('写真登録') }}</div>
                <div class="card-body">
                    
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
