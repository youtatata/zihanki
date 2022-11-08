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
        dd($data);
        // POSTされたデータをDB（memosテーブル）に挿入
        // MEMOモデルにDBへ保存する命令を出す

        // 同じタグがあるか確認
        $exist_tag = Tag::where('name', $data['tag'])->where('user_id', $data['user_id'])->first();
        // dd($data);
        if( empty($exist_tag['id']) ){
        //     //先にタグをインサート
            $tag_id = Tag::insertGetId([
                'name' => $data['tag'], 
                'user_id' => $data['user_id']
            ]);
        }else{
            $tag_id = $exist_tag['id'];
        }
        //タグのIDが判明する
        // タグIDをmemosテーブルに入れてあげる
        $memo_id = Memo::insertGetId([
            'content' => $data['content'],
             'user_id' => $data['user_id'],
             'tag_id' => $tag_id,
             'status' => 1
        ]);
        
        // リダイレクト処理
        return redirect()->route('home');
    }

}
