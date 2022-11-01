@extends('layouts.app')

<script src="{{ asset('/js/result.js') }}"></script> 

@section('Map')
<div class="container">
    <div class="row justify-content-center">
        <div class="text-center">
            Map
            <div id="map" style="height:400px"> 
            <!-- //追加 -->
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
