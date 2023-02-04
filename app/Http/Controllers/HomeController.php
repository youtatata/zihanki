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
    //    $zihankis = Zihanki::get();

    //    $zihankiList = array();

    //    foreach($zihankis as $zihanki){
    //        $zihankiList[] = array(
    //        'id'    => $zihanki->id,
    //        'img_path'  => $zihanki->img_path,
    //        'lat' => $zihanki->lat,
    //        'lng' => $zihanki->lng
    //        );
    //    }

    //    // ヘッダーを指定することによりjsonの動作を安定させる
    //    header('Content-type: application/json');

    //    // htmlへ渡す配列$productListをjsonに変換する
    //    echo json_encode($zihankiList[1]['lat']);
        
        $zihankis = Zihanki::get();
        $owner = Zihanki::where('id', '8')->first();
        // route('ajax');
        // dd($zihankis);
        return view('home', compact('owner','zihankis'));
    }

    public function create()
    {
        return view('create');
    }

    public function edit()
    {
        return view('edit');
    }

    public function editing()
    {
        $zihankis = Zihanki::get();
        return view('edit', compact('zihankis'));
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
                    'date' => $data['date'],
                ]);
            }
        }
        // // リダイレクト処理
        return redirect()->route('home')->with('success', 'ピンの削除が完了しました！');
    }

    public function delete(Request $request, $id)
    {
        $path = Zihanki::where('id', $id)->get();
        $path = $path[0]['img_path'];
        // dd($path);
        \Storage::disk('public')->delete($path);
        Zihanki::where('id', $id)->delete();
        return redirect()->route('home')->with('success', 'ピンの削除が完了しました！');
    }

}
