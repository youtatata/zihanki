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

    public function creative()
    {
        return view('create');
    }

    public function store(Request $request)
    {
        // $user =  \Auth::user();
        $data = $request->all();
        // dd($data);

        $dir = 'sample';

        // sampleディレクトリに画像を保存
        $data->file('image')->store('public/' . $dir);

        return redirect('/');
        
        // $memo_id = Memo::insertGetId([
        //     'content' => $data['content'],
        //      'user_id' => $data['user_id'],
        //      'tag_id' => $tag_id,
        //      'status' => 1
        // ]);
        
        // // リダイレクト処理
        // return redirect()->route('home');
    }

}
