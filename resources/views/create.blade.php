@extends('layouts.app')
<script src="{{ asset('/js/create.js') }}"></script>

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
                <div class="card-header text-center">{{ _('登録位置') }}</div>
                <!-- <p id="latlng"></p> -->
                <div class="card-body">

                    <form method='post' action="{{route('app.store')}}" enctype="multipart/form-data">
                        @csrf
                        <ul>
                            <div class="form-group">
                                <!-- <textarea name='content' class="form-control"rows="10"></textarea> -->
                                <textarea name="content" class="form-control"rows="10" required></textarea>
                                <input type="file" name="image">
                            <button type='submit' class="btn btn-primary btn-lg">保存</button>
                        </ul>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
