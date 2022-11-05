<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function create()
    {
        return view('create');
    }

    public function edit()
    {
        return view('edit');
    }

    public function store(Request $request)
    {
        $data = $request->all();
        dd($data);
        
        // ディレクトリ名
        $dir = 'sample';

        // sampleディレクトリに画像を保存
        $request->file('image')->store('public/' . $dir);

        return redirect('/');

    }

}
