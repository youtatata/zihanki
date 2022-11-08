@extends('layouts.app')
<script src="{{ asset('js/result.js') }}"></script> 
@section('Map')
<div class="card-header "> 
    <div class="text-center">
    自動販売機
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
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    {{ __('You are logged in!') }}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('Container')
<label class="text-center">オプション</label>
<div class="d-flex justify-content-around">
    <a href="{{route('creative')}}" class="btn btn-primary p-1">追加</a>
</div>
@endsection

