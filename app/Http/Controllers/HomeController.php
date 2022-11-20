<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Zihanki;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        // Zihanテーブルのデータを全て取得
        $data = Zihanki::get();
        $owner = Zihanki::where('id', '2')->first();
        // dd($owner);
        return view('home', compact('owner','data'));
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

    public function editing()
    {
        return view('edit');
    }

    public function store(Request $request)
    {
        // $user =  \Auth::user();
        $data = $request->all();
        // dd($data);

        $img = $data['image'];

         // 画像情報がセットされていれば、保存処理を実行
         if (isset($img)) {
            // storage > public > img配下に画像が保存される
            $path = $img->store('img','public');
            // store処理が実行できたらDBに保存処理を実行
            if ($path) {
                // DBに登録する処理
                Zihanki::create([
                    'img_path' => $path,
                    'lat' => $data['lat'],
                    'lng' => $data['lng'],
                ]);
            }
        }
        // // リダイレクト処理
        return redirect()->route('home');
    }

}
